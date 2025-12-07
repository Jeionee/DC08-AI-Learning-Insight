import React, { useEffect, useState } from "react";
import { getStudent } from "../api/studentApi";

export default function ProfilePage({ user }) {
	const [student, setStudent] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		learning_style: "",
		avatar: null,
	});

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await getStudent(5);
				setStudent(data);

				setFormData({
					name: data.name,
					email: data.email,
					learning_style: data.learning_style,
					avatar: data.photo_profile,
				});
			} catch (error) {
				console.error("Gagal mengambil data:", error);
			}
		}

		fetchData();
	}, []);

	if (!student) {
		return <p className="p-6 text-gray-600">Loading...</p>;
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({ ...formData, avatar: URL.createObjectURL(file) });
		}
	};

	const handleSave = (e) => {
		e.preventDefault();
		console.log("Data disimpan:", formData);
		setIsEditing(false);
	};

	// ===== MODE EDIT =====
	if (isEditing) {
		return (
			<div className="p-8 bg-white rounded-2xl shadow-md">
				<h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
				<form className="space-y-4" onSubmit={handleSave}>
					{/* Avatar */}
					<div className="flex items-center space-x-4">
						<div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-4xl font-bold overflow-hidden">
							{formData.avatar ? (
								<img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
							) : (
								student.name.charAt(0)
							)}
						</div>
						<input type="file" accept="image/*" onChange={handleAvatarChange} />
					</div>

					{/* Name */}
					<div>
						<label className="block text-gray-700 font-medium">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full border rounded-xl p-3 mt-1"
						/>
					</div>

					{/* Email */}
					<div>
						<label className="block text-gray-700 font-medium">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full border rounded-xl p-3 mt-1"
						/>
					</div>

					{/* Buttons */}
					<div className="flex space-x-3 mt-4">
						<button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow">
							Save
						</button>
						<button
							type="button"
							onClick={() => setIsEditing(false)}
							className="px-6 py-3 bg-gray-300 rounded-xl"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className="p-0">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

			{/* PROFILE CARD */}
			<div className="bg-white rounded-2xl shadow-md border p-8 flex items-center space-x-8">
				<div className="w-32 h-32 rounded-full bg-slate-700 text-white flex items-center justify-center text-4xl font-bold shadow-lg overflow-hidden">
					{student.photo_profile ? (
						<img src={student.photo_profile} alt="Avatar" className="w-full h-full object-cover" />
					) : (
						student.name.charAt(0)
					)}
				</div>
				<div>
					<h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
					<p className="text-gray-600 mt-1">Student at LeanSmart Academy</p>

					<div className="mt-4 flex items-center space-x-3">
						<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
							Bergabung Sejak{" "}
							{student.joined_since
								? (() => {
										const date = new Date(student.joined_since);
										const day = String(date.getDate()).padStart(2, "0");
										const month = String(date.getMonth() + 1).padStart(2, "0");
										const year = date.getFullYear();
										return `${day}-${month}-${year}`;
								  })()
								: "-"}
						</span>
					</div>
				</div>
			</div>

			{/* LEARNING STYLE & INFORMASI DETAIL (1 CARD) */}
			<div className="mt-8 grid grid-cols-1 gap-6">
				<div className="bg-white border shadow-sm p-6 rounded-xl">
					<h3 className="text-xl font-semibold text-gray-900 mb-3">Learning Style</h3>
					<p className="text-gray-600 mb-4">Kamu belajar dengan pendekatan:</p>
					<span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
						{student.learning_style
							? student.learning_style === "consistent"
								? "Consistent Learner"
								: student.learning_style === "fast"
								? "Fast Learner"
								: "Reflective Learner"
							: "Belum ditentukan"}
					</span>

					<hr className="my-6" />

					<h3 className="text-xl font-semibold text-gray-900 mb-3">Informasi Detail</h3>
					<ul className="text-gray-700 space-y-2">
						<li>
							<strong className="text-gray-900">Email:</strong> {student.email}
						</li>
					</ul>
				</div>
			</div>

			{/* ACTION BUTTON */}
			<div className="mt-8">
				<button
					className="px-6 py-3 bg-slate-700 hover:bg-slate-800 transition rounded-xl text-white font-semibold shadow"
					onClick={() => setIsEditing(true)}
				>
					Edit Profile
				</button>
			</div>
		</div>
	);
}
