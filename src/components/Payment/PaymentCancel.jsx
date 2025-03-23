import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 mt-20">
      <div className="bg-secondaryColor shadow-lg rounded-2xl p-8 text-center max-w-md">
        <ImCross className="text-accentColor w-16 h-16 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Payment Cancelled!</h2>
        <p className="text-gray-600 mt-2">
          Your transaction has been cancelled by user.
        </p>

        <div className="mt-6">
          <Link to={"/"}>
            <button className="btn btn-outline">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
