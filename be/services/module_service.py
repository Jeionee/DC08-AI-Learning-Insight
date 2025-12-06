from repositories.module_progress_repository import ModuleProgressRepository

class ModuleService:
    @staticmethod
    def get_module_progress(student_id):
        return ModuleProgressRepository.get_by_student(student_id)
