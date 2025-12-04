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
import { CheckCircle, AlertCircle } from "lucide-react";

const Charts = () => {
  // 🟢 Data Dummy - Aktivitas Mingguan
  const weeklyActivity = [
    { day: "Senin", hours: 3, goal: 4 },
    { day: "Selasa", hours: 2, goal: 4 },
    { day: "Rabu", hours: 5, goal: 4 },
    { day: "Kamis", hours: 4, goal: 4 },
    { day: "Jumat", hours: 6, goal: 4 },
    { day: "Sabtu", hours: 2, goal: 4 },
    { day: "Minggu", hours: 3, goal: 4 },
  ];

  // 🟢 Data Dummy - Nilai Kuis
  const quizScores = [
    { name: "HTML", value: 85, color: "#4cc9f0" },
    { name: "CSS", value: 90, color: "#4361ee" },
    { name: "JavaScript", value: 70, color: "#f72585" },
  ];

  // 🔢 Ringkasan
  const totalHoursThisWeek = weeklyActivity.reduce(
    (sum, day) => sum + day.hours,
    0
  );
  const avgHoursPerDay = totalHoursThisWeek / 7;
  const goalAchievement = weeklyActivity.filter(
    (day) => day.hours >= day.goal
  ).length;

  // Tooltip kustom
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Jam Belajar: {payload[0].value}h
          </p>
          <p className="text-sm text-teal-600">Target: {payload[1].value}h</p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[0].value >= payload[1].value
              ? "✅ Target tercapai"
              : "🎯 Di bawah target"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 mb-8">
      {/* 🧭 Ringkasan Aktivitas Mingguan */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">
          Aktivitas Mingguan
        </h4>
        <p className="text-lg text-gray-800 font-medium">
          Kamu belajar selama{" "}
          <span className="font-bold">{totalHoursThisWeek} jam</span> minggu ini,
          rata-rata{" "}
          <span className="font-bold">{avgHoursPerDay.toFixed(1)} jam/hari</span>
          . Targetmu tercapai selama{" "}
          <span className="font-bold text-blue-600">{goalAchievement}</span> hari!
        </p>
        <p className="text-sm text-green-600 mt-2">
          Naik +2.5 jam dibanding minggu lalu 🚀
        </p>
      </div>

      {/* 🧩 Grafik & Kuis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Aktivitas Mingguan */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Aktivitas Mingguan
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Waktu belajar vs target harian
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyActivity}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis
                  label={{ value: "Jam", angle: -90, position: "insideLeft" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="hours"
                  name="Jam Belajar"
                  fill="#4361ee"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="goal"
                  name="Target"
                  fill="#4cc9f0"
                  radius={[4, 4, 0, 0]}
                  opacity={0.7}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🎓 Nilai Kuis */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Nilai Kuis</h3>
          <p className="text-sm text-gray-500 mb-6">
            Performa nilai rata-rata per materi
          </p>

          {/* 🧩 Kartu Nilai */}
          <div className="space-y-4">
            {quizScores.map((quiz, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {quiz.name}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      quiz.value >= 85
                        ? "text-green-600"
                        : quiz.value >= 75
                        ? "text-blue-600"
                        : "text-red-500"
                    }`}
                  >
                    {quiz.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${quiz.value}%`,
                      background: `linear-gradient(90deg, ${quiz.color}, #3a0ca3)`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Insight */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" />
              Nilai tertinggi: {quizScores[1].name} ({quizScores[1].value}%)
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="text-blue-500 w-4 h-4" />
              Perlu peningkatan pada {quizScores[2].name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
