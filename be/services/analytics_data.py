from sqlalchemy import text
# GANTI IMPORT INI sesuai lokasi objek 'db' di project kamu
# Biasanya: from app import db
# Atau: from extensions import db
from app import db


def fetch_student_analytics(user_id):
    """Mengambil data dari SQL View"""
    try:
        # Query ke View yang sudah kita buat di MySQL
        query = text("""
            SELECT * FROM view_student_analytics_realtime
            WHERE developer_id = :uid
            LIMIT 1
        """)

        # Eksekusi menggunakan koneksi Flask-SQLAlchemy yang sudah ada
        result = (
            db.session.execute(query, {"uid": user_id})
            .mappings()
            .one_or_none()
        )

        return dict(result) if result else None
    except Exception as e:
        print(f"Error fetching analytics: {e}")
        return None