import React from "react";
import { Calendar, CheckCircle2, TrendingUp } from "lucide-react";

export default function RightSidebarWidgets({ dailyProgress }) {
  // Dummy data streak days
  const days = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];
  const activeDay = new Date().getDay(); // 0-6

  return (
    <div className="space-y-6">
      
      {/* 1. Daily Target Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 text-green-600 rounded-xl">
            <TrendingUp size={20} />
          </div>
          <h3 className="font-bold text-slate-800">Target Harian</h3>
        </div>
        
        <div className="flex justify-between items-end mb-2">
          <span className="text-3xl font-extrabold text-slate-900">
            {Math.floor(dailyProgress.time_spent_hours / 60)} <span className="text-base font-normal text-slate-500">Jam</span>
          </span>
          <span className="text-sm font-medium text-slate-400 mb-1">
            / {Math.floor(dailyProgress.target_hours / 60)} Jam
          </span>
        </div>
        
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full" 
            style={{ width: `${dailyProgress.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* 2. Streak Calendar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="text-indigo-500" size={20} />
            <h3 className="font-bold text-slate-800">Learning Streak</h3>
          </div>
          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-lg">🔥 12 Hari</span>
        </div>

        <div className="flex justify-between">
          {days.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-slate-400">{day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${idx === activeDay 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' 
                  : idx < activeDay 
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                    : 'bg-slate-50 text-slate-300'
                }`}>
                {idx <= activeDay ? <CheckCircle2 size={14} /> : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}