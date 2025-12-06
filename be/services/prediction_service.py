from ml.predictor import LearningStyleModel

class PredictionService:
    model = LearningStyleModel()

    @staticmethod
    def predict(data):
        modules = data.get("modules_count_today")
        minutes = data.get("avg_minutes_today")
        consistency = data.get("consistency_std")

        if modules is None or minutes is None or consistency is None:
            return None, "Missing required fields"

        result = PredictionService.model.predict(modules, minutes, consistency)
        return result, None
