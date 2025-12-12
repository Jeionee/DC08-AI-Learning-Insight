import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Layers, Zap, Search, LayoutGrid, ChevronLeft } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

// --- DATA DUMMY ---
const ALL_MODULES_DATA = [
  { id: 1, title: "HTML & CSS Fundamentals", description: "Pelajari dasar-dasar HTML dan CSS.", category: "Frontend", progress: 85 },
  { id: 2, title: "JavaScript Basics", description: "Pelajari sintaks dasar JavaScript.", category: "Logic", progress: 70 },
  { id: 3, title: "Responsive Web Design", description: "Belajar membuat website responsive.", category: "Design", progress: 45 },
  { id: 4, title: "React Basics", description: "Pelajari dasar React.", category: "Frontend", progress: 60 },
  { id: 5, title: "Backend Fundamental", description: "Pelajari dasar backend dengan Node.js.", category: "Backend", progress: 0 },
  { id: 6, title: "Version Control with Git", description: "Pelajari Git dan GitHub.", category: "Tools", progress: 0 },
];

export default function ModulePage() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredModules, setFilteredModules] = useState([]);

  useEffect(() => {
    let results = ALL_MODULES_DATA.filter((module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!showAll && searchTerm === "") results = results.slice(0, 3);
    setFilteredModules(results);
  }, [showAll, searchTerm]);

  const getProgressGradient = (percent) => {
    if (percent === 0) return "bg-slate-200";
    if (percent < 40) return "from-orange-400 to-red-500";
    if (percent < 70) return "from-blue-400 to-indigo-500";
    return "from-emerald-400 to-emerald-600";
  };

  const handleViewModule = (id) => navigate(`/module/${id}`);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden relative">

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto px-10 lg:px-12 pt-28 pb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Layers size={20} className="text-indigo-500" /> Module
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow hover:bg-indigo-700 transition"
        >
          Kembali ke Dashboard
        </button>
      </div>

      {/* --- SEARCH & TOGGLE --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-400 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari modul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md"
          />
        </div>
        {searchTerm === "" && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-2 px-5 py-2 bg-white text-slate-600 font-bold text-sm rounded-xl shadow-sm border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-300"
          >
            <span>{showAll ? "Tampilkan Sedikit" : "Lihat Semua Modul"}</span>
            <FaArrowRight className={`w-3 h-3 transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-x-1"}`} />
          </button>
        )}
      </div>

      {/* --- MODULE GRID --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="group relative bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute -right-2 -top-2 w-24 h-24 text-slate-100 group-hover:text-indigo-100 transition-colors rotate-12">
              <BookOpen className="w-full h-full" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                {module.category || "Course"}
              </span>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors line-clamp-2">
                {module.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {module.description}
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className={module.progress > 0 ? "text-slate-400" : "text-slate-300"}>
                    {module.progress > 0 ? "Progress" : "Belum Dimulai"}
                  </span>
                  <span className={module.progress > 0 ? "text-indigo-600" : "text-slate-300"}>
                    {module.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 group-hover:bg-white transition-colors">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getProgressGradient(module.progress)} transition-all duration-1000 shadow-sm`}
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => handleViewModule(module.id)}
                className="w-full py-3.5 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-indigo-200"
              >
                <Zap size={16} className={module.progress > 0 ? "fill-current" : ""} />
                {module.progress > 0 ? "Lanjutkan Belajar" : "Mulai Belajar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
