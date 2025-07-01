// import { FaArrowRight } from "react-icons/fa";
// import { FaBangladeshiTakaSign } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const CourseCard = ({ course }) => {
//   return (
//     <div className="bg-primaryColor/10 rounded-xl overflow-hidden border border-gray-200 hover:scale-101 shadow-lg hover:shadow-lg hover:shadow-primaryColor/40 flex flex-col">
//       <Link to={`/exam/details/1`}>
//         <img
//           className="w-full h-48 object-cover"
//           src={course?.thumbnail}
//           alt="Course"
//         />
//       </Link>
//       <div className="p-4 flex flex-col flex-1">
//         <div className="flex gap-2 mb-2">
//           <span className="bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-md">
//             {course?.subjects}
//           </span>
//         </div>
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-800">
//             {course?.title}
//           </h3>
//         </div>

//         <div className="flex justify-between items-center">
//           <div>
//             {/* done: make exam id dynamic  */}
//             <Link to={`/course/details/${course?.courseId}`}>
//               <button className="btn primary-btn my-4">
//                 <span>View Details</span>
//                 <FaArrowRight />
//               </button>
//             </Link>
//           </div>
//           <div className="text-xl font-bold text-accentColor flex items-center">
//             <span>
//               <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
//             </span>
//             {course?.fee}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
import { FaArrowRight } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PremiumCourseCard = ({ course }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative">
        <img
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          src={course?.thumbnail}
          alt={course?.title}
        />

        {/* Price Badge top-right */}
        <div className="absolute top-4 right-4 bg-primaryColor text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <FaBangladeshiTakaSign className="inline" />
          <span>{course?.fee}</span>
        </div>

        {/* Subject Badge top-left */}
        {course?.subjects && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-primaryColor to-accentColor text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {course.subjects}
          </span>
        )}

        {/* View Details Button on hover, centered with your original style */}
        <Link to={`/course/details/${course?.courseId}`}>
          <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <span className="btn primary-btn inline-flex items-center gap-2 bg-primaryColor hover:bg-primaryColor/90 text-white font-semibold px-4 py-2 rounded-full shadow hover:shadow-md">
              View Details <FaArrowRight />
            </span>
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {course?.title}
        </h3>
        <p className="text-gray-600 text-sm flex-1 text-justify">
          {course?.description?.slice(0, 100) ||
            "Learn from the best instructors!"}
          ...
        </p>
      </div>
    </div>
  );
};

export default PremiumCourseCard;
