from fastapi import APIRouter
from schemas.classifier_schema import PropertyClassifierInput
from utils.classifier_logic import classify_price_category

router = APIRouter()

@router.post("/classify")
def classify_property_route(property: PropertyClassifierInput):
    return classify_price_category(property)
