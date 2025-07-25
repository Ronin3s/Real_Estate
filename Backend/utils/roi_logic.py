import pandas as pd
import joblib

# Load model and preprocessor once at startup
model = joblib.load("models/roi/xgb_best_model.pkl")
preprocessor = joblib.load("models/roi/preprocessor.pkl")

def calculate_roi(data: dict):
    try:
        # تحويل البيانات إلى DataFrame
        df = pd.DataFrame([{
            "Governorate": data["governorate"],
            "City": data["city"],
            "Bedrooms": data["bedrooms"],
            "Bathrooms": data["bathrooms"],
            "Size_m2": data["size_m2"],
            "Floor": data["floor"],
            "Furnished": data["furnished"],
        }])

        # معالجة البيانات
        processed = preprocessor.transform(df)

        # التنبؤ بسعر العقار
        predicted_price = float(model.predict(processed)[0])

        # حساب العائد على الاستثمار (ROI)
        rent = data["expected_rent"]
        months = data["target_months"]
        roi = (rent * months / predicted_price) * 100

        # تصنيف العائد
        if roi >= 10:
            rating = "Excellent Investment (🔥)"
            tip = "Consider securing this property quickly before prices increase."
        elif roi >= 6:
            rating = "Good Investment (👍)"
            tip = "Consider negotiating the price or improving rental terms to enhance returns."
        else:
            rating = "Caution: Low Return (⚠️)"
            tip = "Re-evaluate this property or explore alternative investment options."

        break_even = round(predicted_price / rent, 1) if rent > 0 else None

        return {
            "predicted_property_price_egp": round(predicted_price, 2),
            "roi_percentage": round(roi, 2),
            "roi_rating": rating,
            "break_even_months": break_even,
            "personalized_tip": tip
        }

    except Exception as e:
        raise ValueError(f"ROI calculation failed: {str(e)}")
