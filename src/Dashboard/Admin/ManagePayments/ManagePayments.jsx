import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ManagePayments = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allPayments = [] } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/all-payment");
      return res.data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>Assessley | Manage Payments</title>
      </Helmet>
      <SectionTitle header={"Payment History"} />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Pay by</th>
              <th>Email</th>
              <th>Pay at</th>
              <th>trxId</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment, i) => (
              <tr key={payment?._id}>
                <th>{i + 1}</th>
                <td>{payment?.userName}</td>
                <td>{payment?.userEmail}</td>
                <td>{new Date(payment?.paymentAt).toLocaleDateString()}</td>
                <td>{payment?.trxId}</td>
                <td>{payment?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayments;
