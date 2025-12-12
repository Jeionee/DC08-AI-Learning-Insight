import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StudentsLayout({ onLogout }) {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Navbar onLogout={onLogout} />

			{/* MAIN CONTENT */}
			<main className="flex-1 bg-gray-100 transition-all duration-300">
				<Outlet />
			</main>
		</div>
	);
}
