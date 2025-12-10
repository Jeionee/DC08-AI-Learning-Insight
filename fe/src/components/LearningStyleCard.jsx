import React, { useState } from "react";
import { Zap, BookOpen, Clock, Coffee, Sparkles, ChevronDown, Lightbulb, CheckCircle2 } from "lucide-react";

// 1. DATA CONFIGURATION
const STYLE_CONFIG = {
  "Fast Learner": {
    gradient: "from-blue-600 to-indigo-600",
    icon: Zap,
    label: "Fast Learner",
    shortDesc: "Kamu memproses informasi dengan cepat! Tantang dirimu dengan materi padat.",
    longDesc: "Tipe Fast Learner memiliki kemampuan kognitif untuk memproses materi baru dalam waktu singkat. Kamu menyukai tantangan, namun hati-hati agar tidak melewatkan detail kecil.",
    tips: [
      "Gunakan teknik skimming untuk gambaran besar.",
      "Cari materi tingkat lanjut agar tidak bosan.",
      "Lakukan latihan soal (drilling) untuk menguji kecepatan."
    ]
  },
  "Reflective Learner": {
    gradient: "from-indigo-500 to-violet-600",
    icon: BookOpen,
    label: "Reflective Learner",
    shortDesc: "Kamu butuh waktu merenung. Pemahamanmu sangat mendalam.",
    longDesc: "Reflective Learner butuh waktu untuk mencerna informasi. Kamu tidak sekadar menghafal, tapi menghubungkan konsep baru dengan pengetahuan yang sudah ada.",
    tips: [
      "Luangkan waktu jeda setelah membaca satu bab.",
      "Buat rangkuman dengan kata-katamu sendiri.",
      "Diskusikan materi dengan teman atau mentor."
    ]
  },
  "Consistent Learner": {
    gradient: "from-blue-500 to-cyan-500",
    icon: Clock,
    label: "Consistent Learner",
    shortDesc: "Disiplin adalah kuncimu. Sedikit demi sedikit tapi rutin.",
    longDesc: "Kekuatanmu ada pada rutinitas. Kamu mungkin tidak belajar 5 jam sekaligus, tapi kamu pasti belajar setiap hari tanpa putus.",
    tips: [
      "Pertahankan jadwal belajar harianmu.",
      "Gunakan teknik Pomodoro agar tidak burnout.",
      "Set target mingguan yang realistis."
    ]
  },
  "Casual Learner": {
    gradient: "from-violet-400 to-fuchsia-500",
    icon: Coffee,
    label: "Casual Learner",
    shortDesc: "Belajar fleksibel sesuai mood adalah gaya terbaikmu.",
    longDesc: "Casual Learner fleksibel dan belajar ketika merasa perlu atau tertarik. Tidak terikat aturan ketat, namun tetap membutuhkan pemicu semangat.",
    tips: [
      "Cari topik yang benar-benar kamu minati.",
      "Belajar lewat video interaktif atau game.",
      "Jangan memaksakan diri jika sedang tidak mood."
    ]
  },
  "default": {
    gradient: "from-slate-400 to-slate-600",
    icon: Sparkles,
    label: "Unknown Style",
    shortDesc: "Kami sedang menganalisis gaya belajarmu.",
    longDesc: "Teruslah belajar agar kami bisa memberikan rekomendasi yang lebih akurat.",
    tips: ["Cobalah berbagai metode belajar.", "Konsisten login setiap hari."]
  }
};

export default function LearningStyleCard({ learningStyle }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Normalisasi input
  const styleKey = learningStyle || "default";
  const config = STYLE_CONFIG[styleKey] || STYLE_CONFIG["default"];
  const Icon = config.icon;

  return (
    <div 
      className={`relative rounded-[2rem] shadow-xl transition-all duration-500 ease-in-out overflow-hidden bg-gradient-to-br ${config.gradient}`}
    >
      {/* --- BACKGROUND ORNAMENTS --- */}
      <div className="absolute -right-4 -top-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
      <Icon 
        className={`absolute -bottom-6 -right-6 w-40 h-40 text-white opacity-10 transition-transform duration-700 pointer-events-none ${isExpanded ? 'rotate-12 scale-110' : '-rotate-12'}`} 
      />

      {/* --- MAIN CONTENT (HEADER - REDESIGNED) --- */}
      <div className="relative z-10 p-7 text-white">
        
        {/* Header Section: Icon & Badge */}
        <div className="flex items-center justify-between mb-6">
          {/* Main Icon with Glassmorphism Effect */}
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner flex items-center justify-center">
            <Icon size={32} className="text-white drop-shadow-sm" />
          </div>
          
          {/* Small Badge */}
          <div className="bg-black/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/90">
              AI Analysis
            </span>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-1">
          <h3 className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Sparkles size={12} className="text-yellow-300" />
            Gaya Belajarmu
          </h3>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight drop-shadow-md">
            {config.label}
          </h2>
        </div>
        
        {/* Short Description (Hidden when expanded) */}
        <div className={`mt-3 transition-all duration-500 ease-out overflow-hidden ${isExpanded ? 'opacity-0 max-h-0' : 'opacity-100 max-h-20'}`}>
          <p className="text-sm text-white/90 leading-relaxed font-medium border-l-2 border-white/30 pl-3">
            {config.shortDesc}
          </p>
        </div>

        {/* TOGGLE BUTTON */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full mt-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg group active:scale-95
            ${isExpanded 
              ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md' 
              : 'bg-white text-indigo-900 hover:bg-indigo-50 hover:shadow-indigo-900/20'
            }`}
        >
          <span>{isExpanded ? "Tutup Detail" : "Lihat Strategi"}</span>
          <ChevronDown 
            size={18} 
            className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* --- EXPANDABLE CONTENT (DETAIL) --- */}
      <div 
        className={`bg-white text-slate-700 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-7 pt-2">
          {/* Karakteristik Section */}
          <div className="mb-6">
            <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">
              <Sparkles size={16} className="text-indigo-500" />
              Karakteristik
            </h4>
            <p className="text-sm text-slate-600 leading-7 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {config.longDesc}
            </p>
          </div>

          {/* Tips Section */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">
              <Lightbulb size={16} className="text-yellow-500" />
              Rekomendasi Strategi
            </h4>
            <ul className="space-y-3">
              {config.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <CheckCircle2 size={12} className="text-indigo-600" />
                  </div>
                  <span className="text-sm text-slate-600 font-medium leading-snug group-hover:text-slate-800 transition-colors">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}