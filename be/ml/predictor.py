import joblib
import numpy as np
import pandas as pd
from utils.config import Config

FEATURE_NAMES = [
    'max_modules_1day', 'consistency_std', 'active_days', 
    'total_modules_done', 'unique_modules', 'total_clicks', 
    'revisit_ratio', 'avg_exam_score', 'exam_attempts', 
    'avg_project_rating', 'total_submissions'
]

try:
    LEARNING_STYLE_MODEL = joblib.load(Config.MODEL_PATH)
except FileNotFoundError:
    LEARNING_STYLE_MODEL = None

def predict_learning_style(features):
    if LEARNING_STYLE_MODEL is None:
        return "Model_Not_Loaded"
        
    # Mengubah list features menjadi NumPy array 1 baris
    input_array = np.array(features).reshape(1, -1) 
    
    # Mengubah NumPy array menjadi Pandas DataFrame dengan nama kolom
    input_df = pd.DataFrame(input_array, columns=FEATURE_NAMES)

    # Melakukan prediksi menggunakan DataFrame
    prediction = LEARNING_STYLE_MODEL.predict(input_df)
    
    return prediction[0]