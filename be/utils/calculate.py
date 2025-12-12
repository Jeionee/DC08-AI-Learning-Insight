import numpy as np
from collections import Counter
import logging

# Inisialisasi logger untuk debugging (Opsional, tapi direkomendasikan)
logger = logging.getLogger(__name__)

def calculate_features(trackings, submissions, registrations):
    """
    Menghitung fitur untuk prediksi gaya belajar dari data trackings, submissions, dan registrations.
    Perbaikan: Mengganti 'reg.results' dengan 'reg.score' berdasarkan asumsi nama kolom yang benar.
    """
    
    # --- Fitur Tracking dan Konsistensi ---
    total_modules_done = len(trackings)
    unique_modules = len(set(t.tutorial_id for t in trackings))

    active_days_set = set()
    modules_per_day = Counter()
    for t in trackings:
        if t.first_opened_at:
            date_key = t.first_opened_at.date()
            active_days_set.add(date_key)
            modules_per_day[date_key] += 1

    active_days = len(active_days_set)
    max_modules_1day = max(modules_per_day.values()) if modules_per_day else 0

    if modules_per_day:
        counts = list(modules_per_day.values())
        consistency_std = np.std(counts)
    else:
        consistency_std = 0.0

    total_clicks = total_modules_done * 10 
    
    # --- Fitur Submission/Proyek ---
    total_submissions = len(submissions)
    avg_project_rating = np.mean([s.rating for s in submissions]) if submissions else 0.0

    # --- Fitur Registrasi/Ujian (Perbaikan Error ada di bagian ini) ---
    exam_attempts = len(registrations)
    
    all_scores = []
    for reg in registrations:
        # ASUMSI PERBAIKAN: Ganti reg.results dengan reg.score atau reg.final_score, dll.
        # Saya menggunakan 'score' sebagai contoh.
        # Kita menggunakan 'hasattr' dan cek 'is not None' untuk keamanan.
        if hasattr(reg, 'score') and reg.score is not None:
            # Menggunakan nilai score secara langsung
            all_scores.append(reg.score) 
        # Jika kamu yakin namanya 'final_score', ganti menjadi:
        # if hasattr(reg, 'final_score') and reg.final_score is not None:
        #     all_scores.append(reg.final_score)

    avg_exam_score = np.mean(all_scores) if all_scores else 0.0
    
    # --- Fitur Tambahan ---
    revisit_ratio = (total_modules_done - unique_modules) / total_modules_done if total_modules_done > 0 else 0.0

    # --- Output Fitur ---
    features = [
        max_modules_1day, 
        consistency_std, 
        active_days, 
        total_modules_done, 
        unique_modules, 
        total_clicks, 
        revisit_ratio, 
        avg_exam_score, 
        exam_attempts, 
        avg_project_rating, 
        total_submissions
    ]
    
    return features