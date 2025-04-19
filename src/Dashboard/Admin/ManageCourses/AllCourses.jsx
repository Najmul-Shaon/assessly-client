import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const AllCourses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allCourses = [], refetch } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get-all-courses?type=all");
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const formatDate = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}h:${m}m:${parseInt(s)}s`;
  };

  return (
    <div>
      <Helmet>
        <title>Assessley | All Courses</title>
      </Helmet>
      <SectionTitle header={"All Courses"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Course Id</th>
              <th>Exam Id</th>
              <th>Title</th>
              <th>Include Exam</th>
              <th>Duration</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Fee</th>
              <th>Create by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map((singleCourse, i) => (
              <tr key={singleCourse?._id}>
                <th>{i + 1}</th>
                <td>{singleCourse?.courseId}</td>
                <td>{singleCourse?.examId || "N/A"}</td>
                <td>{singleCourse?.title}</td>
                <td>{singleCourse?.includeExam ? "Yes" : "No"}</td>
                <td>{formatDate(singleCourse?.duration)}</td>
                <td>{singleCourse?.class}</td>
                <td>{singleCourse?.subjects}</td>
                <td>{singleCourse?.fee}</td>
                <td>{singleCourse?.createdBy}</td>
                <td className="flex items-center gap-2 text-xl">
                  <span className="text-accentColor">
                    <IoTrashBinOutline />
                  </span>
              
                  <Link>
                    <span className="text-primaryColor">
                      <FaRegEdit />{" "}
                    </span>
                  </Link>{" "}
                 
                  <Link>
                    <span className="text-primaryColor">
                      <IoEyeOutline />
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourses;
