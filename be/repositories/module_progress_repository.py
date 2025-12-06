from models.module_progress import ModuleProgress

class ModuleProgressRepository:
    @staticmethod
    def get_by_student(student_id):
        return ModuleProgress.query.filter_by(student_id=student_id).first()
