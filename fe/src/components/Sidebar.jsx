import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GiProgression } from "react-icons/gi";
import { PiListChecksBold } from "react-icons/pi";
import { FaTrophy } from "react-icons/fa";

export default function Sidebar({ open }) {
  return (
    <div
      className={`
        fixed top-16 left-0 
        h-[calc(100vh-4rem)]
        bg-gradient-to-b from-[#2C3E50] to-[#34495E]
        text-white shadow-lg
        transition-all duration-300
        ${open ? "w-64" : "w-0"}
        overflow-hidden
        z-30
      `}
    >
      <nav className="p-4 mt-2">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-[#1F2A38] transition"
            >
              <IoHomeOutline size={22} className="mr-3" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/progress"
              className="flex items-center p-3 rounded-lg hover:bg-[#1F2A38] transition"
            >
              <GiProgression size={22} className="mr-3" />
              Progress
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
