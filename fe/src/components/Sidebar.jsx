import React from "react";

const Sidebar = () => {
	return (
		<div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
			<div className="p-6 border-b border-blue-500">
				<h1 className="text-2xl font-bold">LeamSmart</h1>
			</div>
			<nav className="p-4">
				<ul className="space-y-2">
					<li>
						<a href="#" className="flex items-center p-3 rounded-lg bg-blue-500 text-white">
							<span className="mr-3">🏠</span>
							Home
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center p-3 rounded-lg hover:bg-blue-500 transition-colors"
						>
							<span className="mr-3">📊</span>
							Progress
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center p-3 rounded-lg hover:bg-blue-500 transition-colors"
						>
							<span className="mr-3">🎯</span>
							Recommendation
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center p-3 rounded-lg hover:bg-blue-500 transition-colors"
						>
							<span className="mr-3">🏆</span>
							Challenges
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
