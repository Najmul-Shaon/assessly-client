import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";
import MyCoursesRow from "./MyCoursesRow";

const MyCourses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myCourse = [], refetch } = useQuery({
    queryKey: ["myCourse", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/courses/${user?.email}`);
      return res.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [refetch, myCourse]);

  return (
    <div>
      <SectionTitle header={"My Courses"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Title</th>
              <th>Class</th>
              <th>Topic</th>
              <th>Include Exam</th>
              <th>Fee</th>
              <th>Enrolled at</th>
              <th>Duration</th>
              <th>Course Status</th>
              <th>Exam Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCourse.map((singleCourse, i) => (
              <MyCoursesRow
                key={singleCourse?._id}
                singleCourse={singleCourse}
                i={i}
              ></MyCoursesRow>
            ))}
          </tbody>
        </table>
        {myCourse.length <= 0 && (
          <>
            <h3 className="text-center my-4">
              There are no courses. Please enroll first.
              <Link to={"/courses"} className="text-accentColor underline ms-2">
                <span>Courses</span>
              </Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
