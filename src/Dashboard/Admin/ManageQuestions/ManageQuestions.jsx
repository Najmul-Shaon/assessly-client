import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBinOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ManageQuestions = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allExams = [] } = useQuery({
    queryKey: ["allExams"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/all-exams");
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Assessley | Questions</title>
      </Helmet>
      <SectionTitle header={"Manage Question"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Exam Id</th>
              <th>Title</th>
              <th>Total Question</th>
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
                <td>{singleExam?.questions?.length}</td>
                <td>{singleExam?.examType}</td>
                <td>{singleExam?.totalMarks}</td>
                <td>{singleExam?.createdBy}</td>
                <td className="flex items-center gap-2 text-xl">
                  <span className="text-accentColor">
                    <IoTrashBinOutline />
                  </span>
                  <Link
                    to={`/dashboard/manage-questions/edit/${singleExam?.examId}`}
                  >
                    <span className="text-primaryColor">
                      <FaRegEdit />{" "}
                    </span>
                  </Link>{" "}
                  <Link
                    to={`/dashboard/manage-questions/details/${singleExam?.examId}`}
                  >
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

export default ManageQuestions;
