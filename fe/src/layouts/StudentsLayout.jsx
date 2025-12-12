import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StudentsLayout({ onLogout }) {
  const location = useLocation();

  // Navbar hanya muncul di dashboard dan profile
  const showNavbar =
    location.pathname === "/dashboard" || location.pathname === "/profile";

  return (
    <div className="w-full min-h-screen flex flex-col">
      {showNavbar && <Navbar onLogout={onLogout} />}

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-100 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
