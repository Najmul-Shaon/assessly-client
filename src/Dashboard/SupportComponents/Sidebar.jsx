import { NavLink } from "react-router-dom";
import { FaBars, FaUsersCog } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";
import { LiaClipboardSolid } from "react-icons/lia";
import { TbCalendarQuestion } from "react-icons/tb";
import useAdmin from "../../Hooks/useAdmin";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { RiArticleLine } from "react-icons/ri";
import useRegularUser from "../../Hooks/useRegularUser";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { isAdmin } = useAdmin();
  const { isRegular } = useRegularUser();
  console.log(isRegular);

  const [isManageExamExpand, setIsManageExamExpand] = useState(false);
  const [isManageBlogExpand, setIsManageBlogExpand] = useState(false);

  return (
    <div
      className={`bg-gray-500 text-white min-h-screen p-5 fixed md:static top-0 left-0 transition-all duration-300 z-110 ${
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
              onClick={toggleSidebar}
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
            <p
              //   to="all-exams"
              onClick={() => {
                setIsManageExamExpand(!isManageExamExpand);
              }} // Auto-close on mobile
              className="flex items-center gap-3 px-3 py-2 rounded-md transition cursor-pointer"
            >
              <span>
                <LiaClipboardSolid />
              </span>
              Manage Exam
              <span className="inline-flex">
                {isManageExamExpand ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </p>
            {isManageExamExpand && (
              <>
                <NavLink
                  to="all-exams"
                  onClick={toggleSidebar} // Auto-close on mobile
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition ms-8 ${
                      isActive ? " text-accentColor" : "hover:text-accentColor"
                    }`
                  }
                >
                  All Exam
                </NavLink>
                <NavLink
                  to="add-exam"
                  onClick={toggleSidebar} // Auto-close on mobile
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition ms-8 ${
                      isActive ? " text-accentColor" : "hover:text-accentColor"
                    }`
                  }
                >
                  Add Exam
                </NavLink>
              </>
            )}
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
                <TbCalendarQuestion />
              </span>
              Manage Question
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
                <FaUsersCog />
              </span>
              Manage User
            </NavLink>
            <p
              //   to="all-exams"
              onClick={() => {
                setIsManageBlogExpand(!isManageBlogExpand);
              }} // Auto-close on mobile
              className="flex items-center gap-3 px-3 py-2 rounded-md transition cursor-pointer"
            >
              <span>
                <RiArticleLine />
              </span>
              Manage Blogs
              <span className="inline-flex">
                {isManageBlogExpand ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </p>
            {isManageBlogExpand && (
              <>
                <NavLink
                  to="all-blog"
                  onClick={toggleSidebar} // Auto-close on mobile
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition ms-8 ${
                      isActive ? " text-accentColor" : "hover:text-accentColor"
                    }`
                  }
                >
                  All Blog
                </NavLink>
                <NavLink
                  to="add-blog"
                  onClick={toggleSidebar} // Auto-close on mobile
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition ms-8 ${
                      isActive ? " text-accentColor" : "hover:text-accentColor"
                    }`
                  }
                >
                  Add Blog
                </NavLink>
              </>
            )}
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
