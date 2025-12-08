# services/results_service.py
from repositories.results_repository import ResultsRepository

class ResultsService:
    @staticmethod
    def fetch_results_for_student(student_id, journey_id=None, tutorial_id=None, limit=50, offset=0):
        try:
            results = ResultsRepository.get_results_by_student(student_id, journey_id=journey_id, tutorial_id=tutorial_id, limit=limit, offset=offset)
            return results, None
        except Exception as e:
            return None, str(e)

    @staticmethod
    def fetch_aggregates_for_student(student_id, journey_id=None):
        try:
            agg = ResultsRepository.aggregate_by_tutorial(student_id, journey_id=journey_id)
            return agg, None
        except Exception as e:
            return None, str(e)
