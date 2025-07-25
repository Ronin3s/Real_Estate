import pandas as pd
import joblib

# تحميل الموارد مرة واحدة
model = joblib.load("models/deals/catboost_real_estate_model.pkl")
le_city = joblib.load("models/deals/le_City.pkl")
le_furnished = joblib.load("models/deals/le_Furnished.pkl")
le_governorate = joblib.load("models/deals/le_Governorate.pkl")
le_status = joblib.load("models/deals/le_Status.pkl")
df_all = pd.read_csv("models/deals/df_clean.csv")

def get_smart_deals():
    df = df_all.copy()

    if df['City'].dtype == 'object':
        df['City'] = le_city.transform(df['City'])
        df['Furnished'] = le_furnished.transform(df['Furnished'])
        df['Governorate'] = le_governorate.transform(df['Governorate'])
        df['Status'] = le_status.transform(df['Status'])

    features = ['Governorate', 'City', 'Bedrooms', 'Bathrooms', 'Size_m2', 'Status', 'Floor', 'Furnished', 'Price_per_m2']
    X = df[features]

    df['Predicted_Price'] = model.predict(X)
    df['Difference_%'] = ((df['Predicted_Price'] - df['Price_EGP']) / df['Predicted_Price']) * 100

    smart_df = df.sort_values(by='Difference_%', ascending=False)
    smart_df = smart_df.drop_duplicates(subset=['City', 'Governorate', 'Price_EGP']).head(10)

    results = []
    for _, row in smart_df.iterrows():
        deal = {
            "City": le_city.inverse_transform([int(row['City'])])[0],
            "Governorate": le_governorate.inverse_transform([int(row['Governorate'])])[0],
            "Actual_Price_EGP": round(row['Price_EGP'], 2),
            "Predicted_Price_EGP": round(row['Predicted_Price'], 2),
            "Difference_%": round(row['Difference_%'], 2),
            "Why_This_Deal": f"💡 السعر أقل من المتوقع بـ {round(row['Difference_%'], 1)}٪، فرصة استثمارية ذكية",
            "Deal_Score": "🔥 ممتازة" if row['Difference_%'] >= 25 else "👍 جيدة"
        }
        results.append(deal)

    return results
