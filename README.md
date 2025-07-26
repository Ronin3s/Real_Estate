# PropertyPredict: AI-Powered Real Estate Analysis Platform

This is a full-stack application designed to provide intelligent insights into the Egyptian real estate market. It leverages a suite of machine learning models to offer services like price prediction, property comparison, investment analysis, and automated deal discovery.

The project is composed of a **FastAPI backend** that serves the ML models and a **React frontend** that provides a user-friendly interface to interact with the different services.

## ✨ Features

-   **AI Price Prediction**: Get accurate property price estimations based on a comprehensive set of features.
-   **Property Comparison**: Compare two properties side-by-side to determine the better value.
-   **Smart Deals Finder**: Discover undervalued properties with high investment potential.
-   **ROI Calculator**: Estimate the potential return on investment for a property.
-   **Price Classifier**: Automatically categorize properties into market segments (Low, Medium, High).
-   **Interactive Chatbot**: Ask questions and get instant information about property prices and market data.

## 🛠️ Tech Stack

### Backend

-   **Framework**: FastAPI
-   **Language**: Python 3.11
-   **ML Libraries**: Scikit-learn, XGBoost, CatBoost, Pandas
-   **Server**: Uvicorn

### Frontend

-   **Framework**: React (with Vite)
-   **Language**: TypeScript
-   **UI**: shadcn/ui, Tailwind CSS
-   **Routing**: React Router
-   **Data Fetching**: Axios, TanStack Query

## 🚀 Getting Started

### Prerequisites

-   Python 3.11+ and `pip`
-   Node.js and `npm`

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd Backend
    ```
2.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Start the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be available at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd FrontEnd
    ```
2.  **Install the necessary Node.js modules:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:8080`.

## 📁 Project Structure

The project is organized into two main folders: `Backend` and `FrontEnd`.

```
/
├── Backend/
│   ├── main.py             # FastAPI application entry point
│   ├── models/             # ML models, datasets, and encoders
│   ├── routers/            # API endpoint definitions
│   ├── schemas/            # Pydantic data validation schemas
│   ├── utils/              # Business logic for each service
│   └── requirements.txt    # Python dependencies
│
└── FrontEnd/
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── hooks/          # Custom React hooks
    │   ├── layouts/        # App layout structure
    │   ├── pages/          # Individual pages for each feature
    │   └── App.tsx         # Main app component with routing
    ├── package.json        # Frontend dependencies and scripts
    └── vite.config.ts      # Vite configuration
```

## 🤖 API Endpoints

The backend exposes the following API endpoints:

-   `POST /predict/predict`: Predicts the price of a single property.
-   `POST /compare/compare-by-features`: Compares two properties and provides a recommendation.
-   `GET /smart-deals/smart-deals`: Returns a list of top 10 undervalued properties.
-   `POST /roi/roi`: Calculates the Return on Investment for a given property and rental income.
-   `POST /classifier/classify`: Classifies a property into a price category (Low, Medium, High).
-   `POST /chatbot/chatbot`: Handles conversational queries about real estate.

