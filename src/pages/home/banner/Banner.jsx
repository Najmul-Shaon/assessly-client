import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Typewriter from "react-ts-typewriter";
import bannerImg from "../../../assets/banner_gif.gif";

const Banner = () => {
  return (
    // <div className="grid grid-cols-2 bg-secondaryColor">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* banner context section  */}
      <div className="flex flex-col items-center text-center p-10 order-2 md:order-none">
        <p className="text-textColor text-lg">Assess with Confidence.</p>
        <h1 className="text-2xl lg:text-3xl font-bold text-textColor mt-2 relative">
          The Online Exam Management System
        </h1>

        <div className="relative inline-block mt-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-textColor">
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

      {/* bannder image section  */}
      <figure className="order-1 md:order-none">
        <img src={bannerImg} alt="banner image" />
      </figure>
    </div>
  );
};

export default Banner;
