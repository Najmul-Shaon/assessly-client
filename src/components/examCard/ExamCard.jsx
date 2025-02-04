import { FaUsers } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ExamCard = () => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:scale-101 hover:shadow-2xl">
      <img
        className="w-full h-48 object-cover"
        src="https://images.pexels.com/photos/4492137/pexels-photo-4492137.jpeg"
        alt="Course"
      />
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
          <div className="flex items-center text-red-500 text-sm">
            <span className="flex ml-1 text-primary_color">★★★☆☆</span>
            <span className="text-text_color ml-1">(125)</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers />
            <span>139</span>
          </div>
          <div className="text-xl font-bold text-accent_color flex items-center">
            <span>
              <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
            </span>
            19.99
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* todo: make exam id dynamic  */}
          <Link to={`/exam/details/1`}>
            <button className="btn secondary-btn my-4 w-full text-lg">
              Details
            </button>
          </Link>
          {/* todo: make exam id dynamic  */}
          <Link to={`/exam/purchase/1`}>
            <button className="btn primary-btn my-4 w-full text-lg">
              Take Challange
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
