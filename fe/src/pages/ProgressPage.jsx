import React, { useState } from "react";
import { CheckCircle2, Clock, Trophy, TrendingUp, ChevronDown, Award, Star, Zap } from "lucide-react";

export default function ProgressPage({ progress, modules }) {
  const dummyProgress = progress || { timeSpentToday: 200 };
  const dummyModules = modules || [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      category: "Frontend",
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
      category: "Logic",
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
      category: "Frontend",
      progress: 45,
      assessments: [
        { name: "Quiz 1", score: 90 },
        { name: "Assignment", score: null },
        { name: "Final Test", score: null },
      ],
    },
  ];

  const completedModules = dummyModules.filter((m) => m.progress === 100).length;
  const totalModules = dummyModules.length;
  const totalHours = Math.floor(dummyProgress.timeSpentToday / 60);
  const allScores = dummyModules.flatMap((m) => m.assessments.map((a) => a.score)).filter((s) => s !== null);
  const averageScore = allScores.length ? Math.floor(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden relative">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-3xl -z-10 -translate-x-1/4"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        
        {/* --- HEADER --- */}
        <div className="mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> Statistics
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                Progress Belajar
              </h1>
              <p className="text-slate-500 text-lg mt-2 max-w-xl leading-relaxed">
                Pantau terus perkembangan skillmu. Setiap langkah kecil membawamu lebih dekat ke tujuan! 🚀
              </p>
            </div>
            

          </div>
        </div>

        {/* --- HERO STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={CheckCircle2} 
            title="Completed" 
            value={completedModules} 
            subtitle={`/ ${totalModules} Modul`} 
            color="emerald" 
          />
          <StatCard 
            icon={Clock} 
            title="Total Waktu" 
            value={totalHours} 
            subtitle="Jam Belajar" 
            color="blue" 
          />
          <StatCard 
            icon={Trophy} 
            title="Avg Score" 
            value={averageScore} 
            subtitle="Poin" 
            color="indigo" 
          />
        </div>

        {/* --- MODULE LIST --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-indigo-500" size={24} />
              Detail Modul
            </h2>
            <span className="text-sm text-slate-400 font-medium">{dummyModules.length} Course Active</span>
          </div>

          {dummyModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENT: STAT CARD ---
function StatCard({ icon: Icon, title, value, subtitle, color }) {
  const themes = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", iconBg: "bg-white" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", iconBg: "bg-white" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100", iconBg: "bg-white" },
  };
  
  const theme = themes[color];

  return (
    <div className={`relative overflow-hidden p-6 rounded-[2rem] border ${theme.border} ${theme.bg} hover:-translate-y-1 transition-transform duration-300 group`}>
      <Icon className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-10 ${theme.text} rotate-12`} />
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl ${theme.iconBg} shadow-sm flex items-center justify-center mb-4 ${theme.text}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className={`${theme.text} text-xs font-bold uppercase tracking-wider mb-1 opacity-80`}>{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-800 tracking-tight">{value}</span>
            <span className="text-sm font-semibold text-slate-500">{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: MODULE CARD (Updated) ---
function ModuleCard({ module }) {
  const [isOpen, setIsOpen] = useState(false);

  const getGradient = (val) => {
    if (val >= 100) return "from-emerald-400 to-emerald-500";
    if (val >= 70) return "from-blue-400 to-indigo-500";
    return "from-amber-400 to-orange-500";
  };

  return (
    // PERBAIKAN DI SINI:
    // 1. hover:bg-indigo-50 (Background berubah jadi ungu muda saat hover)
    // 2. Hapus hover border samping atau text color yang aneh-aneh
    <div className={`bg-white rounded-[2rem] border border-slate-100 transition-all duration-300 group ${
      isOpen 
        ? 'shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-50 bg-slate-50/50' 
        : 'shadow-sm hover:shadow-lg hover:border-indigo-100 hover:bg-indigo-50' 
    }`}>
      
      {/* HEADER CARD */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex-1 pl-2">
          <div className="flex items-center gap-3 mb-2">
            {/* Badge Category: bg putih saat hover card agar kontras */}
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors group-hover:bg-white group-hover:text-indigo-600">
              {module.category || "Course"}
            </span>
            {module.progress === 100 && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full group-hover:bg-white">
                <CheckCircle2 size={12} /> Selesai
              </span>
            )}
          </div>
          
          {/* Title: Tidak berubah warna text saat hover, biar clean */}
          <h3 className="text-xl font-bold text-slate-800">
            {module.title}
          </h3>
        </div>

        {/* Progress & Toggle */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="flex-1 md:w-48">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-400">Progress</span>
              <span className="text-indigo-600">{module.progress}%</span>
            </div>
            {/* Track bg jadi putih saat hover card agar bar terlihat jelas */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 transition-colors group-hover:bg-white">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${getGradient(module.progress)} transition-all duration-1000`} 
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
          </div>

          <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isOpen 
              ? "bg-indigo-100 text-indigo-600 rotate-180" 
              : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-indigo-500"
          }`}>
            <ChevronDown size={20} />
          </button>
        </div>
      </div>

      {/* EXPANDABLE CONTENT */}
      <div 
        className={`border-t border-slate-200/50 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "max-h-[500px] opacity-100 bg-white/50" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 pl-8">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Award size={14} /> Riwayat Nilai
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {module.assessments.map((a, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-indigo-200 transition-colors shadow-sm">
                <div>
                  <p className="text-sm font-bold text-slate-700">{a.name}</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Quiz / Tes</p>
                </div>
                <div className={`flex items-center gap-1 font-bold text-lg ${
                  a.score >= 85 ? "text-emerald-600" : a.score >= 70 ? "text-indigo-600" : "text-slate-300"
                }`}>
                  {a.score !== null ? (
                    <>
                      {a.score >= 85 && <Star size={14} fill="currentColor" className="text-yellow-400" />}
                      {a.score}
                    </>
                  ) : "-"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}