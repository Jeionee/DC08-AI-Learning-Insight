import React from "react";
import { Play, Clock } from "lucide-react";

export default function ContinueLearning() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-slate-800 font-bold text-lg">Lanjutkan Belajar</h3>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Terakhir dibuka
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 items-center">
        {/* Thumbnail Dummy */}
        <div className="w-full sm:w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl shadow-inner">
          ⚛️
        </div>
        
        <div className="flex-1 w-full">
          <h4 className="font-bold text-slate-900 text-xl mb-1 group-hover:text-indigo-600 transition-colors">
            React.js Fundamentals
          </h4>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
            <Clock size={14} />
            <span>Bab 4: State & Props Management</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                Progress
              </span>
              <span className="text-xs font-semibold inline-block text-indigo-600">
                65%
              </span>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100">
              <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 rounded-full transition-all duration-1000"></div>
            </div>
          </div>
        </div>

        <button className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-200 hover:scale-110 active:scale-95 transition-all">
          <Play size={24} fill="currentColor" className="ml-1" />
        </button>
      </div>
    </div>
  );
}