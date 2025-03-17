import { NavLink } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { IoStatsChartOutline } from "react-icons/io5";
import { LiaClipboardSolid } from "react-icons/lia";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbCalendarQuestion } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";

const AdminMenu = ({
  toggleSidebar,
  setIsManageExamExpand,
  isManageExamExpand,
  setIsManageBlogExpand,
  isManageBlogExpand,
}) => {
  const { isAdmin } = useAdmin();
  return (
    <>
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
    </>
  );
};

export default AdminMenu;
