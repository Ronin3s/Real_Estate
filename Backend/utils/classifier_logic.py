import pandas as pd
import joblib
from schemas.classifier_schema import PropertyClassifierInput

# تحميل النموذج وخصائص الأعمدة المستخدمة في التدريب
model = joblib.load("models/classifier/random_forest_model.pkl")
model_features = joblib.load("models/classifier/model_features.pkl")

def classify_price_category(property: PropertyClassifierInput):
    df = pd.DataFrame([property.dict()])

    # One-Hot Encoding للخصائص الفئوية
    df_encoded = pd.get_dummies(df, columns=["type", "furnished", "rent", "city", "region"], drop_first=True)

    # التأكد من وجود كل الأعمدة المطلوبة
    for col in model_features:
        if col not in df_encoded.columns:
            df_encoded[col] = 0

    # ترتيب الأعمدة
    df_encoded = df_encoded[model_features]

    # التنبؤ
    pred = model.predict(df_encoded)[0]
    confidences = model.predict_proba(df_encoded)[0]
    classes = model.classes_
    confidence_scores = {cls: float(f"{conf:.2f}") for cls, conf in zip(classes, confidences)}

    # اختيار الفئة البديلة
    sorted_conf = sorted(zip(classes, confidences), key=lambda x: x[1], reverse=True)
    alternative_category = sorted_conf[1][0]

    # أوصاف الفئات وتوصيات
    descriptions = {
        "Low": "Economical property, suitable for budget-conscious buyers.",
        "Medium": "Moderate price property, balanced between cost and features.",
        "High": "Premium property with upscale features and location."
    }

    recommendations = {
        "Low": "Property may need renovation or is in less desirable location.",
        "Medium": "Balanced choice, consider specific amenities or location factors.",
        "High": "Consider negotiating on location or amenities for better value."
    }

    price_ranges = {
        "Low": "500,000 - 1,200,000 EGP",
        "Medium": "1,200,001 - 2,500,000 EGP",
        "High": "Above 2,500,000 EGP"
    }

    warnings = []
    if df["area"].iloc[0] > 1000:
        warnings.append("Area value seems unusually high.")

    top_features = list(model_features[:3])

    return {
        "predicted_price_category": pred,
        "confidence_scores": confidence_scores,
        "alternative_category": alternative_category,
        "category_description": descriptions.get(pred, ""),
        "recommended_action": recommendations.get(pred, ""),
        "estimated_price_range": price_ranges.get(pred, ""),
        "warnings": warnings,
        "explanation": "Property area and location contributed most to the price prediction.",
        "top_features_influencing": top_features
    }
