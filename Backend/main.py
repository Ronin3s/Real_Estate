from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.compare import router as compare_router
from routers.predict import router as predict_router
from routers.deals import router as deals_router
from routers.chatbot import router as chatbot_router
from routers import roi
from routers.classifier import router as classifier_router


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(compare_router, prefix="/compare")
app.include_router(predict_router, prefix="/predict")
app.include_router(chatbot_router, prefix="/chatbot", tags=["Chatbot"])
app.include_router(deals_router)
app.include_router(roi.router)
app.include_router(classifier_router, prefix="/classifier", tags=["Classifier"])

