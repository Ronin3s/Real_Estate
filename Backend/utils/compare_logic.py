# utils/compare_logic.py
import pandas as pd
import joblib

# تحميل النماذج والمحولات مرة واحدة
model = joblib.load("models/compare/catboost_real_estate_model.pkl")
le_governorate = joblib.load("models/compare/le_Governorate.pkl")
le_city = joblib.load("models/compare/le_City.pkl")
le_status = joblib.load("models/compare/le_Status.pkl")
le_furnished = joblib.load("models/compare/le_Furnished.pkl")

df_all = pd.read_csv("models/compare/df_clean.csv")

avg_price_per_m2_by_city = df_all.groupby('City')['Price_per_m2'].mean().to_dict()
global_avg_price_per_m2 = df_all['Price_per_m2'].mean()

def estimate_price_per_m2(city: str) -> float:
    return avg_price_per_m2_by_city.get(city, global_avg_price_per_m2)

def preprocess_property(property_data, le_governorate, le_city, le_status, le_furnished):
    return {
        "Governorate": le_governorate.transform([property_data.Governorate])[0],
        "City": le_city.transform([property_data.City])[0],
        "Bedrooms": property_data.Bedrooms,
        "Bathrooms": property_data.Bathrooms,
        "Size_m2": property_data.Size_m2,
        "Status": le_status.transform([property_data.Status])[0],
        "Floor": property_data.Floor,
        "Furnished": le_furnished.transform([property_data.Furnished])[0],
        "Price_per_m2": estimate_price_per_m2(property_data.City),
    }

def compare_properties(property1, property2):
    p1_encoded = preprocess_property(property1, le_governorate, le_city, le_status, le_furnished)
    p2_encoded = preprocess_property(property2, le_governorate, le_city, le_status, le_furnished)

    df_input = pd.DataFrame([p1_encoded, p2_encoded])
    predicted_prices = model.predict(df_input)

    price_diff = round(abs(predicted_prices[0] - predicted_prices[1]), 2)
    percent_diff = round((price_diff / max(predicted_prices[0], predicted_prices[1])) * 100, 2)

    if predicted_prices[0] < predicted_prices[1]:
        better_prop = "Property 1"
        recommendation = f"✅ {better_prop} is likely the better deal: it's cheaper by {price_diff:,} EGP ({percent_diff}%)."
    elif predicted_prices[1] < predicted_prices[0]:
        better_prop = "Property 2"
        recommendation = f"✅ {better_prop} is likely the better deal: it's cheaper by {price_diff:,} EGP ({percent_diff}%)."
    else:
        better_prop = "Neither"
        recommendation = "⚖️ Both properties have similar prices."

    return {
        "property1": {
            **property1.dict(),
            "Predicted_Price_EGP": round(float(predicted_prices[0]), 2),
            "Estimated_Price_per_m2": round(p1_encoded["Price_per_m2"], 2),
        },
        "property2": {
            **property2.dict(),
            "Predicted_Price_EGP": round(float(predicted_prices[1]), 2),
            "Estimated_Price_per_m2": round(p2_encoded["Price_per_m2"], 2),
        },
        "Difference": {
            "Price_Difference_EGP": price_diff,
            "Difference_%": percent_diff,
            "Bedrooms_Diff": abs(property1.Bedrooms - property2.Bedrooms),
            "Bathrooms_Diff": abs(property1.Bathrooms - property2.Bathrooms),
            "Size_m2_Diff": abs(property1.Size_m2 - property2.Size_m2),
            "Floor_Diff": abs(property1.Floor - property2.Floor),
        },
        "Recommendation": recommendation,
        "Better_Property": better_prop,
    }
