import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import whyImg from "../../../assets/choose-thumb-1.png";
import { Link } from "react-router-dom";
const WhyUs = () => {
  return (
    <div className=" mt-24 bg-secondary_color py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <SectionTitle
          header={"why Assessly"}
          subHeader={"Effortless Online Exams, Accurate Results"}
        ></SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* list section  */}
          <div className="flex flex-col justify-center order-2 md:order-none">
            <ul className="mt-6 flex flex-col gap-2 text-lg space-y-1.5">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Seamless Exam Experience</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Instant Results & Performance Insights</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Accessible on Any Device</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Flexible & Convenient</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Variety of Question Formats</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 me-2 inline-block text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Personalized Learning Insights</span>
              </li>
            </ul>
            {/* action section  */}
            <div className="mt-4">
              <Link>
                <button className="btn primary-btn">Take Challange Now</button>
              </Link>
            </div>
          </div>
          {/* image section  */}
          <div className="order-1 md:order-none">
            <img src={whyImg} alt="why choose us image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
