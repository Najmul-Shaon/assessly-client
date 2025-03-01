import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";
import useAdmin from "../../Hooks/useAdmin";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { isAdmin } = useAdmin();

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
        {/* {[
          {
            path: "/dashboard",
            icon: <IoStatsChartOutline />,
            label: "Dashboard",
          },
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
        ))} */}
        {isAdmin && (
          <>
            <NavLink
              to="admin-home"
              onClick={toggleSidebar} // Auto-close on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive ? " text-accentColor" : "hover:text-accentColor"
                }`
              }
            >
              <span>
                <IoStatsChartOutline />
              </span>
              Dashboard
            </NavLink>
            <NavLink
              to="manage-exams"
              onClick={toggleSidebar} // Auto-close on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive ? " text-accentColor" : "hover:text-accentColor"
                }`
              }
            >
              <span>
                <IoStatsChartOutline />
              </span>
              Manage Exam
            </NavLink>
            <NavLink
              to="manage-users"
              onClick={toggleSidebar} // Auto-close on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive ? " text-accentColor" : "hover:text-accentColor"
                }`
              }
            >
              <span>
                <IoStatsChartOutline />
              </span>
              Manage User
            </NavLink>
            <NavLink
              to="manage-questions"
              onClick={toggleSidebar} // Auto-close on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive ? " text-accentColor" : "hover:text-accentColor"
                }`
              }
            >
              <span>
                <IoStatsChartOutline />
              </span>
              Manage Question
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
