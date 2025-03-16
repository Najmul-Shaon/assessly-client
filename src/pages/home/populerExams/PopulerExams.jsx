import { Link } from "react-router-dom";
import ExamCard from "../../../components/examCard/ExamCard";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const PopulerExams = () => {
  const axiosPublic = useAxiosPublic();
  const { data: populerExams = [] } = useQuery({
    queryKey: ["populerExams"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get/all-exams?type=limit");
      return res.data;
    },
  });

  // console.log(populerExams);
  return (
    <div className="max-w-screen-2xl mx-auto mt-24 px-4">
      <SectionTitle
        header={"Populer Exams"}
        subHeader={"Top Exams That Shape Your Future"}
      ></SectionTitle>
      <div
        // data-aos="zoom-out-up"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
      >
        {populerExams.map((exam) => (
          <ExamCard key={exam?.examId} exam={exam}></ExamCard>
        ))}
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
