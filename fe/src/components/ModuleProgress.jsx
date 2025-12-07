// import React from "react";

// const ModuleProgress = () => {
// 	const getStatusColor = (progress) => {
// 		if (progress === 100) return "bg-green-600";
// 		if (progress >= 50) return "bg-blue-600";
// 		if (progress >= 25) return "bg-amber-600";
// 		return "bg-gray-400";
// 	};

// 	const getScoreEmoji = (score) => {
// 		if (score === null) return "⏳";
// 		if (score >= 90) return "🌟";
// 		if (score >= 80) return "✨";
// 		if (score >= 70) return "👍";
// 		return "📝";
// 	};

// 	const calculateOverallProgress = () => {
// 		const completed = modules.reduce((sum, module) => sum + module.progress, 0);
// 		return Math.round(completed / modules.length);
// 	};

// 	return (
// 		<div className="mb-8">
// 			<div className="flex justify-between items-center mb-6">
// 				<div>
// 					<h2 className="text-2xl font-bold text-gray-900">Progress Modul & Nilai</h2>
// 					<p className="text-gray-600 mt-1">Total progress: 10% dari semua modul</p>
// 				</div>
// 				<div className="flex items-center gap-4">
// 					<span className="text-sm text-gray-600">Filter:</span>
// 					<select className="text-sm border rounded-lg px-3 py-1.5 text-gray-700">
// 						<option>Semua Modul</option>
// 						<option>Belum Selesai</option>
// 						<option>Selesai</option>
// 					</select>
// 				</div>
// 			</div>

// 			<div className="space-y-4">
// 				{modules.map((module, index) => (
// 					<div
// 						key={module.id}
// 						className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
// 					>
// 						<div className="flex justify-between items-start mb-4">
// 							<div>
// 								<h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
// 									{module.title}
// 									{module.progress === 100 && (
// 										<span className="text-green-600 text-sm bg-green-50 px-2 py-0.5 rounded-full">
// 											Selesai
// 										</span>
// 									)}
// 								</h3>
// 								<p className="text-gray-600 text-sm mt-1">
// 									Lanjutkan belajar untuk meningkatkan nilaimu
// 								</p>
// 							</div>
// 							<div className="text-right">
// 								<span className="text-blue-600 font-semibold">{module.progress}% Selesai</span>
// 								<div className="text-sm text-gray-500 mt-1">
// 									{module.assessments.filter((a) => a.score !== null).length} dari{" "}
// 									{module.assessments.length} tugas selesai
// 								</div>
// 							</div>
// 						</div>

// 						{/* PROGRESS BAR */}
// 						<div className="w-full bg-gray-100 rounded-full h-3 mb-6">
// 							<div
// 								className="h-3 rounded-full transition-all duration-500 relative"
// 								style={{
// 									width: `${module.progress}%`,
// 									background:
// 										index === 0 || index === 1
// 											? "linear-gradient(to right, #4cc9f0, #3a0ca3)"
// 											: undefined,
// 								}}
// 							>
// 								{/* Jika bukan card 1 & 2, gunakan warna default */}
// 								{index !== 0 && index !== 1 && (
// 									<div
// 										className={`${getStatusColor(module.progress)} absolute inset-0 rounded-full`}
// 									/>
// 								)}

// 								{module.progress >= 30 && (
// 									<div className="h-full flex items-center justify-center relative">
// 										<span className="text-white text-xs font-medium">{module.progress}%</span>
// 									</div>
// 								)}
// 							</div>
// 						</div>

// 						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// 							{module.assessments.map((assessment, index) => (
// 								<div
// 									key={index}
// 									className={`p-4 rounded-lg border ${
// 										assessment.score === null
// 											? "border-gray-200 bg-gray-50"
// 											: assessment.score >= 80
// 											? "border-green-200 bg-green-50"
// 											: assessment.score >= 70
// 											? "border-amber-200 bg-amber-50"
// 											: "border-red-200 bg-red-50"
// 									}`}
// 								>
// 									<div className="flex justify-between items-start">
// 										<div>
// 											<span className="text-gray-900 font-medium">{assessment.name}</span>
// 											<div className="text-sm mt-1">
// 												{assessment.score === null ? (
// 													<span className="text-gray-500">Belum dikerjakan</span>
// 												) : (
// 													<div className="flex items-center gap-1">
// 														<span
// 															className={`font-semibold ${
// 																assessment.score >= 80
// 																	? "text-green-700"
// 																	: assessment.score >= 70
// 																	? "text-amber-700"
// 																	: "text-red-700"
// 															}`}
// 														>
// 															{assessment.score}%
// 														</span>
// 														<span className="text-lg" title="Score indicator">
// 															{getScoreEmoji(assessment.score)}
// 														</span>
// 													</div>
// 												)}
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default ModuleProgress;
