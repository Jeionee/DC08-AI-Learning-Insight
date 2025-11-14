import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GiProgression, GiRibbonMedal } from "react-icons/gi";
import { FaTrophy } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#2C3E50] to-[#34495E] text-white shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-[#e0e4e9]">
        <h1 className="text-2xl font-bold tracking-wide">LeanSmart</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg bg-[#3B4A5A] hover:bg-[#1F2A38] transition-all duration-300 shadow-sm"
            >
              <span className="mr-3 text-white/90">
                <IoHomeOutline size={26} />
              </span>
              <span className="font-medium">Home</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-[#3B4A5A] transition-all duration-300"
            >
              <span className="mr-3 text-white/80">
                <GiProgression size={26} />
              </span>
              <span className="font-medium">Progress</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-[#3B4A5A] transition-all duration-300"
            >
              <span className="mr-3 text-white/80">
                <GiRibbonMedal size={26} />
              </span>
              <span className="font-medium">Recommendation</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-[#3B4A5A] transition-all duration-300"
            >
              <span className="mr-3 text-white/80">
                <FaTrophy size={26} />
              </span>
              <span className="font-medium">Challenges</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
