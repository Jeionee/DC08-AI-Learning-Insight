import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Charts = ({ weekly, quizScores = [] }) => {
  if (!weekly) return <p>Loading...</p>;

  const {
    time_spent_hours = 0,
    avg_time_per_day = 0,
    target_met_days = 0,
    week_change = 0,
  } = weekly;

  const isIncrease = week_change >= 0;

  // Kelompokkan quiz berdasarkan journey_title
  const groupedByJourney = quizScores.reduce((acc, quiz) => {
    if (!acc[quiz.journey_title]) acc[quiz.journey_title] = [];
    acc[quiz.journey_title].push(quiz);
    return acc;
  }, {});

  return (
    <div className="space-y-6 mb-8">
      {/* Ringkasan Aktivitas */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">
          Aktivitas Mingguan
        </h4>
        <p className="text-lg text-gray-800 font-medium">
          Kamu belajar selama{" "}
          <span className="font-bold">{time_spent_hours} jam</span> minggu ini,
          rata-rata{" "}
          <span className="font-bold">{avg_time_per_day} jam/hari</span>.
          Targetmu tercapai selama{" "}
          <span className="font-bold text-blue-600">{target_met_days}</span>{" "}
          hari!
        </p>
        <p
          className={`text-sm mt-2 ${
            isIncrease ? "text-green-600" : "text-red-600"
          }`}
        >
          {isIncrease ? "Naik" : "Turun"} {Math.abs(week_change)} jam dibanding
          minggu lalu{" "}
          {isIncrease ? (
            <FaArrowUp className="inline" />
          ) : (
            <FaArrowDown className="inline" />
          )}
        </p>
      </div>

      {/* Nilai Kuis */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nilai Kuis</h3>
        <p className="text-sm text-gray-500 mb-4">
          Hasil nilai tiap kuis yang telah kamu kerjakan
        </p>

        {quizScores.length === 0 ? (
          <p className="text-gray-400 text-sm">Belum ada nilai kuis.</p>
        ) : (
          Object.entries(groupedByJourney).map(([journey, quizzes]) => (
            <div key={journey} className="mb-4">
              {/* Nama Journey */}
              <h4 className="font-semibold text-gray-800 text-lg mb-2">
                {journey}
              </h4>

              {/* Submodul */}
              <div className="space-y-2">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.result_id}
                    className="bg-white rounded-xl p-3 flex justify-between items-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className="font-medium text-gray-800">
                        {quiz.tutorial_title}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">
                        {quiz.score}
                      </span>
                      <span className="text-gray-500 text-sm"> / 100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Charts;
