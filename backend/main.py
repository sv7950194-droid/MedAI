from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from pathlib import Path

app = FastAPI(title="Medi.AI API")

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "ml" / "models" / "xgboost_model.pkl"
CONFIG_PATH = BASE_DIR / "ml" / "models" / "medi_ai_model_config.pkl"

model = joblib.load(MODEL_PATH)
config = joblib.load(CONFIG_PATH)


class HealthInput(BaseModel):
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


@app.get("/")
def root():
    return {"message": "Medi.AI API is running"}


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "XGBoost"
    }


@app.post("/predict")
def predict(data: HealthInput):
    input_data = pd.DataFrame(
        [[getattr(data, feature) for feature in config["features"]]],
        columns=config["features"]
    )

    probability = float(model.predict_proba(input_data)[0][1])
    prediction = int(probability >= config["threshold"])

    return {
        "prediction": prediction,
        "probability": round(probability, 4),
        "threshold": config["threshold"]
    }
