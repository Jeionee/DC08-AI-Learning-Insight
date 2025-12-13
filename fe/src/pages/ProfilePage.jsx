import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../contexts/contexts";
import { getStudent } from "../api/studentApi";
import { LearningStyle, Email } from "../components/ProfileComponents";
import {
  User,
  Mail,
  Camera,
  Save,
  Edit3,
  MapPin,
  Calendar,
  BookOpen,
  Clock,
  ShieldCheck,
  AtSign,
  Phone,
} from "lucide-react";

export default function ProfilePage() {
  const { student, setStudent } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // State form lokal
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "Student at LeanSmart Academy 🚀", // Dummy default
    phone: "+62 000-0000-00000", // Dummy default
    avatar: "",
  });

  // Sinkronisasi data student ke form saat dimuat
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        bio: "Learning Enthusiast | Frontend Developer Wannabe", // Placeholder
        phone: "+62 000 000 00",
        avatar: student.photo_profile || null,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi API Save
    setTimeout(() => {
      setStudent({
        ...student,
        name: formData.name,
        email: formData.email,
        photo_profile: formData.avatar,
      });
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  // Helper tanggal
  const joinDate = student?.joined_since
    ? new Date(student.joined_since).toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      })
    : "Januari 2024";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900 relative pb-20">
      {/* --- 1. HEADER BANNER (Abstract Gradient) --- */}
      <div className="h-64 w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white opacity-5 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- 2. LEFT COLUMN (Profile Card) --- */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 text-center border border-slate-100 relative overflow-hidden">
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-4 group">
                <div className="w-full h-full rounded-full p-1 bg-white shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 text-4xl font-bold">
                        {formData.name.charAt(0)}
                      </div>
                    )}

                    {/* Overlay Edit Avatar */}
                    {isEditing && (
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" size={24} />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                </div>
                {/* Online Status */}
              </div>

              {/* Name & Role */}
              <h2 className="text-2xl font-bold text-slate-800">
                {formData.name}
              </h2>
              <p className="text-slate-500 text-sm font-medium mb-6">
                Student • {student.learning_style || "General Learner"}
              </p>

              {/* Quick Info List */}
              <div className="space-y-3 text-left bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="text-indigo-500" />
                  <span className="truncate">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar size={16} className="text-indigo-500" />
                  <span>Joined {joinDate}</span>
                </div>
              </div>

              {/* Action Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 w-full py-3 rounded-xl border border-indigo-100 text-indigo-600 font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2"
                >
                  <Edit3 size={18} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* --- 3. RIGHT COLUMN (Details & Form) --- */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Courses
                  </p>
                  <p className="text-xl font-bold text-slate-800">12</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Hours
                  </p>
                  <p className="text-xl font-bold text-slate-800">128</p>
                </div>
              </div>
              <div className="hidden md:flex bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Status
                  </p>
                  <p className="text-xl font-bold text-slate-800">Active</p>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">
                  Informasi Pribadi
                </h3>
                {isEditing && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                    Editing Mode
                  </span>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all ${
                          isEditing
                            ? "bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                            : "bg-slate-50 border-slate-100 text-slate-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 ml-1">
                      Email
                    </label>
                    <div className="relative">
                      {/* Non-Editable Section */}
                      {!isEditing ? (
                        // Menampilkan email dan ikon email di sampingnya
                        <div className="w-full pl-4 pr-4 py-3.5 rounded-xl bg-slate-50 border-slate-300 text-slate-500 cursor-not-allowed border-2 flex items-center">
                          <Mail className="text-slate-400 mr-3" size={18} />{" "}
                          {/* Ikon Email */}
                          <span className="text-slate-600">
                            {formData.email}
                          </span>{" "}
                          {/* Teks Email */}
                        </div>
                      ) : (
                        // Input email saat editing (dengan ikon di dalam input)
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border-slate-300 text-slate-500 cursor-not-allowed border-2"
                        />
                      )}
                    </div>
                  </div>

                  {/* Learning Style (Read Only) */}
                  <LearningStyle student={student} />
                </div>

                {/* Buttons (Save/Cancel) */}
                {isEditing && (
                  <div className="flex gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        // Reset form ke data asli jika cancel
                        setFormData({
                          ...formData,
                          name: student.name,
                          email: student.email,
                        });
                      }}
                      className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save size={18} /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
