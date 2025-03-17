import { FaBars } from "react-icons/fa";
import { useState } from "react";
import AdminMenu from "./AdminMenu";
import RegularUserMenu from "./RegularUserMenu";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
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
        {/* admin menu's  */}
        <AdminMenu
          toggleSidebar={toggleSidebar}
          setIsManageExamExpand={setIsManageExamExpand}
          isManageExamExpand={isManageExamExpand}
          setIsManageBlogExpand={setIsManageBlogExpand}
          isManageBlogExpand={isManageBlogExpand}
        />

        {/* regular user menu's  */}
        <RegularUserMenu toggleSidebar={toggleSidebar} />
      </nav>
    </div>
  );
};

export default Sidebar;
