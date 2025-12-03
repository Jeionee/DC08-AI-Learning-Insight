import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [password, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      setError("Password must be filled");
      return;
    }

    if (!password !== renewPassword) {
      setError("Passwords do not match");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-3">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Put your renewed password request here
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {message && (
          <p className="text-green-500 text-sm text-center mb-3">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Re-new Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Re-new Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 placeholder-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-400 outline-none"
              placeholder="Put your new password here"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Re-new Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Confirm Re-new Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 placeholder-slate-400 focus:border-slate-700 focus:ring-2 focus:ring-slate-400 outline-none"
              placeholder="Confirm your new password here"
              value={renewPassword}
              onChange={(e) => setRenewPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 active:scale-95 transition"
          >
            Submit New Password
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Remember password?{" "}
            <a
              href="/login"
              className="text-slate-800 underline cursor-pointer hover:text-slate-900 transition"
            >
              Back to Login Page
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
