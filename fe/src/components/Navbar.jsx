import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import {
  User,
  LogOut,
  ChevronDown,
  BookOpen,
  BarChart2,
  LayoutDashboard,
} from "lucide-react";
import { AppContext } from "../contexts/contexts";

export default function Navbar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = useContext(AppContext);

  // Navbar hidden logic
  const hiddenPaths = ["/login", "/register", "/forgot-password"];
  const isHidden = hiddenPaths.includes(location.pathname);
  if (isHidden) return null;

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "U");
  const isActive = (path) => location.pathname === path;

  // --- React-only click outside handler ---
  const handleClickCapture = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    // Tangani click capture di root navbar container
    <nav
      onClickCapture={handleClickCapture}
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100 py-5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            L
          </div>
          <span className="text-xl font-extrabold text-slate-800">
            LeanSmart
          </span>
        </Link>

        {/* Center Navigation */}
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
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:bg-slate-200"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border bg-slate-50"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {student?.photo_profile ? (
                  <img
                    src={student.photo_profile}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-indigo-700 font-bold text-xs">
                    {getInitials(student?.name)}
                  </span>
                )}
              </div>
            </div>

            <span className="text-sm font-semibold max-w-[100px] truncate hidden sm:block">
              {student?.name || "Student"}
            </span>

            <ChevronDown
              size={16}
              className={`${open ? "rotate-180" : ""} transition`}
            />
          </button>

          {/* Dropdown menu */}
          <div
            className={`absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border overflow-hidden transform transition-all duration-200 origin-top-right ${
              open
                ? "scale-100 opacity-100 translate-y-0"
                : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="px-4 py-4 border-b border-slate-50">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Signed in as
              </p>
              <p className="text-sm font-bold text-slate-800 truncate">
                {student?.email || "student@example.com"}
              </p>
            </div>
            <div className="p-2 space-y-1">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                onClick={() => setOpen(false)}
              >
                <User size={18} /> Profile
              </Link>
            </div>
            <div className="p-2 border-t border-slate-50">
              {/* <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button> */}
			  <button
    onClick={() => {
      setShowLogoutConfirm(true); // <-- buka modal
      setOpen(false); // tutup dropdown
    }}
    className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
  >
    <LogOut size={18} /> Logout
  </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal konfirmasi logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <p className="mb-4 text-sm text-gray-700">
              Apakah Anda yakin ingin keluar?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
