import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBook, FaQuestionCircle } from "react-icons/fa";

// Data dummy modul
const dummyModules = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    description: "Pelajari dasar-dasar HTML dan CSS untuk membuat website sederhana.",
    lessons: [
      { id: 1, title: "Pengenalan HTML", type: "materi" },
      { id: 2, title: "Struktur Dasar HTML", type: "materi" },
      { id: 3, title: "Quiz 1", type: "quiz" },
      { id: 4, title: "CSS Basics", type: "materi" },
    ],
  },
  {
    id: 2,
    title: "JavaScript Basics",
    description: "Pelajari sintaks dasar, fungsi, dan manipulasi DOM di JavaScript.",
    lessons: [
      { id: 1, title: "Pengenalan JS", type: "materi" },
      { id: 2, title: "Variabel & Tipe Data", type: "materi" },
      { id: 3, title: "Quiz 1", type: "quiz" },
      { id: 4, title: "Function & Loop", type: "materi" },
    ],
  },
];

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const module = dummyModules.find((m) => m.id === parseInt(moduleId));
  if (!module) return <p>Modul tidak ditemukan</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
          <p className="text-gray-600 mt-1">{module.description}</p>
        </div>
        <button
          className="text-slate-600 hover:text-slate-800 font-semibold"
          onClick={() => navigate(-1)}
        >
          ← Kembali
        </button>
      </div>

      {/* List Materi & Quiz */}
      <ul className="space-y-4 mt-6">
        {module.lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              {lesson.type === "quiz" ? (
                <FaQuestionCircle className="text-yellow-500 w-6 h-6" />
              ) : (
                <FaBook className="text-blue-500 w-6 h-6" />
              )}
              <span className="text-gray-800 font-medium">{lesson.title}</span>
            </div>
            <button
              className={`px-3 py-1 rounded-lg text-white text-sm ${
                lesson.type === "quiz"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-blue-800 hover:bg-blue-700"
              }`}
            >
              {lesson.type === "quiz" ? "Mulai Quiz" : "Buka Materi"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
