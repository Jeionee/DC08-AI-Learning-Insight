import React, { useEffect, useState, useContext } from "react";
import StatsCard from "../components/StatsCard";
import Charts from "../components/Charts";
import { FaGraduationCap } from "react-icons/fa6";
/* components */
import LearningStyle from "../components/LearningStyle";
import { AppContext } from "../contexts/contexts";

const Dashboard = ({ data }) => {
	const { name, learning_style } = useContext(AppContext);
	const formatTime = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours}h ${mins}m`;
	};

	return (
		<div className="flex-1 pr-8 py-1 pl-0 border-0">
			{/* HEADER */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
				<p className="text-gray-600 my-3">
					Selamat datang kembali, <b>{name}</b> ! Mari lanjutkan pembelajaranmu.
				</p>
			</div>

			{/* TOP CARDS */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				{/* TIME SPENT LEARNING */}
				<div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100 relative">
					<h3 className="text-gray-600 text-sm font-medium mb-2">Time Spent Learning</h3>

					<div className="text-4xl font-bold text-gray-900 mb-1">
						{formatTime(data.progress.timeSpentToday)}
					</div>

					<p className="text-gray-600 text-sm mb-4">Hari ini</p>

					{/* Progress Bar */}
					<div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-3">
						<div
							className="bg-blue-600 h-2"
							style={{
								width: `${(data.progress.timeSpentToday / data.progress.dailyGoal) * 100}%`,
							}}
						></div>
					</div>

					<div className="flex justify-between text-sm text-gray-600">
						<span>Target harian: {formatTime(data.progress.dailyGoal)}</span>
						<span>
							{Math.floor((data.progress.timeSpentToday / data.progress.dailyGoal) * 100)}%
						</span>
					</div>

					{/* BULAT INFO */}
					<div
						className="
              absolute right-6 top-6
              w-24 h-24 rounded-full
              bg-blue-50 border border-blue-200
              flex flex-col justify-center items-center
              text-center
            "
					>
						<span className="text-xl font-bold text-blue-800">
							{data.progress.averageDailyHours}3.6/hari
						</span>
						<span className="text-[11px] text-blue-700">Rata-rata jam belajar</span>
					</div>
				</div>

				{/* LEARNING STYLE */}
				<LearningStyle learning_style={learning_style} />
			</div>

			{/* CHARTS */}
			<Charts
				weeklyActivity={data.weeklyActivity}
				learningDistribution={data.learningDistribution}
			/>
		</div>
	);
};

export default Dashboard;
