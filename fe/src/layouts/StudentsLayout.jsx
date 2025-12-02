import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function StudentsLayout({ student }) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="w-full min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar
        toggleSidebar={() => setOpenSidebar(!openSidebar)}
        student={student}
      />

      {/* WRAPPER */}
      <div className="flex flex-1 pt-16">

        {/* SIDEBAR */}
        <Sidebar open={openSidebar} />

        {/* MAIN CONTENT */}
        <main
          className={`flex-1 p-8 bg-gray-50 transition-all duration-300
            ${openSidebar ? "ml-64" : "ml-0"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
