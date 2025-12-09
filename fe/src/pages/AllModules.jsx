// pages/AllModules.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Data dummy seluruh modul
const allModules = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    description: "Pelajari dasar-dasar HTML dan CSS untuk membuat website sederhana.",
    progress: 85,
  },
  {
    id: 2,
    title: "JavaScript Basics",
    description: "Pelajari sintaks dasar, fungsi, dan manipulasi DOM di JavaScript.",
    progress: 70,
  },
  {
    id: 3,
    title: "Responsive Web Design",
    description: "Belajar membuat tampilan website yang responsive untuk semua device.",
    progress: 45,
  },
  {
    id: 4,
    title: "React Basics",
    description: "Pelajari dasar-dasar React dan membuat komponen interaktif.",
    progress: 60,
  },
  {
    id: 5,
    title: "Backend fundamental",
    description: "Pelajari dasar backend dengan Node.js dan pembuatan server sederhana.",
    progress: 0,
  },
  {
    id: 6,
    title: "Version Control with Git",
    description: "Pelajari Git dan GitHub untuk manajemen versi proyek secara efisien.",
    progress: 0,
  },
];

export default function AllModules() {
  const navigate = useNavigate();

  const getProgressColor = (percent) => {
    if (percent < 40) return "bg-red-500";
    if (percent < 60) return "bg-yellow-400";
    if (percent < 80) return "bg-blue-400";
    return "bg-blue-500";
  };

  const handleViewModule = (id) => {
    navigate(`/module/${id}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Lanjutkan Perjalan Belajarmu</h1>
          <p className="text-gray-600 text-lg">
            Jelajahi seluruh modul dan tingkatkan kemampuanmu satu langkah lebih dekat ke tujuan belajar.
          </p>
        </div>
      </div>

      {/* Grid semua modul */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allModules.map((module) => (
          <div
            key={module.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition flex flex-col justify-between"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
            <p className="text-gray-600 mb-4 flex-1">{module.description}</p>

            <div className="mb-4">
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(
                    module.progress
                  )}`}
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-700 mt-1 block">
                {module.progress}%
              </span>
            </div>

            <button
              onClick={() => handleViewModule(module.id)}
              className="mt-2 px-4 py-2 bg-blue-950 text-white rounded-xl shadow hover:bg-blue-900 transition"
            >
              Lihat Modul
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
