import { NavLink } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { IoStatsChartOutline } from "react-icons/io5";
import { LiaClipboardSolid } from "react-icons/lia";
import { HiOutlineDocumentReport } from "react-icons/hi";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdBookmarks,
  IoMdCard,
} from "react-icons/io";
import { TbCalendarQuestion } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";

const AdminMenu = ({
  toggleSidebar,
  setIsManageExamExpand,
  isManageExamExpand,
  setIsManageBlogExpand,
  isManageBlogExpand,
  pathname,
  setIsManageCourseExpand,
  isManageCourseExpand,
}) => {
  const { isAdmin } = useAdmin();
  return (
    <>
      {isAdmin && (
        <>
          {/* dashboard  */}
          <NavLink
            to={pathname ? "dashboard/admin-home" : "admin-home"}
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

          {/* manage exams  */}
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
            Manage Exams
            <span className="inline-flex">
              {isManageExamExpand ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </p>
          {isManageExamExpand && (
            <>
              <NavLink
                to={pathname ? "dashboard/all-exams" : "all-exams"}
                onClick={toggleSidebar} // Auto-close on mobile
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ms-8 ${
                    isActive ? " text-accentColor" : "hover:text-accentColor"
                  }`
                }
              >
                All Exams
              </NavLink>
              <NavLink
                to={pathname ? "dashboard/add-exam" : "add-exam"}
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

          {/* manage questions  */}
          <NavLink
            to={pathname ? "dashboard/manage-questions" : "manage-questions"}
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
            Manage Questions
          </NavLink>

          {/* manage courses  */}
          <p
            onClick={() => {
              setIsManageCourseExpand(!isManageCourseExpand);
            }} // Auto-close on mobile
            className="flex items-center gap-3 px-3 py-2 rounded-md transition cursor-pointer"
          >
            <span>
              <IoMdBookmarks />
            </span>
            Manage Courses
            <span className="inline-flex">
              {isManageCourseExpand ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </p>
          {isManageCourseExpand && (
            <>
              <NavLink
                to={pathname ? "dashboard/all-courses" : "all-courses"}
                onClick={toggleSidebar} // Auto-close on mobile
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ms-8 ${
                    isActive ? " text-accentColor" : "hover:text-accentColor"
                  }`
                }
              >
                All Courses
              </NavLink>
              <NavLink
                to={pathname ? "dashboard/add-course" : "add-course"}
                onClick={toggleSidebar} // Auto-close on mobile
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ms-8 ${
                    isActive ? " text-accentColor" : "hover:text-accentColor"
                  }`
                }
              >
                Add Course
              </NavLink>
            </>
          )}

          {/* manage blogs  */}
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
                to={pathname ? "dashboard/all-blog" : "all-blog"}
                onClick={toggleSidebar} // Auto-close on mobile
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ms-8 ${
                    isActive ? " text-accentColor" : "hover:text-accentColor"
                  }`
                }
              >
                All Blogs
              </NavLink>
              <NavLink
                to={pathname ? "dashboard/add-blog" : "add-blog"}
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

          {/* manage users  */}
          <NavLink
            to={pathname ? "dashboard/manage-users" : "manage-users"}
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
            Manage Users
          </NavLink>

          {/* manage payments  */}
          <NavLink
            to={pathname ? "dashboard/manage-payments" : "manage-payments"}
            onClick={toggleSidebar} // Auto-close on mobile
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            <span>
              <IoMdCard />
            </span>
            Manage Payments
          </NavLink>

          {/* Reports  */}
          <NavLink
            to={pathname ? "dashboard/reports" : "reports"}
            onClick={toggleSidebar} // Auto-close on mobile
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            <span>
              <HiOutlineDocumentReport />
            </span>
            Reports
          </NavLink>
        </>
      )}
    </>
  );
};

export default AdminMenu;
