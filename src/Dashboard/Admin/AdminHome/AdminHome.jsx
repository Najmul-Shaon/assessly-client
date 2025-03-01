import StatChart from "../../SupportComponents/StatChart";
import StatusCard from "../../SupportComponents/StatusCard";
import Table from "../../SupportComponents/Table";

const AdminHome = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard title="Total Exams" value="120" />
        <StatusCard title="Active Users" value="450" />
        <StatusCard title="Pending Reviews" value="15" />
        <StatusCard title="Revenue" value="$10,500" />
      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">User Growth</h2>
        <StatChart />
      </div>

      {/* Table */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Recent Users</h2>
        <Table />
      </div>
    </>
  );
};

export default AdminHome;
