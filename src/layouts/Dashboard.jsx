import { useState } from "react";
import Sidebar from "../Dashboard/SupportComponents/Sidebar";
import DashboardNavbar from "../Dashboard/SupportComponents/DashboardNavbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Fixed) */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content (Scrollable) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardNavbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
