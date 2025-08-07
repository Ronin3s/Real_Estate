# routers/compare.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from utils.compare_logic import compare_properties

router = APIRouter()

class PropertyFeatures(BaseModel):
    Governorate: str
    City: str
    Bedrooms: int = Field(..., ge=0, le=20)
    Bathrooms: int = Field(..., ge=0, le=20)
    Size_m2: float = Field(..., gt=0)
    Status: str
    Floor: int = Field(..., ge=0, le=100)
    Furnished: str

class PropertyComparisonRequest(BaseModel):
    property1: PropertyFeatures
    property2: PropertyFeatures

@router.post("/compare-by-features")
def compare(data: PropertyComparisonRequest):
    try:
        return compare_properties(data.property1, data.property2)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")
