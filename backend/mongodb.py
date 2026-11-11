from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["medai"]

users_collection = db["users"]
assessments_collection = db["assessments"]
predictions_collection = db["predictions"]
chat_collection = db["chat_history"]

print("MongoDB connected successfully!")