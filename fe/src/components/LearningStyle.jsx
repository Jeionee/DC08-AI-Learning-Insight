import React, { useState } from "react";
import { 
  GraduationCap, 
  Zap, 
  BookOpen, 
  Clock, 
  Coffee, 
  Info, 
  X,
  Lightbulb
} from "lucide-react"; 

// 1. DATA CONFIGURATION
// Kita memisahkan data teks dan warna agar kode komponen tetap bersih.
const STYLE_CONFIG = {
  "Fast Learner": {
    color: "purple",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    icon: <Zap size={24} className="text-purple-600" />,
    shortDesc: "Kamu menyerap informasi baru dengan sangat cepat.",
    longDesc: "Tipe Fast Learner memiliki kemampuan kognitif untuk memproses materi baru dalam waktu singkat. Kamu suka tantangan dan materi yang padat.",
    tips: [
      "Gunakan teknik skimming untuk gambaran besar.",
      "Cari materi tingkat lanjut agar tidak bosan.",
      "Lakukan latihan soal (drilling) untuk menguji kecepatan."
    ]
  },
  "Reflective Learner": {
    color: "indigo",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    icon: <BookOpen size={24} className="text-indigo-600" />,
    shortDesc: "Kamu suka menganalisis dan memikirkan materi secara mendalam.",
    longDesc: "Reflective Learner butuh waktu untuk mencerna informasi. Kamu tidak sekadar menghafal, tapi menghubungkan konsep baru dengan pengetahuan yang sudah ada.",
    tips: [
      "Luangkan waktu jeda setelah membaca satu bab.",
      "Buat rangkuman dengan kata-katamu sendiri.",
      "Diskusikan materi dengan teman atau mentor."
    ]
  },
  "Consistent Learner": {
    color: "green",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: <Clock size={24} className="text-green-600" />,
    shortDesc: "Disiplin adalah kuncimu. Kamu belajar sedikit demi sedikit tapi rutin.",
    longDesc: "Kekuatanmu ada pada rutinitas. Kamu mungkin tidak belajar 5 jam sekaligus, tapi kamu pasti belajar setiap hari tanpa putus.",
    tips: [
      "Pertahankan jadwal belajar harianmu.",
      "Gunakan teknik Pomodoro agar tidak burnout.",
      "Set target mingguan yang realistis."
    ]
  },
  // Default fallback
  "default": {
    color: "gray",
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
    icon: <Coffee size={24} className="text-gray-600" />,
    shortDesc: "Kamu belajar dengan santai sesuai kebutuhan.",
    longDesc: "Casual Learner fleksibel dan belajar ketika merasa perlu atau tertarik. Tidak terikat aturan ketat.",
    tips: [
      "Cari topik yang benar-benar kamu minati.",
      "Belajar lewat video interaktif atau game.",
      "Jangan memaksakan diri jika sedang tidak mood."
    ]
  }
};

export default function LearningStyle({ learning_style }) {
  const [showModal, setShowModal] = useState(false);

  // Normalisasi input agar cocok dengan key di object config (misal handle null)
  const styleKey = learning_style || "Casual Learner"; 
  // Ambil config berdasarkan key, jika tidak ada pakai default
  const config = STYLE_CONFIG[styleKey] || STYLE_CONFIG["default"];

  return (
    <>
      {/* --- MAIN CARD COMPONENT --- */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-full flex flex-col transition-all hover:shadow-md">
        
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center border ${config.border}`}>
              {config.icon}
            </div>
            <div>
              <h2 className="text-gray-800 font-bold text-xl">Learning Style</h2>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Analisis Gaya Belajar</p>
            </div>
          </div>
          
          {/* Info Button (Interactive) */}
          <button 
            onClick={() => setShowModal(true)}
            className="text-gray-400 hover:text-blue-600 transition-colors p-1"
            title="Lihat Detail"
          >
            <Info size={20} />
          </button>
        </div>

        {/* Dynamic Highlight Box */}
        <div className={`flex-1 rounded-xl p-5 ${config.bg} border ${config.border} relative overflow-hidden group`}>
          {/* Decorative Background Element */}
          <div className="absolute -right-4 -top-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
             {config.icon} {/* Menggunakan ikon besar transparan sebagai background */}
          </div>

          <div className="relative z-10">
            <h3 className={`${config.text} font-bold text-xl mb-2 flex items-center gap-2`}>
              {styleKey}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {config.shortDesc}
            </p>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className={`mt-4 text-xs font-bold ${config.text} hover:underline flex items-center gap-1`}
          >
            Pelajari Strateginya &rarr;
          </button>
        </div>
      </div>

      {/* --- INTERACTIVE MODAL (POP UP) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop (Click to close) */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className={`p-6 rounded-t-2xl ${config.bg} border-b ${config.border} flex justify-between items-start`}>
              <div className="flex gap-3">
                <div className={`p-2 bg-white rounded-lg shadow-sm text-${config.color}-600`}>
                  {config.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${config.text}`}>{styleKey}</h3>
                  <p className="text-gray-500 text-xs">Detail Analisis</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Tentang Gayamu</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {config.longDesc}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Lightbulb size={18} className="text-yellow-500" />
                  Rekomendasi Strategi
                </h4>
                <ul className="space-y-3">
                  {config.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className={`font-bold ${config.text} bg-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm border border-gray-100 flex-shrink-0`}>
                        {index + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}