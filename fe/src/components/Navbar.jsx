import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import {
	User,
	LogOut,
	ChevronDown,
	BookOpen,
	BarChart2,
	LayoutDashboard,
	Settings,
} from "lucide-react";
import { AppContext } from "../contexts/contexts";

export default function Navbar({ onLogout }) {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();
	const { student } = useContext(AppContext);

	// --- LOGIKA MENYEMBUNYIKAN NAVBAR ---
	// Masukkan path/url di mana kamu TIDAK ingin Navbar muncul
	const hiddenPaths = [
		"/login",
		"/register",
		"/forgot-password",
		"/", // Jika halaman awal adalah landing page/login
		// "/module-detail" // Tambahkan jika ingin sembunyi di detail modul
	];

	// Jika path saat ini ada di dalam list hiddenPaths, jangan render apa-apa (return null)
	if (hiddenPaths.includes(location.pathname)) {
		return null;
	}
	// ------------------------------------

	const handleLogout = () => {
		onLogout();
		localStorage.removeItem("token");
		navigate("/login");
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "U");
	const isActive = (path) => location.pathname === path;

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
				scrolled
					? "bg-indigo-900/95 backdrop-blur-md shadow-lg py-3" // SCROLL: Ungu Gelap
					: "bg-white border-b border-slate-100 py-5" // TOP: Putih Bersih
			}`}
		>
			<div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
				{/* --- 1. LOGO --- */}
				<Link to="/dashboard" className="flex items-center gap-2 group">
					<div
						className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-lg transition-colors duration-300 ${
							scrolled ? "bg-white text-indigo-900" : "bg-indigo-600 text-white shadow-indigo-200"
						}`}
					>
						L
					</div>
					<span
						className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${
							scrolled ? "text-white" : "text-slate-800"
						}`}
					>
						LeanSmart
					</span>
				</Link>

				{/* --- 2. CENTER NAVIGATION --- */}
				<div
					className={`hidden md:flex items-center space-x-1 p-1 rounded-full border transition-all duration-300 ${
						scrolled ? "bg-white/10 border-white/10" : "bg-slate-100 border-slate-200"
					}`}
				>
					{[
						{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
						{ name: "Progress", path: "/progress", icon: BarChart2 },
						{ name: "Module", path: "/module", icon: BookOpen },
					].map((item) => {
						const active = isActive(item.path);
						const Icon = item.icon;

						// Logic Warna Tombol
						let buttonClass = "";
						if (scrolled) {
							// Mode Scroll (Background Gelap)
							buttonClass = active
								? "bg-white text-indigo-900 shadow-md"
								: "text-indigo-200 hover:text-white hover:bg-white/10";
						} else {
							// Mode Top (Background Putih)
							buttonClass = active
								? "bg-white text-indigo-600 shadow-sm border border-slate-100"
								: "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50";
						}

						return (
							<Link
								key={item.path}
								to={item.path}
								className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${buttonClass}`}
							>
								<Icon size={16} />
								{item.name}
							</Link>
						);
					})}
				</div>

				{/* --- 3. PROFILE DROPDOWN --- */}
				<div className="relative" ref={dropdownRef}>
					<button
						onClick={() => setOpen(!open)}
						className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full transition-all border ${
							scrolled
								? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
								: "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
						}`}
					>
						<div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
							<div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
								{student.photo_profile ? (
									<img
										src={student.photo_profile}
										alt="Avatar"
										className="w-full h-full object-cover"
									/>
								) : (
									<span className="text-indigo-700 font-bold text-xs">
										{getInitials(student.name)}
									</span>
								)}
							</div>
						</div>

						<span className="text-sm font-semibold max-w-[100px] truncate hidden sm:block">
							{student.name || "Student"}
						</span>

						<ChevronDown
							size={16}
							className={`transition-transform duration-300 ${open ? "rotate-180" : ""} opacity-70`}
						/>
					</button>

					{/* Dropdown Menu */}
					<div
						className={`absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform transition-all duration-200 origin-top-right ${
							open
								? "scale-100 opacity-100 translate-y-0"
								: "scale-95 opacity-0 -translate-y-2 pointer-events-none"
						}`}
					>
						<div className="px-4 py-4 border-b border-slate-50 bg-slate-50/50">
							<p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
								Signed in as
							</p>
							<p className="text-sm font-bold text-slate-800 truncate">
								{student.email || "student@example.com"}
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
							<button
								onClick={handleLogout}
								className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
							>
								<LogOut size={18} /> Logout
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
