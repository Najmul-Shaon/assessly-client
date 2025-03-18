import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

const AllCourses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allExams = [] } = useQuery({
    queryKey: ["allExams"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/all-exams?type=all");
      return res.data;
    },
  });

  console.log(allExams);

  return (
    <div>
      <SectionTitle header={"All Courses"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Exam Id</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Total Marks</th>
              <th>Create by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allExams.map((singleExam, i) => (
              <tr key={singleExam?._id}>
                <th>{i + 1}</th>
                <td>{singleExam?.examId}</td>
                <td>{singleExam?.examTitle}</td>
                <td>{singleExam?.duration} min</td>
                <td>{singleExam?.examType}</td>
                <td>{singleExam?.totalMarks}</td>
                <td>{singleExam?.createdBy}</td>
                <td className="flex items-center gap-1 text-xl">
                  <span className="text-accentColor">
                    <IoTrashBinOutline />
                  </span>
                  ||
                  <Link>
                    <span className="text-primaryColor">
                      <FaRegEdit />{" "}
                    </span>
                  </Link>{" "}
                  ||
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
