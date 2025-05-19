import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import StatChart from "../../SupportComponents/StatChart";
import StatusCard from "../../SupportComponents/StatusCard";
import Table from "../../SupportComponents/Table";
import useAuth from "../../../Hooks/useAuth";

const RegularUserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userDashboardStats = [] } = useQuery({
    queryKey: ["userDashboardStats", user?.email],
    enabled: !!user?.email && !!localStorage.getItem("token"),
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get/dashboard-stats/regular-user?user=${user?.email}`
      );
      return res.data;
    },
  });
  console.log(userDashboardStats);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatusCard
          title="My Course"
          value={userDashboardStats?.enrolledCoursesCount}
        />
        <StatusCard
          title="My Exam"
          value={userDashboardStats?.enrolledExamsCount}
        />
        <StatusCard
          title="Blog Read"
          value={userDashboardStats?.readBlogCount}
        />
        <StatusCard
          title="Total Paid"
          value={userDashboardStats?.totalPaidAmount}
        />
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
