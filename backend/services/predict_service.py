import pickle
import pandas as pd
from utils.config import MODEL_PATH, SCALER_PATH

# Carregar modelo e scaler
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(SCALER_PATH, 'rb') as f:
    scaler = pickle.load(f)

expected_cols = ['mean_radius', 'mean_texture', 'mean_perimeter', 'mean_area', 'mean_smoothness']

def predict(input_data):
    input_df = pd.DataFrame([input_data], columns=expected_cols)
    input_scaled = scaler.transform(input_df)
    prediction = model.predict(input_scaled)[0]
    return int(prediction)
