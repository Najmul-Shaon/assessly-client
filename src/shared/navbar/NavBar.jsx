import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo v2.png";

const NavBar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:bg-hover_color hover:text-white text-text_color ${
              isActive ? "bg-primary_color text-white" : ""
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
            `hover:bg-hover_color hover:text-white text-text_color ${
              isActive ? "bg-primary_color text-white" : ""
            }`
          }
        >
          Exams
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:bg-hover_color hover:text-white text-text_color ${
              isActive ? "bg-primary_color text-white" : ""
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `hover:bg-hover_color hover:text-white text-text_color ${
              isActive ? "bg-primary_color text-white" : ""
            }`
          }
        >
          Blog
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-base-100 shadow-sm">
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
        <div>
          <Link to="/">
            <figure className="w-12">
              <img className="w-full" src={logo} alt="site logo" />
            </figure>
            <h1>Assessly</h1>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* dynamic nav list  */}
        <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn primary-btn rounded-xl">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
