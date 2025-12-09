// Navbar.jsx (Final Version Without Sidebar)
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { AppContext } from "../contexts/contexts";

export default function Navbar({ onLogout }) {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();
	const { student } = useContext(AppContext);

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

	return (
		<div className="w-full h-16 bg-white shadow fixed top-0 left-0 z-50 flex items-center px-10">
			{/* LOGO */}
			<h1 className="text-2xl font-bold text-gray-800 mr-10 select-none">LeanSmart</h1>

			{/* CENTER NAVIGATION */}
			<div className="flex space-x-12 text-gray-700 font-medium text-lg ml-48 mr-auto">
				<Link
					to="/dashboard"
					className="opacity-60 hover:opacity-100 hover:text-black transition relative group"
				>
					Dashboard
					<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-slate-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
				</Link>
				<Link
					to="/progress"
					className="opacity-60 hover:opacity-100 hover:text-black transition relative group"
				>
					Progress
					<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-slate-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
				</Link>
				<Link
					to="/module"
					className="opacity-60 hover:opacity-100 hover:text-black transition relative group"
				>
					Module
					<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-slate-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
				</Link>
			</div>

			{/* PROFILE DROPDOWN */}
			<div className="relative" ref={dropdownRef}>
				<div
					className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition"
					onClick={() => setOpen(!open)}
				>
					<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
						{student.name && student.name[0]}
					</div>

					<span className="text-gray-700 font-medium">{student.name}</span>

					<FiChevronDown
						className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					/>
				</div>

				{/* DROPDOWN */}
				<div
					className={`absolute right-0 mt-3 w-52 bg-white border rounded-xl shadow-lg transition-all duration-200 origin-top-right ${
						open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
					}`}
				>
					<Link
						to="/profile"
						className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
					>
						<CgProfile size={20} className="mr-3" /> Your Profile
					</Link>

					<button
						className="flex items-center w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 hover:text-red-600 transition rounded-b-xl"
						onClick={handleLogout}
					>
						<IoIosLogOut size={20} className="mr-3" /> Logout
					</button>
				</div>
			</div>
		</div>
	);
}
