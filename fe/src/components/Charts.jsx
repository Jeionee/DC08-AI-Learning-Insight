import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Charts = ({ quizScores }) => {
	return (
		<div className="space-y-6 mb-8">
			{/* Ringkasan Aktivitas */}
			<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-5 shadow-sm">
				<h4 className="text-sm font-semibold text-blue-700 mb-2">Aktivitas Mingguan</h4>
				<p className="text-lg text-gray-800 font-medium">
					Kamu belajar selama <span className="font-bold">15 jam</span> minggu ini, rata-rata{" "}
					<span className="font-bold">3 jam/hari</span>. Targetmu tercapai selama{" "}
					<span className="font-bold text-blue-600">2</span> hari!
				</p>
				<p className="text-sm text-green-600 mt-2">
					Naik +2.5 jam dibanding minggu lalu <FaArrowUp className="inline text-green-600" />
				</p>
			</div>

			{/* Nilai Kuis */}
			<div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl shadow-md p-6 border border-gray-100">
				<h3 className="text-xl font-semibold text-gray-900 mb-2">Nilai Kuis</h3>
				<p className="text-sm text-gray-500 mb-4">Hasil nilai tiap kuis yang telah kamu kerjakan</p>
				<div className="space-y-3"> </div>
			</div>
		</div>
	);
};

export default Charts;
