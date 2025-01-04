import React from "react";
import { NavLink } from "react-router-dom";
import { FaCloudSun, FaNewspaper, FaDollarSign, FaFilm } from "react-icons/fa"; 

const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen shadow-xl">
      <h2 className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        Dashboard
      </h2>
      <nav className="mt-6">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="/weather"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-6 rounded-lg transition-all ${
                  isActive ? "bg-purple-700 shadow-lg" : "hover:bg-gray-700"
                }`
              }
            >
              <FaCloudSun size={24} />
              <span>Weather</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-6 rounded-lg transition-all ${
                  isActive ? "bg-purple-700 shadow-lg" : "hover:bg-gray-700"
                }`
              }
            >
              <FaNewspaper size={24} />
              <span>News</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/finance"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-6 rounded-lg transition-all ${
                  isActive ? "bg-purple-700 shadow-lg" : "hover:bg-gray-700"
                }`
              }
            >
              <FaDollarSign size={24} />
              <span>Finance</span>
            </NavLink>
          </li>
          {/* Add Movies Link */}
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-6 rounded-lg transition-all ${
                  isActive ? "bg-purple-700 shadow-lg" : "hover:bg-gray-700"
                }`
              }
            >
              <FaFilm size={24} /> 
              <span>Movies</span> 
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
