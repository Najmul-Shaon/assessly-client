import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import useAdmin from "../../Hooks/useAdmin";
import useRegularUser from "../../Hooks/useRegularUser";

const PaymentSuccess = () => {
  const { isAdmin } = useAdmin();
  const { isRegularUser } = useRegularUser();

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 mt-20">
      <div className="bg-secondaryColor shadow-lg rounded-2xl p-8 text-center max-w-md">
        <FaCircleCheck className="text-primaryColor w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">
          Your transaction was completed successfully.
        </p>

        <div className="mt-6 flex items-center justify-center gap-6">
          <Link
            to={
              (isAdmin && "/dashboard/admin-home") ||
              (isRegularUser && "/dashboard/user-home")
            }
          >
            <button className="px-6 py-2 bg-primaryColor text-white font-semibold rounded-lg shadow-md transition cursor-pointer">
              Go to Dashboard
            </button>
          </Link>
          <Link to={"/"}>
            <button className="btn btn-outline">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
