import React, { useEffect, useState, useContext } from "react";
import { getDailyProgress, getStudent } from "../api/studentApi";
import { AppContext } from "../contexts/contexts";
import {
	Bell,
	Search,
	Calendar,
	ChevronDown,
	Filter,
	TrendingUp,
	Clock,
	BookOpen,
} from "lucide-react";

/* Components Import */
import Charts from "../components/Charts";
import LearningStyleCard from "../components/LearningStyleCard";
import ContinueLearning from "../components/ContinueLearning";

const Dashboard = ({ data }) => {
	const { student, setStudent } = useContext(AppContext);
	const [dailyProgress, setDailyProgress] = useState({
		percentage: 0,
		student_id: 0,
		target_hours: 0,
		time_spent_hours: 0,
	});

	// --- 1. Fetch Data ---
	useEffect(() => {
		async function fetchStudent() {
			try {
				const s = await getStudent();
				setStudent({
					name: s.name,
					email: s.email,
					learning_style: s.learning_style,
					joined_since: s.joined_since,
					photo_profile: s.photo_profile,
				});
			} catch (error) {
				console.error("Failed to fetch student", error);
			}
		}
		fetchStudent();
	}, [setStudent]);

	useEffect(() => {
		if (data && data.progress) {
			setDailyProgress({
				percentage: (data.progress.timeSpentToday / data.progress.dailyGoal) * 100,
				target_hours: data.progress.dailyGoal,
				time_spent_hours: data.progress.timeSpentToday,
			});
		}
	}, [data]);

	const currentDate = new Date().toLocaleDateString("id-ID", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	// Helper untuk inisial nama
	const getInitials = (name) => {
		if (!name) return "U";
		return name.charAt(0).toUpperCase();
	};

	return (
		<div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
			{/* ================= 1. HERO HEADER SECTION (Z-INDEX LOW) ================= */}
			{/* Kita beri z-0 agar dia berada di lapisan paling bawah */}
			<div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 pb-24 pt-24 px-6 lg:px-12 shadow-lg relative z-0">
				<div className="max-w-7xl mx-auto">
					{/* Welcome Text Only (Stats dipindah) */}
					<div className="flex flex-col md:flex-row justify-between items-end gap-6">
						<div>
							<h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 leading-tight">
								<br /> Selamat Datang, <br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
									{student.name?.split(" ")[0]}!
								</span>{" "}
								👋
							</h1>
							<p className="text-indigo-200 text-base max-w-lg">
								Siap melanjutkan progres belajarmu? Mari kita selesaikan target hari ini dengan
								semangat!
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* ================= 2. MAIN CONTENT OVERLAP (Z-INDEX HIGH) ================= */}
			{/* Kita beri z-10 agar dia mengapung DI ATAS header */}
			<div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 pb-12 relative z-10">
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
					{/* --- LEFT COLUMN (2/3 Width) --- */}
					<div className="xl:col-span-2 flex flex-col gap-8">
						{/* Component: Continue Learning */}
						<div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-1">
							<ContinueLearning />
						</div>

						{/* Component: Charts */}
						<div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
								<div>
									<h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
										<div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
											<TrendingUp size={20} />
										</div>
										Analisis Aktivitas
									</h3>
									<p className="text-slate-500 text-sm mt-1 ml-11">
										Statistik performa belajar mingguanmu.
									</p>
								</div>
							</div>

							{/* Chart Wrapper */}
							<div className="min-h-[350px]">
								<Charts
									weeklyActivity={data.weeklyActivity}
									learningDistribution={data.learningDistribution}
								/>
							</div>
						</div>
					</div>

					{/* --- RIGHT COLUMN (1/3 Width) --- */}
					<div className="xl:col-span-1 flex flex-col gap-6">
						{/* 1. QUICK STATS */}
						<div className="grid grid-cols-2 gap-4">
							{/* Card Time Spent */}
							<div className="bg-white rounded-3xl p-5 shadow-lg shadow-indigo-100/50 border border-slate-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
								<div className="mb-3 p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
									<Clock size={24} />
								</div>
								<p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
									Time Spent
								</p>
								<div className="flex items-baseline gap-1">
									<span className="text-3xl font-extrabold text-slate-800">
										{Math.floor(dailyProgress.time_spent_hours / 60)}
									</span>
									<span className="text-sm font-medium text-slate-500">Jam</span>
								</div>
							</div>

							{/* Card Modules Done */}
							<div className="bg-white rounded-3xl p-5 shadow-lg shadow-indigo-100/50 border border-slate-100 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300">
								<div className="mb-3 p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
									<BookOpen size={24} />
								</div>
								<p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
									Modules
								</p>
								<div className="flex items-baseline gap-1">
									<span className="text-3xl font-extrabold text-slate-800">12</span>
									<span className="text-sm font-medium text-slate-500">Done</span>
								</div>
							</div>
						</div>

						{/* 2. Learning Style Card (Sticky) */}
						{/* Hapus sticky jika konten kanan lebih panjang dari kiri, tapi ini aman */}
						<div className="relative">
							<div className="bg-white rounded-[2.5rem] p-1 shadow-xl shadow-indigo-100/50">
								<LearningStyleCard learningStyle={student.learning_style} />
							</div>

							{/* Mini Info / Quote */}
							<div className="mt-8 px-6 text-center">
								<p className="text-slate-400 text-sm italic">
									"Pendidikan adalah senjata paling ampuh untuk mengubah dunia."
								</p>
								<p className="text-slate-500 text-xs font-bold mt-2">- Nelson Mandela</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
