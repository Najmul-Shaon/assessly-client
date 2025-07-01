// import { CiCalendarDate } from "react-icons/ci";
// import { FaArrowRight, FaPen } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const BlogCard = ({ blog }) => {
//   return (
//     <div className="bg-primaryColor/10 shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:scale-101 hover:shadow-2xl flex flex-col">
//       <img
//         className="w-full h-48 object-cover"
//         src={blog?.thumbnail}
//         alt="Course"
//       />
//       <div className="p-4 flex flex-col flex-1">
//         <div className="flex gap-2 mb-2">
//           <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-md">
//             {blog?.topic}
//           </span>
//         </div>
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-800">{blog?.title}</h3>
//         </div>
//         <div>
//           <div className="mt-3 flex items-center justify-between">
//             <div className="flex items-center text-textColor text-sm">
//               <p className="flex items-center gap-1 text-base">
//                 <CiCalendarDate></CiCalendarDate>{" "}
//                 {new Date(blog?.createdDate).toLocaleDateString()}
//               </p>
//             </div>

//             <div className="text-md text-textColor flex items-center">
//               <p className="flex items-center gap-1 text-base">
//                 <FaPen></FaPen> {blog?.createdAuthor}
//               </p>
//             </div>
//           </div>

//           {/* done: make exam id dynamic  */}
//           <Link to={`/blog/details/${blog?.blogId}`}>
//             <button className="btn primary-btn my-4">
//               <span>Read Now</span> <FaArrowRight />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;

// import { CiCalendarDate } from "react-icons/ci";
// import { FaArrowRight, FaPen } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const PremiumBlogCard = ({ blog }) => {
//   return (
//     <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
//       <div className="relative">
//         <img
//           className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
//           src={blog?.thumbnail}
//           alt={blog?.title}
//         />
//         {blog?.topic && (
//           <span className="absolute top-4 left-4 bg-gradient-to-r from-primaryColor to-accentColor text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//             {blog.topic}
//           </span>
//         )}
//       </div>

//       <div className="p-5 flex flex-col flex-1">
//         <h3 className="text-xl font-bold text-gray-800 mb-2">{blog?.title}</h3>

//         <p className="text-gray-600 text-sm flex-1">
//           {blog?.description?.slice(0, 100) || "Read more about this topic"}...
//         </p>

//         <div className="mt-5 flex flex-col gap-2">
//           <div className="flex items-center justify-between text-sm text-gray-500">
//             <p className="flex items-center gap-1">
//               <CiCalendarDate />{" "}
//               {new Date(blog?.createdDate).toLocaleDateString()}
//             </p>
//             <p className="flex items-center gap-1">
//               <FaPen /> {blog?.createdAuthor}
//             </p>
//           </div>

//           <Link to={`/blog/details/${blog?.blogId}`}>
//             <button className="mt-3 inline-flex items-center gap-2 bg-primaryColor hover:bg-primaryColor/90 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow hover:shadow-md cursor-pointer">
//               Read Now <FaArrowRight size={12} />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumBlogCard;

import { CiCalendarDate } from "react-icons/ci";
import { FaArrowRight, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

const PremiumBlogCard = ({ blog }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col relative">
      <div className="relative">
        <img
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          src={blog?.thumbnail}
          alt={blog?.title}
        />

        {/* Gradient Topic Badge */}
        {blog?.topic && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-primaryColor to-accentColor text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {blog.topic}
          </span>
        )}

        {/* Overlay + Center Button */}
        <Link to={`/blog/details/${blog?.blogId}`}>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-primaryColor hover:bg-primaryColor/90 text-white font-semibold px-5 py-2 rounded-full flex items-center gap-2 shadow hover:shadow-md cursor-pointer">
              Read Now <FaArrowRight size={12} />
            </span>
          </div>
        </Link>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{blog?.title}</h3>

        <p className="text-gray-600 text-sm flex-1">
          {blog?.description?.slice(0, 100) || "Read more about this topic"}...
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p className="flex items-center gap-1">
              <CiCalendarDate />{" "}
              {new Date(blog?.createdDate).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-1">
              <FaPen /> {blog?.createdAuthor}
            </p>
          </div>

          {/* <Link to={`/blog/details/${blog?.blogId}`}>
            <button className="mt-3 inline-flex items-center gap-2 bg-primaryColor hover:bg-primaryColor/90 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow hover:shadow-md cursor-pointer">
              Read Now <FaArrowRight size={12} />
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default PremiumBlogCard;
