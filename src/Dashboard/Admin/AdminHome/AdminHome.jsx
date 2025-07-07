import { Helmet } from "react-helmet-async";
import StatChart from "../../SupportComponents/StatChart";
import StatusCard from "../../SupportComponents/StatusCard";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: dahboardStatus = [] } = useQuery({
    queryKey: ["dahboardStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/dashboard-status");
      return res.data;
    },
  });

  const latestUser = dahboardStatus?.fiveUser || [];
  const latestPayment = dahboardStatus?.latestPayment || [];
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Helmet>
        <title>Assessley | Dahboard-home</title>
      </Helmet>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard title="Total Exams" value={dahboardStatus?.totalExam} />
        <StatusCard title="Active Users" value={dahboardStatus?.activeUser} />
        <StatusCard title="Total Blogs" value={dahboardStatus?.totalBlog} />
        <StatusCard
          title="Revenue"
          value={`$${dahboardStatus?.totalRevenue ?? 0}`}
        />
      </div>

      {/* Chart Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">User Growth</h2>
        <StatChart />
      </div>

      {/* recent user */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Recent Users</h2>
        {/* <Table tableData={dahboardStatus?.fiveUser} /> */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th className="p-2 text-left">Sl</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">City</th>
              </tr>
            </thead>
            <tbody>
              {latestUser.map((user, i) => (
                <tr key={user?._id}>
                  <th>{i + 1}</th>
                  <td>{user?.userEmail}</td>
                  <td>{user?.userName}</td>
                  <td>{user?.gender || "N/A"}</td>
                  <td>{user?.userRole}</td>
                  <td>{user?.city || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* recent payment */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Recent Payments</h2>
        {/* <Table tableData={dahboardStatus?.fiveUser} /> */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th className="p-2 text-left">Sl</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">TrxID</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Pay at</th>
              </tr>
            </thead>
            <tbody>
              {latestPayment.map((payment, i) => (
                <tr key={payment?._id}>
                  <th>{i + 1}</th>
                  <td>{payment?.userName}</td>
                  <td>{payment?.type || "N/A"}</td>
                  <td>{payment?.amount}</td>
                  <td>{payment?.trxId}</td>
                  <td>{payment?.status}</td>
                  <td>{new Date(payment?.paymentAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
