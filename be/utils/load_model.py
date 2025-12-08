import joblib
import pandas as pd
import os

class LearningStylePredictor:
    def __init__(self, model_filename='model_learning_style.pkl'):
        self.model_path = model_filename
        self.model = self._load_model()
        
        self.feature_names = ['modules_count_today', 'avg_minutes_today', 'consistency_std']

    def _load_model(self):
        if not os.path.exists(self.model_path):
            print(f"Error: File '{self.model_path}' tidak ditemukan!")
            return None
        
        try:
            loaded_model = joblib.load(self.model_path)
            print(f"Model '{self.model_path}' berhasil dimuat.")
            return loaded_model
        except Exception as e:
            print(f"Error saat load model: {e}")
            return None

    def predict(self, modules_count, avg_minutes, consistency_std):
        if not self.model:
            return "Error: Model not loaded"

        input_data = pd.DataFrame(
            [[modules_count, avg_minutes, consistency_std]], 
            columns=self.feature_names
        )

        try:
            prediction = self.model.predict(input_data)[0]
            return prediction
        except Exception as e:
            return f"Prediction Error: {e}"