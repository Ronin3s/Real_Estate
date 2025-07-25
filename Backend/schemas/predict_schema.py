# models/predict_schema.py
from pydantic import BaseModel

class PropertyData(BaseModel):
    Bedrooms: int
    Bathrooms: int
    Size_m2: int
    Floor: int
    Governorate: str
    City: str
    Furnished: int  # 1 = Yes, 0 = No
