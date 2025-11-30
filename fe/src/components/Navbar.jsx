import { useState } from "react";

export default function Navbar({ toggleSidebar, student }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-16 bg-white shadow fixed top-0 left-0 z-50 flex items-center px-6">
      {/* HAMBURGER BUTTON */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 text-2xl mr-4 hover:text-black transition"
      >
        ☰
      </button>

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-gray-800">LeanSmart</h1>

      {/* RIGHT PROFILE */}
      <div className="ml-auto relative">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {student?.name?.charAt(0) || "U"}
          </div>
          <span className="text-gray-700 font-medium">
            {student?.name || "User"}
          </span>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-white border rounded-xl shadow-lg z-50">
            <a
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>

            <button
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              onClick={() => console.log("Logout")}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
