import joblib
import pandas as pd
import os

class PredictionService:
    @staticmethod
    def predict(data):
        # Pastikan data yang diterima sudah memiliki field yang benar
        try:
            # Menggunakan path relatif untuk menemukan model di folder 'ml'
            model_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'model_learning_style.pkl')
            model = joblib.load(model_path)
            
            # Pastikan input data memiliki key yang benar
            modules_count_today = data.get("modules_count_today")
            avg_minutes_today = data.get("avg_minutes_today")
            consistency_std = data.get("consistency_std")

            # Pastikan data ada dan valid
            if modules_count_today is None or avg_minutes_today is None or consistency_std is None:
                return None, "Missing required fields in the request"

            # Membuat DataFrame dari input data
            input_data = pd.DataFrame([[modules_count_today, avg_minutes_today, consistency_std]], columns=["modules_count_today", "avg_minutes_today", "consistency_std"])
            
            # Lakukan prediksi
            prediction = model.predict(input_data)[0]

            return prediction, None
        except Exception as e:
            return None, f"Error during prediction: {str(e)}"
