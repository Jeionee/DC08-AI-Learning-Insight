# Student API Documentation

Dokumentasi ini menyediakan informasi mengenai endpoint yang tersedia untuk mengakses data siswa, wawasan belajar, aktivitas, nilai, dan rekomendasi.

## Base URL

## `http://127.0.0.1`

## Endpoints

### Register

**Request:**
`POST /api/auth/login`

**Body Request:**

```json
{
	"name": "nama kamu",
	"email": "EmailKamu@gmail.com",
	"password": "PasswordKamu"
}
```

### Register

**Request:**
`POST /api/auth/register`

**Body Request:**

```json
{
	"email": "emailKamu@gmail.com",
	"password": "passwordKamu"
}
```

### 1. Get Student Profile

Mengambil informasi profil dasar siswa.

**Request:**
`GET /students/{studentId}\`

**Response Example:**

```json
{
	"photo_profile": "https://cdn.example.com/profiles/avatar_123.jpg",
	"name": "Andi Pratama",
	"learning_style": "Visual",
	"email": "andi.pratama@example.com",
	"program": "Full Stack Web Development",
	"level": "Intermediate",
	"joined_since": "2023-09-01"
}
```

---

### 2. Get Daily Insights

Mengambil wawasan harian siswa, termasuk progres modul dan waktu belajar hari ini.

**Request:**
`GET /students/{studentId}/activity/today`

**Response Example:**

```json
{
	"js_module_progress_delta": 5,
	"time_spent_today": 45,
	"daily_goal": 60,
	"learning_style": "Visual"
}
```

---

### 3. Get Weekly Activity

Mengambil ringkasan aktivitas belajar siswa selama 7 hari terakhir.

**Request:**
`GET /students/{studentId}/activity/weekly`

**Response Example:**

```json
{
	"total_hours": 12.5,
	"avg_hours_per_day": 1.7,
	"days_met_goal": 4,
	"delta_vs_last_week": "+1.5 hours",
	"daily_breakdown": [
		{ "day": "Mon", "hours": 2.0 },
		{ "day": "Tue", "hours": 1.5 },
		{ "day": "Wed", "hours": 3.0 },
		{ "day": "Thu", "hours": 0.5 },
		{ "day": "Fri", "hours": 2.5 },
		{ "day": "Sat", "hours": 1.0 },
		{ "day": "Sun", "hours": 2.0 }
	]
}
```

---

### 4. Get Quiz Scores

Mengambil nilai kuis per mata pelajaran dan analisis performa.

**Request:**
`GET /students/{studentId}/quiz-scores`

**Response Example:**

```json
{
	"scores": {
		"HTML": 85,
		"CSS": 72,
		"JavaScript": 90
	},
	"highest_course": "JavaScript",
	"needs_improvement": "CSS"
}
```

---

### 5. Get Recommendations

Mendapatkan rekomendasi materi pembelajaran yang dipersonalisasi.

**Request:**
`GET /students/{studentId}/recommendations/`

**Response Example:**

```json
[
	{
		"title": "CSS Flexbox Mastery",
		"category": "CSS",
		"description": "Pelajari cara mengatur layout responsif dengan Flexbox.",
		"progress_percent": 0,
		"action_label": "Mulai Belajar"
	},
	{
		"title": "Async/Await in JS",
		"category": "JavaScript",
		"description": "Pahami konsep asynchronous programming modern.",
		"progress_percent": 20,
		"action_label": "Lanjutkan"
	}
]
```

---

### 6. Get Module Progress

Mengambil detail progres modul serta rekapitulasi nilai tugas dan ujian.

**Request:**
`GET /students/{studentId}/modules/progress/`

**Response Example:**

```json
{
	"progress_percent": 68,
	"tasks_completed": 15,
	"tasks_total": 22,
	"grades": {
		"quiz": 82,
		"assignment": 88,
		"final_test": null
	}
}
```

---
