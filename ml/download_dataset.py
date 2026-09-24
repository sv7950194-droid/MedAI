from ucimlrepo import fetch_ucirepo
import pandas as pd

# Fetch CDC Diabetes Health Indicators dataset
dataset = fetch_ucirepo(id=891)

# Get features and target
X = dataset.data.features
y = dataset.data.targets

# Combine into one DataFrame
df = pd.concat([X, y], axis=1)

# Save dataset
df.to_csv("ml/data/diabetes_dataset.csv", index=False)

print("Dataset downloaded successfully!")
print("Shape:", df.shape)
print("\nColumns:")
print(df.columns.tolist())