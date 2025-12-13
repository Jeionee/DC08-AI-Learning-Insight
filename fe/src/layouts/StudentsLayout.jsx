import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StudentsLayout({ onLogout }) {
  const location = useLocation(); // Mendapatkan lokasi saat ini

  // Cek apakah kita berada di halaman ModuleDetail
  const isModuleDetail = location.pathname.includes("/module/");

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar hanya ditampilkan jika bukan di halaman ModuleDetail */}
      {!isModuleDetail && <Navbar onLogout={onLogout} />}

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-100 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
