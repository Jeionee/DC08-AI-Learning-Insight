import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { IoReorderThree } from "react-icons/io5";
import { AppContext } from "../contexts/contexts";

export default function Navbar({ toggleSidebar, onLogout }) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const dropdownRef = useRef(null);
	const { name } = useContext(AppContext);
	const handleLogout = () => {
		onLogout();
		localStorage.removeItem("token");
		navigate("/login");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="w-full h-16 bg-white shadow fixed top-0 left-0 z-50 flex items-center px-6">
			<button
				onClick={toggleSidebar}
				className="text-gray-700 text-2xl mr-4 hover:text-black transition duration-200"
			>
				<IoReorderThree size={35} />
			</button>

			{/* LOGO */}
			<h1 className="text-2xl font-bold text-gray-800">LeanSmart</h1>

			{/* RIGHT PROFILE DROPDOWN */}
			<div className="ml-auto relative" ref={dropdownRef}>
				{/* Profile toggle */}
				<div
					className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition duration-200"
					onClick={() => setOpen(!open)}
				>
					<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
						{"O"}
					</div>

					<span className="text-gray-700 font-medium">{name}</span>

					{/* Chevron Icon */}
					<FiChevronDown
						className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					/>
				</div>

				{/* DROPDOWN MENU */}
				<div
					className={`absolute right-0 mt-3 w-52 bg-white border rounded-xl shadow-lg z-50 transition-all duration-200 origin-top-right ${
						open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
					}`}
				>
					{/* PROFILE */}
					<Link
						to="/profile"
						className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150"
					>
						<CgProfile size={20} className="mr-3" /> Your Profile
					</Link>

					{/* LOGOUT */}
					<button
						className="flex items-center w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 hover:text-red-600 transition duration-150 rounded-b-xl"
						onClick={handleLogout}
					>
						<IoIosLogOut size={20} className="mr-3" />
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}
