import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { BookOpen, Layers, Zap, Search, LayoutGrid, ListFilter } from "lucide-react";

// --- DATA DUMMY ---
// Menggabungkan data modul awal dan tambahan menjadi satu sumber data
const ALL_MODULES_DATA = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    description: "Pelajari dasar-dasar HTML dan CSS untuk membuat website sederhana.",
    category: "Frontend",
    progress: 85,
  },
  {
    id: 2,
    title: "JavaScript Basics",
    description: "Pelajari sintaks dasar, fungsi, dan manipulasi DOM di JavaScript.",
    category: "Logic",
    progress: 70,
  },
  {
    id: 3,
    title: "Responsive Web Design",
    description: "Belajar membuat tampilan website yang responsive untuk semua device.",
    category: "Design",
    progress: 45,
  },
  {
    id: 4,
    title: "React Basics",
    description: "Pelajari dasar-dasar React dan membuat komponen interaktif.",
    category: "Frontend",
    progress: 60,
  },
  {
    id: 5,
    title: "Backend Fundamental",
    description: "Pelajari dasar backend dengan Node.js dan pembuatan server sederhana.",
    category: "Backend",
    progress: 0,
  },
  {
    id: 6,
    title: "Version Control with Git",
    description: "Pelajari Git dan GitHub untuk manajemen versi proyek secara efisien.",
    category: "Tools",
    progress: 0,
  },
];

export default function ModulePage() {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [showAll, setShowAll] = useState(false); // State untuk toggle tampil semua
  const [searchTerm, setSearchTerm] = useState(""); // State untuk search
  const [filteredModules, setFilteredModules] = useState([]); // Data yang ditampilkan

  // --- LOGIC ---
  useEffect(() => {
    // 1. Filter berdasarkan Search Term
    let results = ALL_MODULES_DATA.filter((module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Jika tidak showAll dan tidak sedang search, potong jadi 3 modul saja
    if (!showAll && searchTerm === "") {
      results = results.slice(0, 3);
    }

    setFilteredModules(results);
  }, [showAll, searchTerm]); // Jalankan ulang saat showAll atau searchTerm berubah

  // Helper Gradient
  const getProgressGradient = (percent) => {
    if (percent === 0) return "bg-slate-200";
    if (percent < 40) return "from-orange-400 to-red-500";
    if (percent < 70) return "from-blue-400 to-indigo-500";
    return "from-emerald-400 to-emerald-600";
  };

  const handleViewModule = (id) => {
    navigate(`/module/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden relative">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl -z-10 -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl -z-10 translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-fit">
                <Layers size={12} /> Library
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
              Katalog Modul
            </h1>
            <p className="text-slate-500 text-lg mt-2 leading-relaxed">
              Temukan materi terbaik untuk meningkatkan skill codingmu.
            </p>
          </div>

          {/* Search Bar (Kanan Atas) */}
          <div className="relative group w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Cari modul..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* --- TOOLBAR (Opsional, untuk filter tambahan nanti) --- */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <LayoutGrid size={18} />
            <span>Menampilkan {filteredModules.length} modul</span>
          </div>
          
          {/* Tombol Toggle View All (Hanya muncul jika tidak sedang search) */}
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
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredModules.map((module) => (
              <div
                key={module.id}
                className="group relative bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative Background Icon */}
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-slate-50 rounded-full opacity-50 group-hover:bg-indigo-50 transition-colors"></div>
                <BookOpen className="absolute -right-2 -top-2 w-24 h-24 text-slate-100 group-hover:text-indigo-100 transition-colors rotate-12" />

                <div className="relative z-10">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                    {module.category || "Course"}
                  </span>

                  {/* Judul & Deskripsi */}
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-700 transition-colors line-clamp-2">
                    {module.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {module.description}
                  </p>
                </div>

                {/* Footer: Progress & Button */}
                <div className="relative z-10 mt-auto">
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400 group-hover:text-slate-500 transition-colors">
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

                  {/* Action Button */}
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
        ) : (
          // --- EMPTY STATE ---
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="text-slate-400 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">Modul Tidak Ditemukan</h3>
            <p className="text-slate-500 mt-2">
              Coba cari dengan kata kunci lain.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}