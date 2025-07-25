from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.roi_logic import calculate_roi

router = APIRouter()

class ROIRequest(BaseModel):
    governorate: str
    city: str
    bedrooms: int
    bathrooms: int
    size_m2: float
    floor: int
    furnished: str
    expected_rent: float
    target_months: int

@router.post("/roi")
def get_roi(request: ROIRequest):
    try:
        result = calculate_roi(request.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
