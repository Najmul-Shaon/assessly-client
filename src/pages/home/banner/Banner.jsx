import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Typewriter from "react-ts-typewriter";

const Banner = () => {
  return (
    <div className="flex flex-col items-center text-center p-10 bg-secondaryColor">
      <p className="text-textColor text-lg">Assess with Confidence.</p>
      <h1 className="text-2xl lg:text-4xl font-bold text-textColor mt-2 relative">
        The Online Exam Management System
      </h1>

      <div className="relative inline-block mt-2">
        <h2 className="text-2xl lg:text-4xl font-bold text-textColor">
          Conduct Secure Online Exams
        </h2>
        <svg
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48"
          viewBox="0 0 200 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 15C30 5, 80 25, 195 10"
            stroke="#008080"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="text-textColor text-lg mt-4">
        <span>
          <Typewriter
            text={["Smart", "Secure", "Hassle-Free"]}
            loop={true}
            speed={300}
          />
        </span>
        Online Exams for Students Everywhere
      </p>

      <Link to="/exams">
        <button className="mt-6 btn btn-lg primary-btn">
          <span>Take Challange Now</span> <FaArrowRight />
        </button>
      </Link>
    </div>
  );
};

export default Banner;
