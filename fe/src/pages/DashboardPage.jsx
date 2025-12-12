import React, { useEffect, useState, useContext, useRef } from "react";
import {
  getDailyProgress,
  getStudent,
  getWeeklyActivity,
  getAiRecommendations, 
} from "../api/studentApi";
import { AppContext } from "../contexts/contexts";
import {
  TrendingUp,
  Clock,
  BookOpen,
  Brain,       
  Zap,         
  Target,      
  Loader2,     
  Lightbulb
} from "lucide-react";

/* Components Import */
import Charts from "../components/Charts";
import LearningStyleCard from "../components/LearningStyleCard";
import ContinueLearning from "../components/ContinueLearning";

const Dashboard = ({ data }) => {
  const { student, setStudent } = useContext(AppContext);
  
  // --- STATE ---
  const [dailyProgress, setDailyProgress] = useState({
    percentage: 0,
    time_spent_hours: 0,
    target_hours: 0,
  });
  const [weeklyProgress, setWeeklyProgress] = useState(null);
  
  // State untuk AI Recommendation
  const [aiData, setAiData] = useState(null);
  const [loadingAi, setLoadingAi] = useState(true);

  // --- REF UNTUK MENCEGAH DOUBLE REQUEST (Strict Mode Fix) ---
  const hasFetchedAi = useRef(false); 

  // --- FETCH DATA ---
  
  // 1. Fetch Student Profile
  useEffect(() => {
    async function fetchStudent() {
      try {
        const s = await getStudent();
        setStudent({
          name: s.name,
          email: s.email,
          learning_style: s.learning_style,
          joined_since: s.joined_since,
          photo_profile: s.photo_profile,
        });
      } catch (error) {
        console.error("Failed to fetch student", error);
      }
    }
    fetchStudent();
  }, [setStudent]);

  // 2. Fetch Weekly Progress
  useEffect(() => {
    async function fetchWeekly() {
      try {
        const data = await getWeeklyActivity();
        setWeeklyProgress(data);
      } catch (error) {
        console.error("Failed to fetch weekly progress:", error);
      }
    }
    fetchWeekly();
  }, []);

// 3. Fetch AI Recommendations (COOLDOWN SYSTEM)
  useEffect(() => {
    // Cek apakah user valid
    if (!student.name) return;

    async function fetchAi() {
      const now = Date.now();
      
      // 1. AMBIL DATA DARI STORAGE
      const cachedData = localStorage.getItem('ai_recommendations');
      const lastAttempt = localStorage.getItem('ai_last_attempt'); // Key baru untuk mencatat WAKTU PERCOBAAN

      // 2. CEK COOLDOWN (Wajib Jeda 1 Menit antar Request)
      // Jika baru mencoba < 60 detik yang lalu, STOP. Jangan panggil API.
      if (lastAttempt && (now - parseInt(lastAttempt) < 60000)) {
        console.log("⏳ AI Cooldown: Menunggu jeda aman...");
        if (cachedData) setAiData(JSON.parse(cachedData)); // Pakai data lama jika ada
        setLoadingAi(false);
        return; 
      }

      // 3. CEK CACHE DATA (Valid 1 Jam)
      // Jika data ada dan bagus, pakai saja.
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const dataAge = now - (parseInt(lastAttempt) || 0);
        
        // Jika data valid (< 1 jam) DAN bukan pesan error
        if (dataAge < 3600000 && !parsedData.diagnosis_summary.includes("sibuk")) {
            setAiData(parsedData);
            setLoadingAi(false);
            return;
        }
      }

      // 4. PANGGIL API (Hanya jika lolos saringan di atas)
      try {
        // Catat waktu percobaan SEKARANG (sebelum fetch) untuk mengunci request lain
        localStorage.setItem('ai_last_attempt', now.toString()); 
        
        const data = await getAiRecommendations();
        setAiData(data);
        
        // Simpan data jika sukses (bukan fallback)
        if (data.diagnosis_summary && !data.diagnosis_summary.includes("sibuk")) {
            localStorage.setItem('ai_recommendations', JSON.stringify(data));
        }
      } catch (error) {
        console.error("AI Fetch Error:", error);
      } finally {
        setLoadingAi(false);
      }
    }
    
    fetchAi();
    
  }, [student.name]);

  // 4. Process Daily Progress from Props
  useEffect(() => {
    if (data && data.progress) {
      setDailyProgress({
        percentage:
          (data.progress.timeSpentToday / data.progress.dailyGoal) * 100,
        target_hours: data.progress.dailyGoal,
        time_spent_hours: data.progress.timeSpentToday,
      });
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
      
      {/* ================= 1. HERO HEADER SECTION ================= */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 pb-24 pt-24 px-6 lg:px-12 shadow-lg relative z-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 leading-tight">
                Selamat Datang, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                  {student.name?.split(" ")[0]}!
                </span>{" "}
                👋
              </h1>
              <p className="text-indigo-200 text-base max-w-lg">
                Siap melanjutkan progres belajarmu? Mari kita selesaikan target
                hari ini dengan semangat!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN (2/3 Width) --- */}
          <div className="xl:col-span-2 flex flex-col gap-8">
            
            {/* 1. Continue Learning Widget */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-1">
              <ContinueLearning />
            </div>

            {/* 2. AI MENTOR WIDGET */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Rekomendasi AI
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Berdasarkan aktivitas belajarmu hari ini.
                    </p>
                  </div>
                </div>
                {/* Badge Label User */}
                {student.learning_style && (
                  <span className="hidden sm:inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100">
                    {student.learning_style}
                  </span>
                )}
              </div>

              {loadingAi ? (
                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                  <Loader2 className="animate-spin mb-2" size={32} />
                  <p className="text-sm">Sedang menganalisis datamu...</p>
                </div>
              ) : aiData ? (
                <div className="space-y-6">
                  
                  {/* A. Diagnosis Card */}
                  {aiData.diagnosis_summary && (
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
                        <div className="relative z-10">
                        <h4 className="font-bold text-indigo-200 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider">
                            <Lightbulb size={14} /> Diagnosis Hari Ini
                        </h4>
                        <p className="text-lg font-medium leading-relaxed opacity-95">
                            "{aiData.diagnosis_summary}"
                        </p>
                        </div>
                    </div>
                  )}

                  {/* B. Strategy Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiData.recommendations?.map((rec, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-indigo-200 hover:bg-white transition-all duration-300 group"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                            idx === 0 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {rec.type}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            ~{rec.estimated_min} min
                          </span>
                        </div>
                        
                        <h4 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-700 transition-colors">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-slate-500 italic mb-4 border-l-2 border-indigo-100 pl-2">
                          "{rec.trigger_reason}"
                        </p>
                        
                        <ul className="space-y-2">
                          {rec.action_items?.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-slate-600">
                              <div className={`mt-1.5 min-w-[6px] h-1.5 rounded-full ${
                                idx === 0 ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}></div>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <p>Belum ada data aktivitas untuk dianalisis.</p>
                </div>
              )}
            </div>

            {/* 3. Charts Section */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <TrendingUp size={20} />
                    </div>
                    Analisis Aktivitas
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 ml-11">
                    Statistik performa belajar mingguanmu.
                  </p>
                </div>
              </div>
              <div className="min-h-[350px]">
                <Charts weekly={weeklyProgress} />
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (1/3 Width) --- */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-5 shadow-lg shadow-indigo-100/50 border border-slate-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="mb-3 p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Clock size={24} />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Time Spent
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-800">
                    {Math.floor(dailyProgress.time_spent_hours / 60)}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    Jam
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-lg shadow-indigo-100/50 border border-slate-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="mb-3 p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <BookOpen size={24} />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                  Modules
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-800">
                    12
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    Done
                  </span>
                </div>
              </div>
            </div>

            {/* Learning Style Card */}
            <div className="relative">
              <div className="bg-white rounded-[2.5rem] p-1 shadow-xl shadow-indigo-100/50">
                <LearningStyleCard learningStyle={student.learning_style} />
              </div>

              <div className="mt-8 px-6 text-center">
                <p className="text-slate-400 text-sm italic">
                  "Pendidikan adalah senjata paling ampuh untuk mengubah dunia."
                </p>
                <p className="text-slate-500 text-xs font-bold mt-2">
                  - Nelson Mandela
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;