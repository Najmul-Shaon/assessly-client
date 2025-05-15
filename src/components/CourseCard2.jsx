import React from "react";

const CourseCard2 = () => {
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Course Image */}
      <img
        src="https://i.ibb.co.com/jPHnqkJ9/course-4.jpg" // Replace with the correct image path
        alt="Web Development Full Course"
        className="w-full"
      />

      {/* Course Content */}
      <div className="p-4 space-y-2">
        {/* Author */}
        <p className="text-gray-500 text-sm">by Determined-Poitras</p>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          Create an LMS Website with LearnPress
        </h2>

        {/* Meta Info */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>2 Weeks</span>
          <span>156 Students</span>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm">
            <span className="line-through text-gray-400 mr-2">$29.0</span>
            <span className="text-green-600 font-medium">Free</span>
          </p>
          <button className="text-blue-600 text-sm font-semibold hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard2;
