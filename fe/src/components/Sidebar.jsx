import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { GiRibbonMedal } from "react-icons/gi";
import { FaTrophy } from "react-icons/fa";

const Sidebar = () => {
	return (
		<div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
			<div className="p-6 border-b border-blue-500">
				<h1 className="text-2xl font-bold">LeanSmart</h1>
			</div>
			<nav className="p-4">
				<ul className="space-y-2">
					<li>
						<a href="#" className="flex items-center p-3 rounded-lg bg-blue-500 text-white">
							<span className="mr-3"><IoHomeOutline size={30} /></span>
							Home
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center p-3 rounded-lg hover:bg-blue-500 transition-colors"
						>
							<span className="mr-3"><GiProgression size={30} /> </span>
							Progress
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center p-3 rounded-lg hover:bg-blue-500 transition-colors"
						>
							<span className="mr-3"><GiRibbonMedal size={30} /> </span>
							Recommendation
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center p-3 rounded-lg hover:bg-blue-500 transition-colors"
						>
							<span className="mr-3"><FaTrophy size={30} /></span>
							Challenges
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
