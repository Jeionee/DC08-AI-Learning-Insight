import React from "react";

export default function Profile({ user }) {
  return (
    <div className="p-8">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-md border p-8 flex items-center space-x-8">

        {/* AVATAR */}
        <div className="w-32 h-32 rounded-full bg-slate-700 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
          {user?.name?.charAt(0) || "U"}
        </div>

        {/* INFO */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
          <p className="text-gray-600 mt-1">Student at LeanSmart Academy</p>

          <div className="mt-4 flex items-center space-x-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Bergabung Sejak 2024
            </span>
          </div>
        </div>
      </div>

      {/* BIO SECTION */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Learning Style */}
        <div className="bg-white border shadow-sm p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Learning Style
          </h3>
          <p className="text-gray-600 mb-4">
            Kamu belajar dengan pendekatan:
          </p>

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

        {/* Other Details */}
        <div className="bg-white border shadow-sm p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Detail Informasi
          </h3>

          <ul className="text-gray-700 space-y-2">
            <li>
              <strong className="text-gray-900">Email:</strong>{" "}
              johnsmith@example.com
            </li>
            <li>
              <strong className="text-gray-900">Program:</strong>{" "}
              Front-End Learning Path
            </li>
            <li>
              <strong className="text-gray-900">Level:</strong> Intermediate
            </li>
          </ul>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="mt-8">
        <button className="px-6 py-3 bg-slate-600 hover:bg-slate-400 transition rounded-xl text-white font-semibold shadow">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
