import React from "react";
/* icons */
import { GrHomeRounded } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
/* hooks */
import { NavLink } from "react-router";

export default function Sidebar() {
	const Li = ({ children, text, to }) => (
		<li>
			<NavLink
				className="flex gap-4 items-center p-3 rounded-lg hover:bg-slate-800/50 hover:shadow-lg transition-all duration-300"
				to={to}
			>
				{children}
				<p>{text}</p>
			</NavLink>
		</li>
	);
	return (
		<div className="bg-slate-700 h-screen shadow-lg w-3/12 text-white">
			<div className="p-6 border-b border-[#e0e4e9]">
				<h1 className="text-2xl font-bold tracking-wide">LeanSmart</h1>
			</div>

			<nav className="p-4">
				<ul className="space-y-2">
					<Li text={"Dashboard"} to={"/"}>
						<GrHomeRounded size={24} />
					</Li>
					<Li text="Profile" to={"/profile"}>
						<CgProfile size={26} />
					</Li>
					<Li text="Logout" to={"/"}>
						<CgLogOut size={27} />
					</Li>
				</ul>
			</nav>
		</div>
	);
}
