import joblib
import pandas as pd
import os

class LearningStyleModel:
    def __init__(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, "model_learning_style.pkl")

        try:
            self.model = joblib.load(model_path)
            self.feature_names = [
                "modules_count_today",
                "avg_minutes_today",
                "consistency_std"
            ]
            print("✅ Learning Style Model Loaded")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            self.model = None

    def predict(self, modules, minutes, consistency):
        if not self.model:
            return "Model Error"

        df = pd.DataFrame([[modules, minutes, consistency]], columns=self.feature_names)
        return self.model.predict(df)[0]
