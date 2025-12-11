import {
	ShieldCheck,
	User,
	Mail,
	Camera,
	Save,
	Edit3,
	MapPin,
	Calendar,
	BookOpen,
	Clock,
	AtSign,
	Phone,
} from "lucide-react";

export function LearningStyle({ student = "Not set" }) {
	return (
		<div className="space-y-2">
			<label className="text-sm font-bold text-slate-600 ml-1">Learning Style</label>
			<div className="w-full px-4 py-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold flex items-center justify-between">
				<span>{student.learning_style}</span>
				<ShieldCheck size={18} />
			</div>
		</div>
	);
}

export function Email({ formData, handleChange, isEditing }) {
	return (
		<div className="space-y-2">
			<label className="text-sm font-bold text-slate-600 ml-1">Email Address</label>
			<div className="relative">
				<AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					disabled={!isEditing}
					className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all ${
						isEditing
							? "bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
							: "bg-slate-50 border-slate-100 text-slate-500"
					}`}
				/>
			</div>
		</div>
	);
}
