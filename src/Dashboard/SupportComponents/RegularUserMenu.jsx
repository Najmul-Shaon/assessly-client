import { NavLink } from "react-router-dom";
import useRegularUser from "../../Hooks/useRegularUser";
import { IoStatsChartOutline } from "react-icons/io5";
import { FaBookOpen, FaMoneyCheckAlt, FaUser } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { RiArticleLine } from "react-icons/ri";
import { PiCertificate } from "react-icons/pi";

const RegularUserMenu = ({ toggleSidebar, pathname }) => {
  const { isRegularUser } = useRegularUser();
  return (
    <>
      {isRegularUser && (
        <>
          <NavLink
            to={pathname ? "dashboard/user-home" : "user-home"}
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
          <NavLink
            to={pathname ? "dashboard/my-courses" : "my-courses"}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            <span>
              <FaBookOpen />
            </span>
            My Courses
          </NavLink>

          <NavLink
            to={pathname ? "dashboard/my-exam" : "my-exam"}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            <span>
              <GoChecklist />
            </span>
            My Exams
          </NavLink>
          <NavLink
            to={pathname ? "dashboard/my-blogs" : "my-blogs"}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            <span>
              <RiArticleLine />
            </span>
            My Read Blogs
          </NavLink>
          <NavLink
            to={pathname ? "dashboard/my-payments" : "my-payments"}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            <span>
              <FaMoneyCheckAlt />
            </span>
            Payment History
          </NavLink>
          <NavLink
            to={pathname ? "dashboard/my-profile" : "my-profile"}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            <span>
              <FaUser />
            </span>
            My Profile
          </NavLink>
          <NavLink
            to={pathname ? "dashboard/my-certificates" : "my-certificates"}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? " text-accentColor" : "hover:text-accentColor"
              }`
            }
          >
            <span>
              <PiCertificate />
            </span>
            Certificates
          </NavLink>
        </>
      )}
    </>
  );
};

export default RegularUserMenu;
