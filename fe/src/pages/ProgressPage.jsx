import React from "react";
import { FaCheckCircle, FaClock, FaChartBar } from "react-icons/fa";

export default function ProgressPage({ progress, modules }) {

  // Hitung summary
  const completedModules = modules.filter(m => m.progress === 100).length;
  const totalModules = modules.length;

  // Hitung total waktu (dummy karena tidak ada datanya)
  const totalHours =  Math.floor(progress.timeSpentToday / 60);

  // Hitung rata-rata score semua assessments
  const allScores = modules
    .flatMap(m => m.assessments.map(a => a.score))
    .filter(score => score !== null);

  const averageScore = allScores.length
    ? Math.floor(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;


  return (
    <div className="flex-1 pr-8 py-1 pl-0 border-0">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Progress Belajar</h1>
        <p className="text-gray-600 mt-3">
          Lihat perkembangan belajarmu dari setiap modul.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Modul Selesai */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <FaCheckCircle className="text-blue-600 text-xl" />
            <h3 className="text-gray-700 font-semibold text-sm">Module Completed</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {completedModules}
          </div>
          <p className="text-gray-500 text-sm mt-1">
            dari {totalModules} modul
          </p>
        </div>

        {/* Total Waktu */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <FaClock className="text-blue-600 text-xl" />
            <h3 className="text-gray-700 font-semibold text-sm">Total Waktu Belajar</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {totalHours}h
          </div>
          <p className="text-gray-500 text-sm mt-1">hari ini</p>
        </div>

        {/* Rata-rata skor */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <FaChartBar className="text-blue-600 text-xl" />
            <h3 className="text-gray-700 font-semibold text-sm">Average Assessment</h3>
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {averageScore}%
          </div>
          <p className="text-gray-500 text-sm mt-1">nilai rata-rata</p>
        </div>
      </div>

      {/* MODULE LIST */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Module Progress</h2>

      <div className="space-y-5">
        {modules.map(module => {
          const percentage = module.progress;

          return (
            <div key={module.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">

              <div className="flex justify-between mb-2">
                <h3 className="text-gray-800 font-semibold">
                  {module.title}
                </h3>

                <span className={`text-sm font-bold ${
                  percentage < 40
                    ? "text-red-500"
                    : percentage < 70
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}>
                  {percentage}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-2 ${
                    percentage < 40
                      ? "bg-red-500"
                      : percentage < 70
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Assessments */}
              <div className="mt-3 text-sm text-gray-600">
                <p className="font-semibold mb-1">Assessment Scores:</p>
                {module.assessments.map((a, index) => (
                  <p key={index} className="text-gray-700">
                    {a.name}: {a.score ?? "Belum dikerjakan"}
                  </p>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* INSIGHT */}
      <div className="mt-10 bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-blue-800 font-bold mb-1">Insight Untukmu</h3>
        <p className="text-blue-700 text-sm">
          Kamu menunjukkan perkembangan yang stabil. Pertahankan ritmemu!
        </p>
      </div>

    </div>
  );
}
