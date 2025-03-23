import StatChart from "../../SupportComponents/StatChart";
import StatusCard from "../../SupportComponents/StatusCard";
import Table from "../../SupportComponents/Table";

const RegularUserHome = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard title="My Course" value="0" />
        <StatusCard title="My Exam" value="0" />
        <StatusCard title="Blog Read" value="0" />
      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Growth (Exam)</h2>
        <StatChart />
      </div>

      {/* Table */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Recent Purchase</h2>
        <Table />
      </div>
    </div>
  );
};

export default RegularUserHome;
