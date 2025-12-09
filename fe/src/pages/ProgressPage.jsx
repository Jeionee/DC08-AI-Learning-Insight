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
                      : module.progress < 60
                      ? "text-yellow-500"
                      : module.progress < 80
                      ? "text-blue-600"
                      : module.progress < 100
                      ? "text-blue-700"
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
                        : module.progress < 60
                        ? "bg-yellow-500"
                        : module.progress < 80
                        ? "bg-blue-600"
                        : module.progress < 100
                        ? "bg-blue-700"
                        : "bg-blue-700"
                    }`}
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                {/* assessments */}
                <div className="mt-4">
                  <p className="font-semibold text-gray-600 mb-2">
                    Assessments:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {module.assessments.map((a, idx) => {
                      let scoreColor = "";
                      if (a.score === null)
                        scoreColor = "bg-blue-50 text-gray-400";
                      else if (a.score >= 85)
                        scoreColor = "bg-blue-200 text-blue-600";
                      else if (a.score >= 70)
                        scoreColor = "bg-yellow-100 text-yellow-700";
                      else scoreColor = "bg-red-100 text-red-700";

                      return (
                        <div
                          key={idx}
                          className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm font-medium ${scoreColor}`}
                        >
                          <span>{a.name}</span>
                          <span>
                            {a.score !== null ? `${a.score}%` : "Not completed"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SUMMARY CARD */}
              {/* SUMMARY CARD */}
              <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-gray-100 w-1/3 flex flex-col justify-center hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-5 bg-blue-200 text-blue-700 rounded-full shadow-md">
                    <summary.icon className="text-4xl" />
                  </div>
                  <h3 className="text-gray-700 font-semibold text-xl">
                    {summary.title}
                  </h3>
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-1">
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
