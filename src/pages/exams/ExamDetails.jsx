import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExamDetails = () => {
  return (
    <div className="mt-20 bg-secondaryColor py-8">
      <div className="min-h-screen flex flex-col items-center justify-start">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-xl p-8 mb-10">
          {/* Top section with thumbnail, key info, and enroll button */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mb-8">
            <img
              src="https://images.pexels.com/photos/4492137/pexels-photo-4492137.jpeg"
              alt="exam.title"
              className="w-32 h-32 md:w-96 md:h-48 object-cover rounded-lg shadow-lg mb-4 md:mb-0"
            />

            <div className="md:ml-6 text-center md:text-left">
              <h1 className="text-3xl font-bold text-primaryColor mb-2">
                list of essential information you might need
              </h1>
              <div className="text-footerTextColor mb-4">
                <p>
                  <strong>Category:</strong>list of essential information you
                  might need
                </p>
                <p>
                  <strong>Duration:</strong> 120 minutes
                </p>
                <p>
                  <strong>Total Marks:</strong> 100
                </p>
              </div>
              <Link to={`/exam/details/1`}>
                <button className="btn primary-btn my-4">
                  <span>Enroll Now</span>
                  <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-primaryColor mb-4">
              Description
            </h3>
            <p className="text-gray-600">
              list of essential information you might need list of essential
              information you might need list of essential information you might
              need list of essential information you might need list of
              essential information you might need list of essential information
              you might need list of essential information you might need list
              of essential information you might need list of essential
              information you might need list of essential information you might
              need
            </p>
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-primaryColor mb-4">
              Exam Details
            </h3>
            <ul className="space-y-2 text-gray-600 flex justify-evenly">
              <li>
                <strong>Start Date:</strong> {new Date().toLocaleDateString()}
              </li>
              <li>
                <strong>End Date:</strong> {new Date().toLocaleDateString()}
              </li>
              <li>
                <strong>Eligibility:</strong>
              </li>
              <li>
                <strong>Format:</strong>
              </li>
              <li>
                <strong>Instructions:</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
