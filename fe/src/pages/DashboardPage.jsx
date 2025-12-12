import React, { useEffect, useState, useContext } from "react";
import { getDailyProgress, getStudent, getQuizScores } from "../api/studentApi";
import { AppContext } from "../contexts/contexts";
import { getWeeklyActivity } from "../api/studentApi";
import { TrendingUp, Clock, BookOpen } from "lucide-react";

/* Components Import */
import Charts from "../components/Charts";
import LearningStyleCard from "../components/LearningStyleCard";
import ContinueLearning from "../components/ContinueLearning";
import Hero from "../components/Hero";

const Dashboard = ({ data }) => {
	const { student, setStudent } = useContext(AppContext);
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
	}, []);

	const [dailyProgress, setDailyProgress] = useState({
		percentage: 0,
		student_id: 0,
		target_hours: 0,
		time_spent_hours: 0,
	});
	const [quizScores, setQuizScores] = useState([]);
	//   useEffect(() => {
	//     async function fetchQuizScores() {
	//       try {
	//         const response = await getQuizScores();
	//         setQuizScores(response);
	//       } catch (error) {
	//         console.error("Failed to fetch Quiz Scores", error);
	//       }
	//     }
	//     fetchQuizScores();
	//   }, []);

	const [weeklyProgress, setWeeklyProgress] = useState([]);

	useEffect(() => {
		async function fetchWeekly() {
			try {
				const data = await getWeeklyActivity();

				setWeeklyProgress(data);
			} catch (error) {
				console.error("Failed to fetch weekly progress:", error);
			}
		}

		fetchWeekly();
	}, []);

	// --- 1. Fetch Data ---

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

	return (
		<div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
			{/* ================= 1. HERO HEADER SECTION (Z-INDEX LOW) ================= */}
			<Hero student={student} />

			{/* ================= 2. MAIN CONTENT OVERLAP (Z-INDEX HIGH) ================= */}
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
								<Charts weekly={weeklyProgress} />
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
