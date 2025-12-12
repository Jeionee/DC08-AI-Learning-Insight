import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import {
  User,
  LogOut,
  ChevronDown,
  BookOpen,
  BarChart2,
  LayoutDashboard,
} from "lucide-react";

import { AlertTriangle } from "lucide-react";
import { motion,useScroll, AnimatePresence } from "framer-motion";

import { AppContext } from "../contexts/contexts";

export default function Navbar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [scrolled, setScrolled] = useState(false); // state untuk scroll effect
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = useContext(AppContext);

  // Paths yang navbar-nya disembunyikan
  const hiddenPaths = ["/login", "/register", "/forgot-password"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const { scrollY } = useScroll();
  useEffect(() => {
    return scrollY.on("change", (y) => {
      setScrolled(y > 40);
    });
  }, [scrollY]);

  // Logout handler
  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "U");
  const isActive = (path) => location.pathname === path;

  // Click outside dropdown
  const handleClickCapture = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <nav
        onClickCapture={handleClickCapture}
        className={`fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-indigo-900 shadow-lg border-b border-indigo-700" // warna saat scroll
            : "bg-white/90 backdrop-blur-lg border-b border-slate-200" // sebelum scroll
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              L
            </div>
            <span
              className={`text-xl font-extrabold transition-colors duration-300 ${
                scrolled ? "text-white" : "text-indigo-900"
              }`}
            >
              LeanSmart
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
              { name: "Progress", path: "/progress", icon: BarChart2 },
              { name: "Module", path: "/module", icon: BookOpen },
            ].map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    active
                      ? scrolled
                        ? "bg-white text-indigo-700"
                        : "bg-indigo-600 text-white"
                      : scrolled
                      ? "text-white hover:bg-indigo-700/40"
                      : "text-indigo-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={16} className="transition-colors duration-300" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full transition-all duration-300 border ${
                scrolled
                  ? "bg-indigo-700/40 border-indigo-400 text-white"
                  : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden
                   ${scrolled ? "bg-indigo-600" : "bg-white"}`}
                >
                  {student?.photo_profile ? (
                    <img
                      src={student.photo_profile}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className={`font-bold text-xs transition-colors ${
                        scrolled ? "text-white" : "text-indigo-700"
                      }`}
                    >
                      {getInitials(student?.name)}
                    </span>
                  )}
                </div>
              </div>

              <span
                className={`text-sm font-semibold max-w-[100px] truncate hidden sm:block transition-colors duration-300 ${
                  scrolled ? "text-white" : "text-slate-700"
                }`}
              >
                {student?.name || "Student"}
              </span>

              <ChevronDown
                size={16}
                className={`transition ${open ? "rotate-180" : ""} ${
                  scrolled ? "text-white" : "text-slate-700"
                }`}
              />
            </button>

            {/* Dropdown menu */}
            <div
              className={`absolute right-0 mt-3 w-56 bg-white text-slate-800 border border-slate-200 
              rounded-2xl shadow-xl overflow-hidden transform transition-all duration-200 origin-top-right
              ${
                open
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="px-4 py-4 border-b border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Signed in as
                </p>

                <p className="text-sm font-bold truncate text-slate-800">
                  {student?.email || "student@example.com"}
                </p>
              </div>

              <div className="p-2 space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl 
                 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  <User size={18} /> Profile
                </Link>
              </div>

              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowLogoutConfirm(true);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium 
                 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowLogoutConfirm(false)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
                {/* Icon */}
                <div
                  className="w-14 h-14 mb-4 mx-auto flex items-center justify-center
                          bg-red-100 text-red-600 rounded-full"
                >
                  <AlertTriangle className="w-7 h-7" />
                </div>

                <h2 className="text-xl font-bold text-center text-gray-800">
                  Logout Confirmation
                </h2>
                <p className="text-center text-gray-500 mt-2 mb-6">
                  Are you sure you want to log out?
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="w-1/2 py-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 
                         hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-1/2 py-2 rounded-xl bg-red-600 text-white 
                        hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
