import ModuleProgress from "../components/ModuleProgress";

export default function ProgressPage() {
	const modules = {
		progress: {
			courseCompletion: 75,
			timeSpentToday: 205,
			dailyGoal: 300,
			weeklyProgress: 15,
		},
	};
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Progress</h1>

			<p>Ini halaman progress.</p>

			<div className="mt-4 p-4 border rounded bg-white">
				<h2 className="text-xl font-semibold mb-2">progress Belajar</h2>
				{/* MODULE PROGRESS */}
				<ModuleProgress modules={modules} />
			</div>
		</div>
	);
}
