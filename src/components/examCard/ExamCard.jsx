import { FaArrowRight, FaUsers } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const ExamCard = () => {
  return (
    <div className="bg-primaryColor/10 rounded-xl overflow-hidden border border-gray-200 hover:scale-101 shadow-lg hover:shadow-lg hover:shadow-primaryColor/40">
      <Link to={`/exam/details/1`}>
        <img
          className="w-full h-48 object-cover"
          src="https://images.pexels.com/photos/4492137/pexels-photo-4492137.jpeg"
          alt="Course"
        />
      </Link>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-md">
            Language
          </span>
          <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-md">
            English
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Beginner Diploma In Basic English Grammar - Better Search Rang!
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <div
            className="flex items-center gap-1"
            data-tooltip-id="takeChallange"
            data-tooltip-place="top-end"
            data-tooltip-content="Challengers"
          >
            <FaUsers />
            <span>139</span>
          </div>
          <div
            className="text-xl font-bold text-accentColor flex items-center"
            data-tooltip-id="price"
            data-tooltip-place="top-end"
            data-tooltip-content="price"
          >
            <span>
              <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
            </span>
            19.99
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4"> */}
        {/* todo: make exam id dynamic  */}
        {/* <Link to={`/exam/details/1`}>
            <button className="btn secondary-btn my-4 w-full">Details</button>
          </Link> */}
        {/* todo: make exam id dynamic  */}
        {/* <Link to={`/exam/purchase/1`}>
            <button className="btn primary-btn my-4 w-full">Enroll Now</button>
          </Link>
        </div> */}
        <div>
          {/* todo: make exam id dynamic  */}
          <Link to={`/exam/details/1`}>
            <button className="btn primary-btn my-4">
              <span>Enroll Now</span>
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
      <Tooltip id="price" />
      <Tooltip id="takeChallange" />
      <Tooltip id="reviews" />
    </div>
  );
};

export default ExamCard;
