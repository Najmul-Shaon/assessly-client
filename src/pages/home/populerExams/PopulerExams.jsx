import { Link } from "react-router-dom";
import ExamCard from "../../../components/examCard/ExamCard";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { FaArrowRight } from "react-icons/fa";

const PopulerExams = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-24 px-4">
      <SectionTitle
        header={"Populer Exams"}
        subHeader={"Top Exams That Shape Your Future"}
      ></SectionTitle>
      <div
        // data-aos="zoom-out-up"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {/* todo: make render exam card data from db  */}
        <ExamCard></ExamCard>
        <ExamCard></ExamCard>
        <ExamCard></ExamCard>
        <ExamCard></ExamCard>
        <ExamCard></ExamCard>
        <ExamCard></ExamCard>
      </div>
      <div className="flex items-center justify-center my-10">
        <Link to="/exams">
          <button className="btn primary-btn shadow-lg border-none shadow-primaryColor/60">
            <span>View All</span> <FaArrowRight></FaArrowRight>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopulerExams;
