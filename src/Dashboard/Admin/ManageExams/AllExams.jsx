import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosSecure from "../../../Hooks/axiosSecure";

const AllExams = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allExams = [] } = useQuery({
    queryKey: ["allExams"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/all-exams");
      return res.data;
    },
  });

  console.log(allExams);

  return (
    <div>
      <SectionTitle header={"All Exams"} />

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
                <td>
                  <span className="text-accentColor me-1">Delete</span>||
                  <span className="text-primaryColor ms-1">edit</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExams;
