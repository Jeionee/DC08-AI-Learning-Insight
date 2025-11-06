import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Line, LineChart } from 'recharts';

const Charts = ({ weeklyActivity, learningDistribution }) => {
  // Calculate week over week growth
  const totalHoursThisWeek = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);
  const avgHoursPerDay = totalHoursThisWeek / 7;
  const goalAchievement = weeklyActivity.filter(day => day.hours >= day.goal).length;

  // Custom tooltip for the bar chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Jam Belajar: {payload[0].value}h
          </p>
          <p className="text-sm text-teal-600">
            Target: {payload[1].value}h
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[0].value >= payload[1].value ? '✅ Target tercapai' : '🎯 Di bawah target'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500">Total Jam Minggu Ini</h4>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{totalHoursThisWeek}h</span>
            <span className="ml-2 text-sm text-green-600">+2.5h dari minggu lalu</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500">Rata-rata per Hari</h4>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{avgHoursPerDay.toFixed(1)}h</span>
            <span className="ml-2 text-sm text-gray-600">dari target 5h</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h4 className="text-sm font-medium text-gray-500">Target Tercapai</h4>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{goalAchievement}/7</span>
            <span className="ml-2 text-sm text-blue-600">hari minggu ini</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Aktivitas Mingguan</h3>
              <p className="text-sm text-gray-500 mt-1">Waktu belajar vs target harian</p>
            </div>
            <select className="text-sm border rounded-lg px-3 py-1.5 text-gray-700">
              <option>Minggu Ini</option>
              <option>Minggu Lalu</option>
              <option>2 Minggu Lalu</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: 'Jam', angle: -90, position: 'insideLeft' }} />
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

        {/* Learning Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Distribusi Pembelajaran</h3>
              <p className="text-sm text-gray-500 mt-1">Pembagian waktu per materi</p>
            </div>
            <select className="text-sm border rounded-lg px-3 py-1.5 text-gray-700">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
              <option>Semua Waktu</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={learningDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {learningDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Insight Minggu Ini</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fokus terbesar pada {learningDistribution[0].name} ({learningDistribution[0].value}%)
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Perlu tambah waktu untuk {learningDistribution[learningDistribution.length - 1].name}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;