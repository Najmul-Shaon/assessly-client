import { Link } from "react-router-dom";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "../../../components/courseCard/CourseCard";

const PopulerCourses = () => {
  const axiosPublic = useAxiosPublic();
  const { data: populerCourses = [] } = useQuery({
    queryKey: ["populerCourses"],
    queryFn: async () => {
      const res = await axiosPublic.get("get-all-courses?type=limit");
      return res.data;
    },
  });


  return (
    <div className="max-w-screen-2xl mx-auto mt-24 px-4">
      <SectionTitle
        header={"Populer Courses"}
        subHeader={"Learn New Skills, Master Concepts, and Advance Your Career"}
      ></SectionTitle>
      <div
        // data-aos="zoom-out-up"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
      >
        {populerCourses.map((course) => (

          <CourseCard key={course?.courseId} course={course}></CourseCard>
        ))}
      </div>
      <div className="flex items-center justify-center my-10">
        <Link to="/courses">
          <button className="btn primary-btn shadow-lg border-none shadow-primaryColor/60">
            <span>View All Course</span> <FaArrowRight></FaArrowRight>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopulerCourses;
