# utils/predict_logic.py
import pandas as pd
import joblib
import pickle

def load_model_and_preprocessor():
    with open("models/predict/xgb_best_model.pkl", "rb") as f:
        model = pickle.load(f)
    preprocessor = joblib.load("models/predict/preprocessor.pkl")
    return model, preprocessor

def make_prediction(data, model, preprocessor):
    input_data = data.model_dump()  # بدل dict() علشان التوافق الجديد
    input_data["Price_EGP"] = 0
    input_data["Status"] = "Available"
    input_data["Prev_Sold_Date"] = None

    df = pd.DataFrame([input_data])
    transformed = preprocessor.transform(df)
    predicted_price = model.predict(transformed)[0]

    return round(float(predicted_price), 2)
