from utils.extensions import db
from models.results import Results
from models.registrations import Registration
from models.tutorials import Tutorial
from models.journeys import Journey
from sqlalchemy import func, case

class ResultsRepository:
    @staticmethod
    def get_results_by_student(student_id, journey_id=None, tutorial_id=None, limit=100, offset=0):
        q = (
            db.session.query(
                Results.id.label("result_id"),
                Results.score,
                Registration.id.label("registration_id"),
                Registration.registration_date,
                Registration.examinees_id,
                Registration.tutorial_id,
                Tutorial.title.label("tutorial_title"),
                Tutorial.developer_journey_id.label("developer_journey_id"),
                Journey.title.label("journey_title")
            )
            .join(Registration, Results.exam_registration_id == Registration.id)
            .join(Tutorial, Registration.tutorial_id == Tutorial.id)
            .join(Journey, Tutorial.developer_journey_id == Journey.id)
            .filter(Registration.examinees_id == student_id)
        )

        if journey_id:
            q = q.filter(Journey.id == journey_id)
        if tutorial_id:
            q = q.filter(Tutorial.id == tutorial_id)

        # MariaDB/MySQL tidak mendukung NULLS LAST; gunakan CASE untuk menempatkan NULL di akhir
        nulls_last_flag = case(
            (Registration.registration_date == None, 1),
            else_=0
        )
        q = q.order_by(nulls_last_flag.asc(), Registration.registration_date.desc(), Results.id.desc())

        rows = q.all()
        out = []
        for r in rows:
            out.append({
                "result_id": int(r.result_id) if r.result_id is not None else None,
                "score": int(r.score) if r.score is not None else None,
                "registration_id": int(r.registration_id) if r.registration_id is not None else None,
                "registration_date": str(r.registration_date) if r.registration_date else None,
                "tutorial_id": int(r.tutorial_id) if r.tutorial_id is not None else None,
                "tutorial_title": r.tutorial_title,
                "developer_journey_id": int(r.developer_journey_id) if r.developer_journey_id is not None else None,
                "journey_title": r.journey_title
            })
        return out

    @staticmethod
    def aggregate_by_tutorial(student_id, journey_id=None):
        q = (
            db.session.query(
                Registration.tutorial_id,
                Tutorial.title.label("tutorial_title"),
                func.count(Results.id).label("attempts"),
                func.avg(Results.score).label("avg_score"),
                func.max(Results.id).label("last_result_id")
            )
            .join(Registration, Results.exam_registration_id == Registration.id)
            .join(Tutorial, Registration.tutorial_id == Tutorial.id)
            .filter(Registration.examinees_id == student_id)
        )

        if journey_id:
            q = q.filter(Tutorial.developer_journey_id == journey_id)

        q = q.group_by(Registration.tutorial_id, Tutorial.title)
        rows = q.all()

        out = []
        for r in rows:
            out.append({
                "tutorial_id": int(r.tutorial_id) if r.tutorial_id is not None else None,
                "tutorial_title": r.tutorial_title,
                "attempts": int(r.attempts),
                "avg_score": float(r.avg_score) if r.avg_score is not None else None,
                "last_result_id": int(r.last_result_id) if r.last_result_id is not None else None
            })
        return out