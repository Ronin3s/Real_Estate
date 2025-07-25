from fastapi import APIRouter
from models.chatbot_models import UserMessage
from utils.chatbot_logic import chatbot_response
import time

router = APIRouter()

@router.post("/chatbot")
def chat(data: UserMessage):
    start = time.time()
    reply = chatbot_response(data.session_id, data.message)
    end = time.time()
    return {
        "reply": reply,
        "inference_time_ms": round((end - start) * 1000, 2)
    }
