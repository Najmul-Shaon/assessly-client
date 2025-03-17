import { FaAngleDown, FaBars, FaUserPlus } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoChecklist, GoSignOut } from "react-icons/go";
import { RiArticleLine } from "react-icons/ri";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineLogin } from "react-icons/ai";
import useLogout from "../../Hooks/useLogout";
import useAdmin from "../../Hooks/useAdmin";
import { IoHomeOutline } from "react-icons/io5";
import useRegularUser from "../../Hooks/useRegularUser";

const DashboardNavbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [isExpand, setIsExpand] = useState(false);
  const handleLogout = useLogout();
  const { isAdmin } = useAdmin();
  const { isRegularUser } = useRegularUser();
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Sidebar Toggle for Mobile */}
      <button className="md:hidden" onClick={toggleSidebar}>
        <FaBars className="text-2xl" />
      </button>

      <h1 className="text-md font-bold">
        Assessly {isAdmin && "Admin"}
        {isRegularUser && "User"} ||{" "}
        <span className="text-primaryColor">{user?.displayName}</span>
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <div
            onClick={() => setIsExpand(!isExpand)}
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
        {user && isExpand && (
          <>
            <div className="bg-white shadow-lg px-4 py-6 border border-textColor/40 rounded-xl shadow-primaryColor/50 absolute top-12 right-6 z-100 min-w-[100px]">
              <ul>
                <Link to="/">
                  <li
                    className="flex gap-2 items-center"
                    onClick={() => setIsExpand(false)}
                  >
                    <IoHomeOutline /> Home
                  </li>
                </Link>
                <Link to="/exams">
                  <li
                    className="flex gap-2 items-center"
                    onClick={() => setIsExpand(false)}
                  >
                    <GoChecklist /> Exams
                  </li>
                </Link>
                <Link to="/about">
                  <li
                    className="flex gap-2 items-center"
                    onClick={() => setIsExpand(false)}
                  >
                    <GrContactInfo /> About
                  </li>
                </Link>
                <Link to="/blogs">
                  <li
                    className="flex gap-2 items-center"
                    onClick={() => setIsExpand(false)}
                  >
                    <RiArticleLine />
                    Blog
                  </li>
                </Link>

                {user && (
                  <li
                    className="flex gap-2 items-center cursor-pointer"
                    // onClick={handleLogout}
                    onClick={() => {
                      setIsExpand(false);
                      handleLogout();
                    }}
                  >
                    <GoSignOut /> Log out
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
        {isExpand && (
          <>
            <div
              onClick={() => setIsExpand(false)}
              className="fixed inset-0 z-60"
            ></div>
          </>
        )}

        {!user && (
          <Link to="/login" className="btn btn-sm md:btn-md primary-btn">
            <AiOutlineLogin className="text-xl"></AiOutlineLogin> Login
          </Link>
        )}
        {!user && (
          <Link to="/register" className="btn btn-sm md:btn-md secondary-btn">
            <FaUserPlus className="text-xl"></FaUserPlus> Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
