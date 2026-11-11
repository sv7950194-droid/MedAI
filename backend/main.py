from datetime import datetime
from hashlib import pbkdf2_hmac
from secrets import token_hex

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pandas as pd
import joblib
import shap

from pathlib import Path

from .chat import ChatRequest, generate_response
from .mongodb import (
    users_collection,
    assessments_collection,
    predictions_collection,
    chat_collection
)


# =========================================================
# APP
# =========================================================

app = FastAPI(title="MedAI API")


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# PATHS
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = (
    BASE_DIR
    / "ml"
    / "models"
    / "xgboost_model.pkl"
)

CONFIG_PATH = (
    BASE_DIR
    / "ml"
    / "models"
    / "medi_ai_model_config.pkl"
)


# =========================================================
# LOAD MODEL
# =========================================================

model = joblib.load(MODEL_PATH)
config = joblib.load(CONFIG_PATH)

explainer = shap.TreeExplainer(model)


# =========================================================
# AUTH MODELS
# =========================================================

class RegisterInput(BaseModel):
    email: str
    password: str


class LoginInput(BaseModel):
    email: str
    password: str


# =========================================================
# PASSWORD HASHING
# =========================================================

def hash_password(password: str, salt: str | None = None):

    if salt is None:
        salt = token_hex(16)

    password_hash = pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    ).hex()

    return salt, password_hash


def verify_password(
    password: str,
    salt: str,
    stored_hash: str
):

    _, password_hash = hash_password(
        password,
        salt
    )

    return password_hash == stored_hash


# =========================================================
# HEALTH INPUT MODEL
# =========================================================

class HealthInput(BaseModel):
    user_id: str
    HighBP: float
    HighChol: float
    CholCheck: float
    BMI: float
    Smoker: float
    Stroke: float
    HeartDiseaseorAttack: float
    PhysActivity: float
    Fruits: float
    Veggies: float
    HvyAlcoholConsump: float
    AnyHealthcare: float
    NoDocbcCost: float
    GenHlth: float
    MentHlth: float
    PhysHlth: float
    DiffWalk: float
    Sex: float
    Age: float
    Education: float
    Income: float


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():
    return {
        "message": "MedAI API is running"
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "XGBoost",
        "shap": "enabled"
    }


# =========================================================
# REGISTER
# =========================================================

@app.post("/register")
def register(data: RegisterInput):

    email = data.email.strip().lower()
    password = data.password

    if not email or not password:
        raise HTTPException(
            status_code=400,
            detail="Email and password are required"
        )

    if len(password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 6 characters"
        )

    existing_user = users_collection.find_one(
        {"email": email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists"
        )

    salt, password_hash = hash_password(password)

    user_document = {
        "email": email,
        "password_hash": password_hash,
        "password_salt": salt,
        "created_at": datetime.utcnow()
    }

    result = users_collection.insert_one(
        user_document
    )

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id),
        "email": email
    }


# =========================================================
# LOGIN
# =========================================================

@app.post("/login")
def login(data: LoginInput):

    email = data.email.strip().lower()
    password = data.password

    user = users_collection.find_one(
        {"email": email}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_valid = verify_password(
        password,
        user["password_salt"],
        user["password_hash"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "message": "Login successful",
        "user_id": str(user["_id"]),
        "email": user["email"]
    }


# =========================================================
# PREDICTION
# =========================================================

@app.post("/predict")
def predict(data: HealthInput):

    # -----------------------------------------------------
    # Create input using exact model feature order
    # -----------------------------------------------------

    input_data = pd.DataFrame(
        [
            [
                getattr(data, feature)
                for feature in config["features"]
            ]
        ],
        columns=config["features"]
    )

    # -----------------------------------------------------
    # Model prediction
    # -----------------------------------------------------

    probability = float(
        model.predict_proba(input_data)[0][1]
    )

    prediction = int(
        probability >= config["threshold"]
    )

    # -----------------------------------------------------
    # SHAP explanation
    # -----------------------------------------------------

    shap_values = explainer.shap_values(input_data)

    if isinstance(shap_values, list):
        shap_values = shap_values[-1]

    shap_values = shap_values[0]

    # -----------------------------------------------------
    # Create explanations
    # -----------------------------------------------------

    explanations = []

    for feature, value, shap_value in zip(
        config["features"],
        input_data.iloc[0].values,
        shap_values
    ):

        explanations.append(
            {
                "feature": feature,
                "value": float(value),
                "impact": round(
                    float(shap_value),
                    6
                ),
                "direction": (
                    "increases risk"
                    if shap_value > 0
                    else "decreases risk"
                )
            }
        )

    # -----------------------------------------------------
    # Sort by strongest impact
    # -----------------------------------------------------

    explanations.sort(
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    top_factors = explanations[:5]

    # -----------------------------------------------------
    # SAVE ASSESSMENT TO MONGODB
    # -----------------------------------------------------

    assessment_document = {
    "user_id": data.user_id,
    "health_data": data.model_dump(),
    "model_features": config["features"],
    "created_at": datetime.utcnow()
}

    assessment_result = assessments_collection.insert_one(
        assessment_document
    )

    # -----------------------------------------------------
    # SAVE PREDICTION TO MONGODB
    # -----------------------------------------------------

    prediction_document = {
    "user_id": data.user_id,
    "assessment_id": assessment_result.inserted_id,
    "prediction": prediction,
        "probability": round(
            probability,
            4
        ),
        "threshold": config["threshold"],
        "top_factors": top_factors,
        "created_at": datetime.utcnow()
    }

    predictions_collection.insert_one(
        prediction_document
    )

    # -----------------------------------------------------
    # RESPONSE
    # -----------------------------------------------------

    return {
        "prediction": prediction,
        "probability": round(
            probability,
            4
        ),
        "threshold": config["threshold"],
        "top_factors": top_factors
    }


# =========================================================
# AI ASSISTANT / CHAT
# =========================================================

@app.post("/chat")
def chat(data: ChatRequest):

    from bson import ObjectId
    from bson.errors import InvalidId

    # Validate user ID
    try:
        object_id = ObjectId(data.user_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid user ID"
        )

    # Check whether user exists
    user = users_collection.find_one(
        {"_id": object_id}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Generate AI response
    response = generate_response(
        data.message,
        data.context
    )

    # Save chat with user ID
    chat_document = {
        "user_id": data.user_id,
        "message": data.message,
        "context": data.context,
        "response": response,
        "created_at": datetime.utcnow()
    }

    chat_collection.insert_one(chat_document)

    return response
# =========================================================
# USER AI CONVERSATION COUNT
# =========================================================

@app.get("/user/{user_id}/chat-count")
def get_user_chat_count(user_id: str):

    from bson import ObjectId
    from bson.errors import InvalidId

    try:
        object_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid user ID"
        )

    user = users_collection.find_one(
        {"_id": object_id}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    count = chat_collection.count_documents(
        {"user_id": user_id}
    )

    return {"count": count}

# =========================================================
# USER ASSESSMENT HISTORY
# =========================================================

@app.get("/user/{user_id}/history")
def get_user_history(user_id: str):

    from bson import ObjectId
    from bson.errors import InvalidId

    # Validate user ID
    try:
        object_id = ObjectId(user_id)
    except InvalidId:
        raise HTTPException(
            status_code=400,
            detail="Invalid user ID"
        )

    # Check whether user exists
    user = users_collection.find_one(
        {"_id": object_id},
        {"password_hash": 0, "password_salt": 0}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Get this user's assessments
    assessments = list(
        assessments_collection.find(
            {"user_id": user_id}
        ).sort("created_at", -1)
    )

    # Get this user's predictions
    predictions = list(
        predictions_collection.find(
            {"user_id": user_id}
        ).sort("created_at", -1)
    )

    # Match predictions with assessments
    prediction_map = {
        str(item["assessment_id"]): item
        for item in predictions
    }

    history = []

    for assessment in assessments:
        assessment_id = str(assessment["_id"])
        prediction_data = prediction_map.get(assessment_id)

        history.append({
            "assessment_id": assessment_id,
            "created_at": assessment.get("created_at"),
            "health_data": assessment.get("health_data", {}),
            "prediction": (
                prediction_data.get("prediction")
                if prediction_data else None
            ),
            "probability": (
                prediction_data.get("probability")
                if prediction_data else None
            ),
            "threshold": (
                prediction_data.get("threshold")
                if prediction_data else None
            ),
            "top_factors": (
                prediction_data.get("top_factors", [])
                if prediction_data else []
            )
        })

    return {
        "email": user["email"],
        "total_assessments": len(history),
        "history": history
    }