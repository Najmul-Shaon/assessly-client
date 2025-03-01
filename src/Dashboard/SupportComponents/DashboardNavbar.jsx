import { FaBars } from "react-icons/fa";

const DashboardNavbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Sidebar Toggle for Mobile */}
      <button className="md:hidden" onClick={toggleSidebar}>
        <FaBars className="text-2xl" />
      </button>

      <h1 className="text-xl font-bold">Assessly Admin</h1>

      <div className="flex items-center gap-4">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
