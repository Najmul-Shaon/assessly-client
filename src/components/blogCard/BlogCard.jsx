import { CiCalendarDate } from "react-icons/ci";
import { FaPen, FaUsers } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="bg-primaryColor/10 shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:scale-101 hover:shadow-2xl">
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
          <div
            className="flex items-center gap-1"
            data-tooltip-id="totalRead"
            data-tooltip-place="top-start"
            data-tooltip-content="Total Read"
          >
            <p className="flex items-center gap-1 text-base">
              <FaUsers /> 140
            </p>
          </div>
          <div
            className="flex items-center text-textColor text-sm"
            data-tooltip-id="published"
            data-tooltip-place="top-start"
            data-tooltip-content="Published at"
          >
            <p className="flex items-center gap-1 text-base">
              <CiCalendarDate></CiCalendarDate> 17 July 2024
            </p>
          </div>

          <div
            className="text-md text-textColor flex items-center"
            data-tooltip-id="author"
            data-tooltip-place="top-end"
            data-tooltip-content="Written by"
          >
            <p className="flex items-center gap-1 text-base">
              <FaPen></FaPen> Najmul Shaon
            </p>
          </div>
        </div>

        {/* todo: make exam id dynamic  */}
        <Link to={`/exam/purchase/1`}>
          <button className="btn primary-btn my-4 w-full text-lg">
            Read Now
          </button>
        </Link>
      </div>
      <Tooltip id="totalRead" />
      <Tooltip id="published" />
      <Tooltip id="author" />
    </div>
  );
};

export default BlogCard;
