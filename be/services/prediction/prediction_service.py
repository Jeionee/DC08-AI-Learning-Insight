from repositories.prediction_repository import PredictionRepository
from ml.predictor import LearningStyleModel

class LearningService:
    def __init__(self):
        self.repo = PredictionRepository()
        self.ml_model = LearningStyleModel()

    def predict_student_style(self, data):
       
        modules = float(data.get('modules_count_today', 0))
        minutes = float(data.get('avg_minutes_today', 0))
        consistency = float(data.get('consistency_std', 0))

        # 2. Minta Prediksi ke ML
        prediction_result = self.ml_model.predict(modules, minutes, consistency)

        # 3. Simpan ke Database (via Repository)
        # self.repo.save_prediction(modules, minutes, consistency, prediction_result)

        # 4. Return hasil bersih ke Controller
        return {
            'input': {
                'modules': modules,
                'minutes': minutes,
                'consistency': consistency
            },
            'learning_style': prediction_result
        }