import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";

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
  }, [refetch]);

  //
  return (
    <div>
      <SectionTitle header={"My Courses"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Trx Id</th>
              <th>Title</th>
              <th>Class</th>
              <th>Topic</th>
              <th>Include Exam</th>
              <th>Fee</th>
              <th>Pay Time</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCourse.map((singleCourse, i) => (
              <tr key={singleCourse?._id}>
                <th>{i + 1}</th>
                <td>{singleCourse?.trxId}</td>
                <td>{singleCourse?.title}</td>
                <td>{singleCourse?.class || "N/A"}</td>
                <td>{singleCourse?.subject}</td>
                <td>{singleCourse?.hasExam ? "Yes" : "No"}</td>
                <td>{singleCourse?.fee}</td>

                <td>
                  {new Date(singleCourse?.paymentAt).toLocaleDateString()}
                </td>
                <td>{singleCourse?.duration || "N/A"}</td>
                <td className="flex items-center gap-1 text-xl">
                  <Link>
                    <button className="btn-md btn-link text-accentColor cursor-pointer">
                      Start
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myCourse.length <= 0 && (
          <>
            <h3 className="text-center my-4">
              There are no exam. Please enroll first.
              <Link to={"/courses"} className="text-accentColor underline ms-2">
                <span>Exams</span>
              </Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
