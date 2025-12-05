import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginRequest } from "../api/authApi";
import { Link } from "react-router-dom"; // Import Link untuk menambahkan tautan

export default function Login({ onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setError("Email dan password wajib diisi");

			return;
		}

		try {
			//panggil API login dari file lain
			const data = await loginRequest(email, password);

			// ambil token dan user
			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

			onLogin();
		} catch (err) {
			setError("Email atau password salah");
		}
	};

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-white p-6">
				<div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
					<h1 className="text-3xl font-bold text-slate-800 text-center mb-3">LearnSmart</h1>

					<p className="text-center text-slate-500 mb-6">Login to access your dashboard</p>

					{error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

					<form onSubmit={handleLogin} className="space-y-6">
						{/* Email */}
						<div>
							<label className="block text-slate-700 mb-1 font-medium">Email</label>
							<input
								type="email"
								className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 placeholder-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-400 outline-none"
								placeholder="Enter your email..."
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						{/* Password */}
						<div>
							<label className="block text-slate-700 mb-1 font-medium">Password</label>

							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									className="w-full px-4 py-3 pr-12 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 placeholder-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-400 outline-none"
									placeholder="Enter your password..."
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>

								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>

							<p className="text-right mt-2">
								<span className="text-slate-700 text-sm hover:underline cursor-pointer">
									Forgot Password?
								</span>
							</p>
						</div>

						<button
							type="submit"
							className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 active:scale-95 transition"
						>
							Login
						</button>
					</form>

					<p className="text-center text-slate-600 text-sm mt-6">
						Don’t have an account?{" "}
						<span className="text-slate-800 underline cursor-pointer hover:text-slate-900 transition">
							Register
						</span>
					</p>
				</div>
			</div>
		</>
	);
}
