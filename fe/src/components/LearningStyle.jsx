import { FaGraduationCap } from "react-icons/fa6";

export default function LearningStyle({ learning_style }) {
	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-start gap-3 mb-3">
				<div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
					<FaGraduationCap size={20} className="text-blue-600" />
				</div>

				<div>
					<h2 className="text-gray-800 font-bold text-lg">Learning Style</h2>
					<p className="text-gray-500 text-xs -mt-0">Gaya Belajar</p>
				</div>
			</div>

			{/* Highlight Box */}
			<div className="rounded-xl p-5 bg-blue-50 border border-blue-100">
				<h3 className="text-blue-700 font-bold text-lg mb-1">{learning_style}</h3>

				<p className="text-gray-600 text-sm leading-relaxed"></p>
			</div>
		</div>
	);
}
