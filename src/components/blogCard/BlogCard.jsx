import { CiCalendarDate } from "react-icons/ci";
import { FaArrowRight, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-primaryColor/10 shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:scale-101 hover:shadow-2xl flex flex-col">
      <img
        className="w-full h-48 object-cover"
        src={blog?.thumbnail}
        alt="Course"
      />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex gap-2 mb-2">
          <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-md">
            {blog?.topic}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{blog?.title}</h3>
        </div>
        <div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center text-textColor text-sm">
              <p className="flex items-center gap-1 text-base">
                <CiCalendarDate></CiCalendarDate>{" "}
                {new Date(blog?.createdDate).toLocaleDateString()}
              </p>
            </div>

            <div className="text-md text-textColor flex items-center">
              <p className="flex items-center gap-1 text-base">
                <FaPen></FaPen> {blog?.createdAuthor}
              </p>
            </div>
          </div>

          {/* done: make exam id dynamic  */}
          <Link to={`/blog/details/${blog?.blogId}`}>
            <button className="btn primary-btn my-4">
              <span>Read Now</span> <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
