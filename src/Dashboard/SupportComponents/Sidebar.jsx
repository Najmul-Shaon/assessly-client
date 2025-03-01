import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`bg-gray-500 text-white min-h-screen p-5 fixed md:static top-0 left-0 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-64 md:w-64"
      } ${isSidebarOpen ? "block" : "hidden md:block"}`}
    >
      {/* Mobile Sidebar Toggle */}
      <button onClick={toggleSidebar} className="mb-4 md:hidden">
        <FaBars className="text-xl" />
      </button>

      <nav className="flex flex-col gap-2">
        {[
          { path: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
          { path: "/users", icon: <FaUsers />, label: "Users" },
          { path: "/exams", icon: <FaClipboardList />, label: "Exams" },
          { path: "/settings", icon: <FaCog />, label: "Settings" },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={toggleSidebar} // Auto-close on mobile
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
