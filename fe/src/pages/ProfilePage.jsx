import React, { useState } from "react";

export default function ProfilePage({ user }) {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		learningStyle: user.learningStyle,
		avatar: user.avatar || null, // bisa URL foto user
	});

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
		// TODO: kirim formData ke server untuk disimpan
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
								user.name.charAt(0)
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

	// ===== MODE VIEW =====
	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

			{/* PROFILE CARD */}
			<div className="bg-white rounded-2xl shadow-md border p-8 flex items-center space-x-8">
				<div className="w-32 h-32 rounded-full bg-slate-700 text-white flex items-center justify-center text-4xl font-bold shadow-lg overflow-hidden">
					{formData.avatar ? (
						<img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
					) : (
						user.name.charAt(0)
					)}
				</div>
				<div>
					<h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
					<p className="text-gray-600 mt-1">Student at LeanSmart Academy</p>

					<div className="mt-4 flex items-center space-x-3">
						<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
							Bergabung Sejak 2025
						</span>
					</div>
				</div>
			</div>

			{/* BIO SECTION */}
			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white border shadow-sm p-6 rounded-xl">
					<h3 className="text-xl font-semibold text-gray-900 mb-3">Learning Style</h3>
					<p className="text-gray-600 mb-4">Kamu belajar dengan pendekatan:</p>
					<div className="flex items-center space-x-3">
						<span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
							{user.learningStyle === "consistent"
								? "Consistent Learner"
								: user.learningStyle === "fast"
								? "Fast Learner"
								: "Reflective Learner"}
						</span>
					</div>
				</div>

				<div className="bg-white border shadow-sm p-6 rounded-xl">
					<h3 className="text-xl font-semibold text-gray-900 mb-3">Detail Informasi</h3>
					<ul className="text-gray-700 space-y-2">
						<li>
							<strong className="text-gray-900">Email:</strong> {user.email}
						</li>
						<li>
							<strong className="text-gray-900">Program:</strong> Front-End Learning Path
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
