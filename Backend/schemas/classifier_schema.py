from pydantic import BaseModel

class PropertyClassifierInput(BaseModel):
    type: str
    furnished: str
    rent: str
    city: str
    region: str
    bedrooms: float
    bathrooms: float
    area: float
    level: float
