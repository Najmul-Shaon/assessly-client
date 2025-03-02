import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";

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
                <td>
                  <span className="text-accentColor me-1">Delete</span>||
                  <Link
                    to={`/dashboard/manage-questions/edit/${singleExam?.examId}`}
                  >
                    <span className="text-primaryColor ms-1">edit</span>
                  </Link>{" "}
                  ||
                  <Link
                    to={`/dashboard/manage-questions/details/${singleExam?.examId}`}
                  >
                    <span className="text-primaryColor ms-1">View</span>
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
