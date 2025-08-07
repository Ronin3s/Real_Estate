from fastapi import APIRouter
from utils.deals_logic import get_smart_deals

router = APIRouter(prefix="/smart-deals", tags=["Smart Deals"])

@router.get("/smart-deals")
def fetch_smart_deals():
    try:
        deals = get_smart_deals()
        return {
            "smart_deals": deals,
            "message": "تم استخراج أفضل الصفقات الأقل من السعر المتوقع"
        }
    except Exception as e:
        return {"error": str(e)}
