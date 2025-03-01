import { FaAngleDown, FaBars, FaUserPlus } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { AiOutlineLogin } from "react-icons/ai";
import useLogout from "../../Hooks/useLogout";
import useAdmin from "../../Hooks/useAdmin";

const DashboardNavbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [isExpand, setIsExpand] = useState(false);
  const handleLogout = useLogout();
  const { isAdmin } = useAdmin();
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Sidebar Toggle for Mobile */}
      <button className="md:hidden" onClick={toggleSidebar}>
        <FaBars className="text-2xl" />
      </button>

      <h1 className="text-xl font-bold">
        Assessly {isAdmin ? "Admin" : "User"} || <span className="text-primaryColor">{user.displayName}</span>
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
                  <li>Home</li>
                </Link>
                <Link to="/exams">
                  <li>Exams</li>
                </Link>
                <Link to="/about">
                  <li>About</li>
                </Link>
                <Link to="/blog">
                  <li>Blog</li>
                </Link>

                {user && (
                  <li>
                    <GoSignOut onClick={handleLogout}></GoSignOut>
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
