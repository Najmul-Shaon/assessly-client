import { FaArrowRight } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-primaryColor/10 rounded-xl overflow-hidden border border-gray-200 hover:scale-101 shadow-lg hover:shadow-lg hover:shadow-primaryColor/40 flex flex-col">
      <Link to={`/exam/details/1`}>
        <img
          className="w-full h-48 object-cover"
          src={course?.thumbnail}
          alt="Course"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex gap-2 mb-2">
          <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-md">
            {course?.subjects}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {course?.title}
          </h3>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {/* done: make exam id dynamic  */}
            <Link to={`/exam/details/${course?.courseId}`}>
              <button className="btn primary-btn my-4">
                <span>View Details</span>
                <FaArrowRight />
              </button>
            </Link>
          </div>
          <div className="text-xl font-bold text-accentColor flex items-center">
            <span>
              <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
            </span>
            {course?.fee}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
