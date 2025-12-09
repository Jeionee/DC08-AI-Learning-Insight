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

const Charts = ({ weeklyActivity}) => {
  // Data Dummy - Aktivitas Mingguan
  // const weeklyActivity = [
  //   { day: "Senin", hours: 3, goal: 4 },
  //   { day: "Selasa", hours: 2, goal: 4 },
  //   { day: "Rabu", hours: 5, goal: 4 },
  //   { day: "Kamis", hours: 4, goal: 4 },
  //   { day: "Jumat", hours: 6, goal: 4 },
  //   { day: "Sabtu", hours: 2, goal: 4 },
  //   { day: "Minggu", hours: 3, goal: 4 },
  // ];

  // Data Dummy - Nilai Kuis
  const quizScores = [
    { name: "HTML & CSS Fundamentals", value: 85 },
    { name: "JavaScript Basics", value: 90 },
    { name: "Responsive Web Design", value: 70 },
  ];

  // Ringkasan Aktivitas
  const totalHoursThisWeek = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);
  const avgHoursPerDay = totalHoursThisWeek / 7;
  const goalAchievement = weeklyActivity.filter((day) => day.hours >= day.goal).length;

  // Tooltip kustom untuk grafik
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">Jam Belajar: {payload[0].value}h</p>
          <p className="text-sm text-teal-600">Target: {payload[1].value}h</p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[0].value >= payload[1].value ? "Target tercapai" : "Di bawah target"}
          </p>
        </div>
      );
    }
    return null;
  };

  // Nilai tertinggi & terendah
  const highestScore = quizScores.reduce((a, b) => (a.value > b.value ? a : b));
  const lowestScore = quizScores.reduce((a, b) => (a.value < b.value ? a : b));

  return (
    <div className="space-y-6 mb-8">
      {/* Ringkasan Aktivitas */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">Aktivitas Mingguan</h4>
        <p className="text-lg text-gray-800 font-medium">
          Kamu belajar selama <span className="font-bold">{totalHoursThisWeek} jam</span> minggu ini, rata-rata{" "}
          <span className="font-bold">{avgHoursPerDay.toFixed(1)} jam/hari</span>. Targetmu tercapai selama{" "}
          <span className="font-bold text-blue-600">{goalAchievement}</span> hari!
        </p>
        <p className="text-sm text-green-600 mt-2">
          Naik +2.5 jam dibanding minggu lalu <FaArrowUp className="inline text-green-600" />
        </p>
      </div>

      {/* Grid Grafik & Nilai Kuis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Aktivitas Mingguan */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aktivitas Mingguan</h3>
          <p className="text-sm text-gray-500 mb-4">Waktu belajar vs target harian</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: "Jam", angle: -90, position: "insideLeft" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="hours" name="Jam Belajar" fill="#4361ee" radius={[4, 4, 0, 0]} />
                <Bar dataKey="goal" name="Target" fill="#4cc9f0" radius={[4, 4, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nilai Kuis */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nilai Kuis</h3>
          <p className="text-sm text-gray-500 mb-4">Hasil nilai tiap kuis yang telah kamu kerjakan</p>

          <div className="space-y-3">
            {quizScores.map((quiz, idx) => {
              let color = quiz.value >= 85 ? "text-green-600" : quiz.value >= 75 ? "text-blue-600" : "text-red-500";
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <span className="font-medium text-gray-800">{quiz.name}</span>
                  <span className={`font-semibold ${color}`}>{quiz.value}%</span>
                </div>
              );
            })}
          </div>

          {/* Insight */}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaArrowUp className="text-green-500" />
              Nilai tertinggi: {highestScore.name} ({highestScore.value}%)
            </div>
            <div className="flex items-center gap-2">
              <FaArrowDown className="text-red-500" />
              Perlu peningkatan pada {lowestScore.name} ({lowestScore.value}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
