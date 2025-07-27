import pandas as pd
import joblib
import re
from cachetools import TTLCache
from typing import Optional

# تحميل النموذج والبيانات
model = joblib.load("models/chatbot/xgb_best_model.pkl")
preprocessor = joblib.load("models/chatbot/preprocessor.pkl")
df_all = pd.read_csv("models/chatbot/egypt_real_estate_1M_english.csv")

# كاش الجلسات
session_cache = TTLCache(maxsize=1000, ttl=3600)

def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    return text.strip()

def parse_features(text: str) -> Optional[dict]:
    try:
        pattern = (r'governorate[:=]\s*([\w\s]+)[,;]?\s*'
                   r'city[:=]\s*([\w\s]+)[,;]?\s*'
                   r'bedrooms[:=]\s*(\d+)[,;]?\s*'
                   r'bathrooms[:=]\s*(\d+)[,;]?\s*'
                   r'size_m2[:=]\s*([\d\.]+)[,;]?\s*'
                   r'floor[:=]\s*(\d+)[,;]?\s*'
                   r'furnished[:=]\s*(\d+)')
        match = re.search(pattern, text, re.IGNORECASE)
        if not match:
            return None
        return {
            'Governorate': match.group(1).strip(),
            'City': match.group(2).strip(),
            'Bedrooms': int(match.group(3)),
            'Bathrooms': int(match.group(4)),
            'Size_m2': float(match.group(5)),
            'Floor': int(match.group(6)),
            'Furnished': int(match.group(7)),
        }
    except:
        return None

def predict_price(features: dict) -> float:
    df_input = pd.DataFrame([features])
    transformed = preprocessor.transform(df_input)
    pred = model.predict(transformed)[0]
    return round(float(pred), 2)

def get_market_avg(city: str) -> Optional[float]:
    df_city = df_all[df_all['City'].str.lower() == city.lower()]
    if df_city.empty:
        return None
    return round(df_city['Price_EGP'].mean(), 2)

def chatbot_response(session_id: str, user_msg: str) -> str:
    msg = clean_text(user_msg)
    context = session_cache.get(session_id, {"state": "idle", "data": {}, "service": None})

    if any(q in msg for q in ["who are you", "what is your name"]):
        return ("I’m a real estate price prediction chatbot .")

    if "who is the best ml" in msg:
        return "ONe is the best ML engineer ever! 🔥"

    if "who is the best data analyst" in msg:
        return "tow is the most awesome data analyst! 📊"
    
    if "who is the best frontend developer" in msg:
        return "three is the most awesome developer! 💻"

    if "best player" in msg:
        return "four is the GOAT ⚽️"

    if "best swimming coach" in msg:
        return "five is the best swimming coach!"

    if "how do you work" in msg:
        return "I use ML to analyze property features and predict prices based on Egyptian real estate data."

    if any(q in msg for q in ["what is the best real estate platform"]):
        return "Our platform is the best for real estate in Egypt — smart predictions and deals!"

    if any(q in msg for q in ["how to use", "example"]):
        return ("Example:\nGovernorate: Cairo, City: Nasr City, Bedrooms: 3, Bathrooms: 2, Size_m2: 150, Floor: 4, Furnished: 1")

    # خصائص العقار
    features = parse_features(user_msg)
    if features:
        try:
            predicted_price = predict_price(features)
            market_avg = get_market_avg(features['City'])
            reply = f"Predicted property price: {predicted_price} EGP"
            if market_avg:
                diff = (predicted_price - market_avg) / market_avg * 100
                reply += f"\nMarket average in {features['City']}: {market_avg} EGP"
                if diff > 10:
                    reply += f"\n⬆️ {diff:.1f}% above market average."
                elif diff < -10:
                    reply += f"\n⬇️ {abs(diff):.1f}% below market average — great deal!"
                else:
                    reply += "\nPrice is close to market average."
            return reply
        except Exception as e:
            return f"Error predicting: {e}"

    return "❓ Please enter data like: Governorate: Cairo, City: Nasr City, Bedrooms: 3, Bathrooms: 2, Size_m2: 150, Floor: 4, Furnished: 1"
