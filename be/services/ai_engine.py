import google.generativeai as genai
import os
import json
import logging
import time
from dotenv import load_dotenv
from google.api_core import exceptions

# Load Environment Variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found!")

genai.configure(api_key=GEMINI_API_KEY)
logger = logging.getLogger(__name__)

def build_universal_prompt(data):
    """
    Versi LITE: Prompt lebih pendek dan padat untuk menghemat token.
    """
    
    # 1. Helper untuk format angka aman (Mencegah SyntaxError)
    def safe_fmt(key, default=0.0):
        val = data.get(key)
        try:
            return f"{float(val):.1f}" if val is not None else f"{default:.1f}"
        except:
            return f"{default:.1f}"

    # 2. Siapkan Data
    name = data.get('student_name', 'Student')
    label = data.get('current_label', 'General')
    
    today_mod = data.get('today_modules', 0)
    today_clicks = data.get('today_clicks', 0)
    
    avg_mod = safe_fmt('avg_modules_per_active_day')
    consistency = safe_fmt('consistency_std')
    exam = safe_fmt('avg_exam_score')
    proj = safe_fmt('avg_project_rating')
    
    # 3. Prompt Singkat (Hemat Token)
    return f"""
    Role: AI Coding Mentor.
    Task: Analyze student stats & give 2 strategies (JSON).

    Student: {name} ({label})
    Today: {today_mod} modules, {today_clicks} clicks.
    History: Avg {avg_mod} mod/day, Consistency {consistency}.
    Scores: Exam {exam}, Project {proj}.

    Diagnosis Rules:
    1. If Today Mod=0 & Clicks>10 -> "Analysis Paralysis". Action: Coding directly.
    2. If Today Mod=0 & Clicks<5 -> "Low Motivation". Action: 5-min rule.
    3. If Today Mod > 1.5x Avg -> "On Fire" or "Rushing" (check exam score).
    4. Match strategy with Label ({label}).

    Output JSON ONLY:
    {{
      "diagnosis_summary": "1 sentence diagnosis.",
      "recommendations": [
        {{
          "title": "Strategy 1",
          "type": "Intervention/Method",
          "trigger_reason": "Reason based on data",
          "action_items": ["Step 1", "Step 2"],
          "estimated_min": "15"
        }},
        {{
          "title": "Strategy 2",
          "type": "Mindset/Challenge",
          "trigger_reason": "Reason",
          "action_items": ["Step 1", "Step 2"],
          "estimated_min": "30"
        }}
      ]
    }}
    """

def generate_recommendations_from_ai(data):
    """
    Mengirim data ke Gemini dengan Retry Logic & Prompt Hemat.
    """
    max_retries = 1
    base_delay = 2

    prompt = build_universal_prompt(data)

    for attempt in range(max_retries + 1):
        try:
            # Gunakan model paling ringan
            model = genai.GenerativeModel('gemini-2.5-flash-lite')
            
            response = model.generate_content(prompt)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            
            return json.loads(clean_text)

        except exceptions.ResourceExhausted:
            print(f"⚠️ [AI] Quota Limit. Attempt {attempt + 1}...")
            if attempt < max_retries:
                time.sleep(base_delay * (2 ** attempt))
                continue
            else:
                return {
                    "diagnosis_summary": "Sistem sedang istirahat (Limit Kuota Harian).",
                    "recommendations": [
                        {
                            "title": "Rehat Sejenak",
                            "type": "Fallback",
                            "trigger_reason": "Quota Limit",
                            "action_items": ["Review catatan", "Istirahat sejenak"],
                            "estimated_min": "15"
                        },
                        {
                            "title": "Lanjut Belajar",
                            "type": "Mandiri",
                            "trigger_reason": "Quota Limit",
                            "action_items": ["Cek materi selanjutnya", "Latihan mandiri"],
                            "estimated_min": "10"
                        }
                    ]
                }
        except Exception as e:
            print(f"❌ [AI] Error: {e}")
            return {
                "diagnosis_summary": "Gagal terhubung ke AI.",
                "recommendations": []
            }