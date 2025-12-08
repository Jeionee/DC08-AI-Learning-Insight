import React from "react";
import { FaCheckCircle, FaClock, FaChartBar } from "react-icons/fa";

export default function ProgressPage({ progress, modules }) {
  const dummyProgress = progress || { timeSpentToday: 200 };
  const dummyModules = modules || [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      progress: 85,
      assessments: [
        { name: "Quiz 1", score: 92 },
        { name: "Assignment", score: 88 },
        { name: "Final Test", score: 85 },
      ],
    },
    {
      id: 2,
      title: "JavaScript Basics",
      progress: 70,
      assessments: [
        { name: "Quiz 1", score: 78 },
        { name: "Assignment", score: 82 },
        { name: "Final Test", score: null },
      ],
    },
    {
      id: 3,
      title: "Responsive Web Design",
      progress: 45,
      assessments: [
        { name: "Quiz 1", score: 90 },
        { name: "Assignment", score: null },
        { name: "Final Test", score: null },
      ],
    },
  ];

  const completedModules = dummyModules.filter(
    (m) => m.progress === 100
  ).length;
  const totalModules = dummyModules.length;
  const totalHours = Math.floor(dummyProgress.timeSpentToday / 60);
  const allScores = dummyModules
    .flatMap((m) => m.assessments.map((a) => a.score))
    .filter((score) => score !== null);
  const averageScore = allScores.length
    ? Math.floor(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;

  const summaryCards = [
    {
      icon: FaCheckCircle,
      title: "Module Completed",
      value: completedModules,
      subtitle: `dari ${totalModules} modul`,
    },
    {
      icon: FaClock,
      title: "Total Waktu Belajar",
      value: `${totalHours}h`,
      subtitle: "hari ini",
    },
    {
      icon: FaChartBar,
      title: "Average Assessment",
      value: `${averageScore}%`,
      subtitle: "nilai rata-rata",
    },
  ];

  return (
    <div className="flex-1 pr-8 py-1 pl-0 border-0">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Progress Belajar</h1>
        <p className="text-gray-600 mt-3">
          Lihat perkembangan belajarmu dari setiap modul.
        </p>
      </div>

      {/* MODULE & SUMMARY CARDS */}
      <div className="space-y-6 pb-8">
        {dummyModules.map((module, i) => {
          const summary = summaryCards[i % summaryCards.length];
          return (
            <div key={module.id} className="flex gap-4">
              {/* MODULE CARD */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex-1">
                <h3 className="text-gray-800 font-semibold text-lg mb-3">
                  {module.title}
                </h3>
                <div
                  className={`text-3xl font-bold mb-2 ${
                    module.progress < 40
                      ? "text-red-500"
                      : module.progress < 70
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  {module.progress}%
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-2 ${
                      module.progress < 40
                        ? "bg-red-500"
                        : module.progress < 70
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                {/* assessments */}
                <div className="mt-4">
                  <p className="font-semibold text-gray-600 mb-2">
                    Assessments:
                  </p>
                  {module.assessments.map((a, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 px-3 py-2 rounded-lg text-sm flex-1 min-w-[120px]"
                    >
                      <span className="font-semibold">{a.name}:</span>
                      {""}

                      {a.score !== null ? (
                        a.score
                      ) : (
                        <span className="text-gray-400">Not completed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SUMMARY CARD */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 w-1/3 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                    <summary.icon className="text-3xl" />
                  </div>
                  <h3 className="text-gray-700 font-semibold text-xl">
                    {summary.title}
                  </h3>
                </div>
                <div className="text-4xl font-bold text-gray-900">
                  {summary.value}
                </div>
                <p className="text-gray-600 text-base">{summary.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
