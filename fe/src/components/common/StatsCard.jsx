import React from "react";

const StatsCard = ({ title, value, subtitle, progress, color, footer }) => {
	const colorClasses = {
		blue: "bg-blue-600",
		teal: "bg-teal-500",
		green: "bg-green-500",
		purple: "bg-purple-500",
	};

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex justify-between items-start mb-4">
				<h3 className="text-gray-500 text-sm font-medium">{title}</h3>
				{subtitle && (
					<span
						className={`text-sm font-semibold ${
							subtitle.includes("+") ? "text-green-500" : "text-gray-400"
						}`}
					>
						{subtitle}
					</span>
				)}
			</div>
			<div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
			<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
				<div
					className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color]}`}
					style={{ width: `${progress}%` }}
				></div>
			</div>
			{footer && <div className="text-gray-500 text-sm">{footer}</div>}
		</div>
	);
};

export default StatsCard;
