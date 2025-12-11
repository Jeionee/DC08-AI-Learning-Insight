import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { loginRequest } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false); // State loading biar lebih interaktif

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(""); // Reset error setiap submit

		if (!email || !password) {
			setError("Email dan password wajib diisi");
			return;
		}

		setLoading(true); // Mulai loading

		try {
			// Simulasi delay sedikit biar user "merasakan" proses login (optional)
			// await new Promise(r => setTimeout(r, 800));

			const data = await loginRequest(email, password);
			localStorage.setItem("token", data.token);
			onLogin();
		} catch (err) {
			setError("Email atau password salah. Coba lagi ya!");
		} finally {
			setLoading(false); // Selesai loading
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
			{/* Container Utama (Card Besar) */}
			<div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
				{/* --- KIRI: Form Section (40%) --- */}
				<div className="w-full md:w-1/2 lg:w-5/12 p-8 md:p-12 flex flex-col justify-center relative">
					{/* Logo Kecil di Pojok (Optional) */}
					<div className="absolute top-8 left-8 hidden md:block">
						<h2 className="text-xl font-extrabold text-indigo-600 tracking-tighter">LeanSmart</h2>
					</div>

					<div className="mb-8">
						<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
							Welcome Back!
						</h1>
						<p className="text-slate-500">Masuk untuk melanjutkan perjalanan belajarmu.</p>
					</div>

					{/* Alert Error */}
					{error && (
						<div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2 animate-pulse">
							<span className="font-bold">Oops!</span> {error}
						</div>
					)}

					<form onSubmit={handleLogin} className="space-y-5">
						{/* Email Field */}
						<div className="space-y-1.5 shadow-md">
							<label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
							<div className="relative group">
								<Mail
									className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
									size={20}
								/>
								<input
									type="email"
									className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 placeholder-slate-400"
									placeholder="name@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						{/* Password Field */}
						<div className="space-y-1.5 shadow-md">
							<div className="relative group">
								<Lock
									className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
									size={20}
								/>
								<input
									type={showPassword ? "text" : "password"}
									className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 placeholder-slate-400"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1 rounded-full hover:bg-slate-100"
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>
						<br />
						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
						>
							{loading ? (
								<>
									Processing <Loader2 size={20} className="animate-spin" />
								</>
							) : (
								<>
									Sign In <ArrowRight size={20} />
								</>
							)}
						</button>
					</form>
				</div>

				{/* --- KANAN: Image/Branding Section (60%) --- */}
				<div className="hidden md:flex w-1/2 lg:w-7/12 bg-indigo-900 relative items-center justify-center p-12 overflow-hidden">
					{/* Background Image & Overlay */}
					<img
						src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
						alt="Students Learning"
						className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-800/90"></div>

					{/* Content Overlay */}
					<div className="relative z-10 text-white max-w-md">
						<div className="inline-block px-3 py-1 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wide">
							🚀 Platform Belajar Masa Depan
						</div>
						<h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
							Tingkatkan Skill Codingmu Bersama Kami.
						</h2>
						<p className="text-indigo-100 text-lg leading-relaxed mb-8">
							Bergabung dengan ribuan siswa lainnya. Akses materi eksklusif, quiz interaktif, dan
							sertifikat kelulusan yang diakui industri.
						</p>

						{/* Testimonial Mini Card */}
						<div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-start gap-4">
							<div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 font-bold">
								A
							</div>
							<div>
								<p className="text-sm italic text-white/90 mb-2">
									"Platform ini mengubah cara saya belajar. Materinya sangat terstruktur dan mudah
									dipahami!"
								</p>
								<p className="text-xs font-bold text-white uppercase tracking-wider">
									Andi Saputra - Alumni
								</p>
							</div>
						</div>
					</div>

					{/* Decorative Circles */}
					<div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
					<div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
				</div>
			</div>
		</div>
	);
}
