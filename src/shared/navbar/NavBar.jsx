import { Link, NavLink, useLocation } from "react-router-dom";
// import logo from "../../assets/logo v2.png";
import logo from "../../assets/logo v6.png";
import { AiOutlineLogin, AiOutlinePlus } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { GoSignOut } from "react-icons/go";
import useLogout from "../../Hooks/useLogout";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import useAdmin from "../../Hooks/useAdmin";
import useRegularUser from "../../Hooks/useRegularUser";
import RegularUserMenu from "../../Dashboard/SupportComponents/RegularUserMenu";
import AdminMenu from "../../Dashboard/SupportComponents/AdminMenu";
import useHandleEnrollGroup from "../../Hooks/useHandleEnrollGroup";

const NavBar = () => {
  const { user } = useAuth();
  const [isDashboardView, setIsDashboardView] = useState(false);
  const handleLogout = useLogout();
  const { isAdmin } = useAdmin();
  const { isRegularUser } = useRegularUser();
  const { pathname } = useLocation();
  const { hanldeGroupExamEnroll } = useHandleEnrollGroup();
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` hover:text-primaryColor text-xl font-semibold ${
              isActive ? "text-primaryColor" : "text-textColor"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/exams"
          className={({ isActive }) =>
            ` hover:text-primaryColor text-xl font-semibold ${
              isActive ? "text-primaryColor" : "text-textColor"
            }`
          }
        >
          Exams
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            ` hover:text-primaryColor text-xl font-semibold ${
              isActive ? "text-primaryColor" : "text-textColor"
            }`
          }
        >
          Courses
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            ` hover:text-primaryColor text-xl font-semibold ${
              isActive ? "text-primaryColor" : "text-textColor"
            }`
          }
        >
          Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/features"
          className={({ isActive }) =>
            ` hover:text-primaryColor text-xl font-semibold ${
              isActive ? "text-primaryColor" : "text-textColor"
            }`
          }
        >
          Features
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            ` hover:text-primaryColor text-xl font-semibold ${
              isActive ? "text-primaryColor" : "text-textColor"
            }`
          }
        >
          About
        </NavLink>
      </li>
      {/* {user && (
        <li>
          <NavLink
            to="/group-exam"
            className={({ isActive }) =>
              ` hover:text-primaryColor text-xl font-semibold ${
                isActive ? "text-primaryColor" : "text-textColor"
              }`
            }
          >
            Group Exam
          </NavLink>
        </li>
      )} */}
    </>
  );

  return (
    <nav className="bg-secondaryColor shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="navbar max-w-screen-2xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2"
            >
              {/* dynamic nav list  */}
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <div className="flex items-center flex-col">
              <figure className="w-6 md:w-8 lg:w-10">
                <img className="w-full" src={logo} alt="site logo" />
              </figure>
              <h1 className="font-bold">Assessly</h1>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* dynamic nav list  */}
          {/* <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul> */}
          <ul className="flex px-1 space-x-6">{navLinks}</ul>
        </div>
        <div className="navbar-end ">
          {user && (
            <div
              onClick={hanldeGroupExamEnroll}
              className="hover:bg-gray-200 rounded-full p-1.5 me-3"
            >
              <AiOutlinePlus className="text-2xl" />
            </div>
          )}
          <div className="flex gap-2 items-center relative">
            {user && (
              <div
                onClick={() => setIsDashboardView(!isDashboardView)}
                className="flex items-center gap-4"
              >
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <span>
                  <FaAngleDown />
                </span>
              </div>
            )}
            {user && isDashboardView && (
              <>
                {/* <div className="bg-white shadow-lg px-4 py-6 border border-textColor/40 rounded-xl shadow-primaryColor/50 absolute top-12 right-0 w-52 z-50"> */}
                <div className="bg-white text-textColor shadow-lg px-4 py-6 border border-textColor/40 rounded-xl shadow-primaryColor/50 absolute top-12 right-0 z-100 min-w-[250px]">
                  {isRegularUser && <RegularUserMenu pathname={pathname} />}
                  {isAdmin && <AdminMenu pathname={pathname} />}
                  {/* <ul>
                    <li>
                      <Link
                        to={
                          isAdmin
                            ? "/dashboard/admin-home"
                            : "/dashboard/user-home"
                        }
                        className="hover:text-primaryColor flex gap-2 items-center"
                      >
                        <IoStatsChartOutline />
                        <span>Dashboard</span>
                      </Link>
                    </li>
                  </ul> */}
                </div>
              </>
            )}
            {isDashboardView && (
              <>
                <div
                  onClick={() => setIsDashboardView(false)}
                  className="fixed inset-0 z-60"
                ></div>
              </>
            )}
            {user && (
              <GoSignOut
                className="text-2xl"
                onClick={handleLogout}
              ></GoSignOut>
            )}
            {!user && (
              <Link to="/login" className="btn btn-sm md:btn-md primary-btn">
                <AiOutlineLogin className="text-xl"></AiOutlineLogin> Login
              </Link>
            )}
            {!user && (
              <Link
                to="/register"
                className="btn btn-sm md:btn-md secondary-btn"
              >
                <FaUserPlus className="text-xl"></FaUserPlus> Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
