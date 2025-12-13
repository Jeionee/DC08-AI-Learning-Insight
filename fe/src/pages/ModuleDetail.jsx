import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/contexts"; // Import Context
import { getStudent } from "../api/studentApi"; // Import API untuk jaga-jaga refresh
import {
  ArrowLeft,
  BookOpen,
  FileText,
  PlayCircle,
  Trophy,
  CheckCircle,
  Lock,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  Award,
  Star,
  Download,
  Share2,
  Calendar,
  Hash,
  Home,
} from "lucide-react";

// --- DUMMY DATA ---
const dummyModules = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    category: "Frontend",
    description:
      "Pelajari dasar-dasar HTML dan CSS untuk membuat website sederhana.",
    lessons: [
      {
        id: 1,
        title: "Pengenalan HTML",
        type: "video",
        duration: "10 min",
        completed: true,
        content: { type: "video" },
      },
      {
        id: 2,
        title: "Struktur Dasar HTML",
        type: "article",
        duration: "15 min",
        completed: true,
        content: {
          type: "article",
          body: `
            <h2 class="text-2xl font-bold mb-4 text-slate-800">Apa itu HTML?</h2>
            <p class="mb-4 text-slate-600">HTML (HyperText Markup Language) adalah tulang punggung dari setiap halaman web...</p>
            <div class="bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500 my-6">
              <p class="font-bold text-indigo-900">Tips Pro:</p>
              <p class="text-indigo-700">Selalu gunakan semantic tag untuk SEO yang lebih baik.</p>
            </div>
          `,
        },
      },
      {
        id: 3,
        title: "Quiz 1: HTML Basics",
        type: "quiz",
        duration: "10 soal",
        completed: false,
        content: { type: "quiz" },
      },
      {
        id: 4,
        title: "Final Project: Personal Website",
        type: "project",
        duration: "2 jam",
        completed: false,
        content: { type: "project" },
      },
    ],
  },
  // ... modul lain
];

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  // 1. AMBIL DATA USER DARI CONTEXT
  const { student, setStudent } = useContext(AppContext);

  // State Halaman
  const [view, setView] = useState("learning"); // 'learning' | 'submission' | 'certificate'
  const [activeLessonId, setActiveLessonId] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectLink, setProjectLink] = useState("");

  // Pastikan data student ada (misal user refresh halaman)
  useEffect(() => {
    if (!student.name) {
      async function fetchData() {
        try {
          const s = await getStudent();
          setStudent(s);
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }
  }, [student, setStudent]);

  const module = dummyModules.find((m) => m.id === parseInt(moduleId));
  if (!module)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        Modul tidak ditemukan.
      </div>
    );

  const activeLesson =
    module.lessons.find((l) => l.id === activeLessonId) || module.lessons[0];
  const currentIndex = module.lessons.findIndex((l) => l.id === activeLessonId);
  const isLastLesson = currentIndex === module.lessons.length - 1;

  // --- HANDLERS ---
  const handleNext = () => {
    if (isLastLesson) {
      if (activeLesson.type === "project") {
        setView("submission");
      } else {
        setView("certificate");
      }
    } else {
      setActiveLessonId(module.lessons[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveLessonId(module.lessons[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setView("certificate");
    }, 1500);
  };

  // --- VIEW 1: LEARNING MODE ---
  if (view === "learning") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900 relative flex flex-col md:flex-row">
        {/* === LEFT SIDEBAR === */}
        <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 h-screen overflow-y-auto sticky top-0 z-20 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-10 border-b border-slate-100 bg-slate-50/50">
            {/* TOMBOL KEMBALI KE MODUL */}
            <button
              onClick={() => navigate("/module")}
              className="group flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors font-bold"
            >
              <div className="p-1.5 bg-white border border-slate-200 rounded-lg mr-2 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all">
                <ArrowLeft size={16} />
              </div>
              Kembali ke Daftar Modul
            </button>

            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
              {module.category || "Course"}
            </span>
            <h2 className="font-extrabold text-xl text-slate-800 leading-snug">
              {module.title}
            </h2>
          </div>

          <div className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            {module.lessons.map((lesson, idx) => {
              const isActive = activeLessonId === lesson.id;
              // Logic lock sederhana (hanya demo)
              const isLocked =
                !lesson.completed &&
                idx > 0 &&
                !module.lessons[idx - 1].completed;

              return (
                <div
                  key={lesson.id}
                  onClick={() => !isLocked && setActiveLessonId(lesson.id)}
                  className={`group flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 border-indigo-600"
                      : isLocked
                      ? "opacity-50 cursor-not-allowed bg-slate-50 border-transparent"
                      : "bg-white border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-600"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : lesson.completed
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle size={16} />
                    ) : isLocked ? (
                      <Lock size={14} />
                    ) : isActive ? (
                      <PlayCircle size={16} fill="currentColor" />
                    ) : (
                      <BookOpen size={14} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isActive ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <div
                      className={`flex items-center gap-2 text-[10px] mt-0.5 ${
                        isActive ? "text-indigo-200" : "text-slate-400"
                      }`}
                    >
                      <span className="uppercase tracking-wider">
                        {lesson.type}
                      </span>
                      <span>•</span>
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* === RIGHT CONTENT === */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#F8FAFC]">
          {/* Content Header */}
          <header className="h-20 border-b border-slate-200 flex items-center justify-between p-4 px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <h3 className="font-bold text-slate-800 truncate mr-4 text-lg">
              {activeLesson.title}
            </h3>
            <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl whitespace-nowrap border border-indigo-100">
              Materi {currentIndex + 1} / {module.lessons.length}
            </div>
          </header>

          {/* Content Body */}
          <div className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[600px] flex flex-col relative overflow-hidden">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/4"></div>

              <div className="flex-1">
                {activeLesson.type === "video" ? (
                  <div className="w-full aspect-video bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-2xl relative overflow-hidden group cursor-pointer ring-8 ring-slate-50">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                    <PlayCircle
                      size={80}
                      className="relative z-10 opacity-90 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                    />
                    <p className="absolute bottom-8 left-8 text-white font-bold z-10 text-lg">
                      Putar Video Pembelajaran
                    </p>
                  </div>
                ) : activeLesson.type === "article" ? (
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: activeLesson.content.body,
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/30">
                    <div className="p-6 bg-white rounded-3xl shadow-sm mb-6 text-amber-500 ring-4 ring-amber-50">
                      {activeLesson.type === "project" ? (
                        <UploadCloud size={48} />
                      ) : (
                        <Trophy size={48} />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      {activeLesson.type === "project"
                        ? "Final Project"
                        : "Quiz Time!"}
                    </h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
                      {activeLesson.type === "project"
                        ? "Waktunya menerapkan semua yang telah kamu pelajari. Buat proyek nyata dan kumpulkan di sini."
                        : "Uji pemahamanmu tentang materi sebelumnya dengan kuis interaktif ini."}
                    </p>
                    <button
                      onClick={handleNext}
                      className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 hover:-translate-y-1"
                    >
                      {activeLesson.type === "project"
                        ? "Mulai Submit Project"
                        : "Mulai Quiz"}
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              {activeLesson.type !== "project" &&
                activeLesson.type !== "quiz" && (
                  <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                    <button
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <ChevronLeft size={20} /> Sebelumnya
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all"
                    >
                      {isLastLesson ? "Selesaikan Modul" : "Materi Selanjutnya"}{" "}
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- VIEW 2: SUBMISSION MODE ---
  if (view === "submission") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/4"></div>

        <div className="bg-white max-w-xl w-full rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 lg:p-12 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

          <button
            onClick={() => setView("learning")}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 text-indigo-600 mx-auto shadow-sm border border-indigo-100">
            <UploadCloud size={40} />
          </div>

          <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-3 leading-tight">
            Submit Final Project
          </h2>
          <p className="text-center text-slate-500 mb-10 text-lg leading-relaxed">
            Selamat! Kamu telah menyelesaikan semua materi. Kirimkan link
            proyekmu untuk direview.
          </p>

          <form onSubmit={handleSubmitProject} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Link Repository / Deployment
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  required
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition font-medium text-slate-700 placeholder-slate-400"
                />
                <UploadCloud
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !projectLink}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-200 transition disabled:opacity-70 disabled:shadow-none flex justify-center items-center gap-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    Processing...{" "}
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </>
                ) : (
                  "Kirim Proyek Saya"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW 3: CERTIFICATE MODE ---
  if (view === "certificate") {
    const today = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const certId =
      "CERT-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Confetti & Bg Decor */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/4"></div>

        <div className="max-w-4xl w-full text-center relative z-10">
          <div className="inline-block p-5 rounded-full bg-emerald-50 text-emerald-500 mb-8 shadow-sm border border-emerald-100 animate-bounce">
            <Award size={64} />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight leading-tight">
            Selamat! Kamu Lulus! 🎉
          </h1>
          <p className="text-slate-500 mb-12 text-xl leading-relaxed max-w-2xl mx-auto">
            Kamu berhasil menyelesaikan modul <strong>{module.title}</strong>.
            Berikut adalah sertifikat pencapaianmu.
          </p>

          {/* --- CERTIFICATE CARD DESIGN --- */}
          <div className="bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-700 p-1.5 rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 mb-12 transform hover:scale-[1.01] transition-transform duration-500">
            <div className="bg-white rounded-[2rem] p-10 md:p-16 border-[6px] border-double border-slate-50 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
              <Award className="absolute -right-10 -bottom-10 w-80 h-80 text-indigo-50 opacity-50 rotate-12 pointer-events-none" />

              <div className="flex justify-center mb-8 relative">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className="fill-amber-400 text-amber-400 drop-shadow-sm"
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-3 tracking-wide">
                SERTIFIKAT KELULUSAN
              </h2>
              <p className="text-slate-500 font-medium mb-10 uppercase tracking-widest text-sm">
                Diberikan Dengan Bangga Kepada
              </p>

              {/* NAMA USER DARI DATABASE (CONTEXT) */}
              <h3 className="text-4xl md:text-6xl font-extrabold text-indigo-700 mb-8 font-serif relative inline-block">
                {student.name || "Nama Siswa"}
                <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-indigo-200/50 rounded-full"></span>
              </h3>

              <p className="text-slate-600 text-lg mb-2 font-medium leading-relaxed">
                Telah sukses menyelesaikan semua materi dan proyek pada modul
                pembelajaran:
              </p>
              <h4 className="text-2xl font-bold text-slate-800 mb-12">
                {module.title}
              </h4>

              <div className="flex flex-col md:flex-row justify-between items-end border-t-2 border-slate-100 pt-8 mt-auto gap-6 md:gap-0">
                <div className="text-left">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1">
                    <Calendar size={16} className="text-indigo-400" /> Tanggal
                    Lulus
                  </div>
                  <p className="text-slate-800 font-bold text-lg">{today}</p>
                </div>

                <div className="hidden md:block text-center opacity-80">
                  <div className="w-40 border-b-2 border-slate-300 mb-2 mx-auto h-8"></div>
                  <p className="text-slate-500 text-sm font-bold">
                    LeanSmart Academy
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-1 justify-start md:justify-end">
                    <Hash size={16} className="text-indigo-400" /> ID Sertifikat
                  </div>
                  <p className="font-mono text-slate-800 font-bold text-lg tracking-wider">
                    {certId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* TOMBOL KEMBALI KE MODUL */}
            <button
              onClick={() => navigate("/module/")}
              className="px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition flex items-center justify-center gap-2"
            >
              <Home size={20} /> Kembali ke Modul
            </button>
            <button className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 transition hover:-translate-y-1">
              <Download size={20} /> Unduh PDF
            </button>
            <button className="px-8 py-4 rounded-2xl bg-white border-2 border-indigo-100 text-indigo-600 font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2 shadow-sm">
              <Share2 size={20} /> Bagikan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
