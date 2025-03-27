import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: paymentHistory = [], refetch } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/history/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  //
  return (
    <div>
      <SectionTitle header={"My Payments"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Trx Id</th>
              <th>Pay for</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Pay at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((singlePayment, i) => (
              <tr key={singlePayment?._id}>
                <th>{i + 1}</th>
                <td>{singlePayment?.trxId}</td>
                <td>{singlePayment?.type}</td>
                <td>{singlePayment?.amount}</td>
                <td>{singlePayment?.status}</td>

                <td>
                  {new Date(singlePayment?.paymentAt).toLocaleDateString()}
                </td>
                <td className="flex items-center gap-1 text-xl">
                  <Link to={`/blog/details/${singlePayment?.blogId}`}>
                    <button className="btn-md btn-link text-accentColor cursor-pointer">
                      Read
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paymentHistory.length <= 0 && (
          <>
            <h3 className="text-center my-4">
              There are no payment history. Please purchase exam/course first.
              <Link to={"/courses"} className="text-accentColor underline ms-2">
                <span>Courses</span>
              </Link>{" "}
              ||{" "}
              <Link to={"/exams"} className="text-accentColor underline ms-2">
                <span>Exams</span>
              </Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
