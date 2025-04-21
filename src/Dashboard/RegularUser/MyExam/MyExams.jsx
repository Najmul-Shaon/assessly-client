import { useEffect } from "react";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";
import useMyExams from "../../../Hooks/useMyExams";

const MyExams = () => {
  const { myExams, refetch } = useMyExams();

  useEffect(() => {
    refetch();
  }, [refetch, myExams]);

  // check exam availability
  const getExamStatus = (startDate, endDate) => {
    const now = new Date();
    if (new Date(startDate) > now) return "Upcomming";
    if (new Date(endDate) < now) return "Expired";
    return "Ongoing";
  };

  return (
    <div>
      <SectionTitle header={"My Exams"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Title</th>
              <th>Class</th>
              <th>Topic</th>
              <th>Total Marks</th>
              <th>Type</th>
              <th>Facecam</th>
              <th>Enrolled at</th>
              <th>Availablity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myExams.map((singleExam, i) => (
              <tr key={singleExam?._id}>
                <th>{i + 1}</th>
                <td>{singleExam?.examTitle}</td>
                <td>{singleExam?.class || "N/A"}</td>
                <td>{singleExam?.examTopic}</td>
                <td>{singleExam?.examMarks}</td>
                <td>{singleExam?.examType}</td>
                <td>{singleExam?.faceCam ? "Yes" : "No"}</td>
                <td>{new Date(singleExam?.paymentAt).toLocaleDateString()}</td>

                <td>
                  {getExamStatus(singleExam?.startDate, singleExam?.endDate)}
                </td>
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
        {myExams.length <= 0 && (
          <>
            <h3 className="text-center my-4">
              There are no exam. Please enroll first.
              <Link to={"/exams"} className="text-accentColor underline ms-2">
                <span>Exams</span>
              </Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default MyExams;
