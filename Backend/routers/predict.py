# routers/predict.py
from fastapi import APIRouter
from schemas.predict_schema import PropertyData
from utils.predict_logic import make_prediction, load_model_and_preprocessor

router = APIRouter()

# تحميل النموذج والمعالج مرة واحدة
model, preprocessor = load_model_and_preprocessor()

@router.post("/predict")
def predict_price(data: PropertyData):
    predicted_price = make_prediction(data, model, preprocessor)
    return {"predicted_price_EGP": predicted_price}
