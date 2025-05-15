import { useEffect } from "react";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link, useNavigate } from "react-router-dom";
import useMyExams from "../../../Hooks/useMyExams";
import Swal from "sweetalert2";

const MyExams = () => {
  const { myExams, refetch } = useMyExams();

  useEffect(() => {
    refetch();
  }, [refetch, myExams]);
  const navigate = useNavigate();

  // check exam availability
  const getExamStatus = (startDate, endDate) => {
    const now = new Date();
    if (new Date(startDate) > now) return "Upcomming";
    if (new Date(endDate) < now) return "Expired";
    return "Ongoing";
  };

  const showExamRules = async (id) => {
    const result = await Swal.fire({
      title: "Please Read the Exam Rules",
      html: `
    <ul style="text-align: left; line-height: 1.6; list-style-type: disc; padding-left: 20px; color:#ff6f61">
        <li>Have a stable internet connection before starting.</li>
        <li>Finish the exam within the given time limit.</li>
        <li>Webcam must be on, if required.</li>
        <li>Switching tabs may auto-submit your exam.</li>
        <li>No retakes allowed once submitted.</li>
        <li>External help or AI tools are not allowed.</li>
        <li>Keep mobile phones away during the test.</li>
        <li>All answers are final after submission.</li>
        <li>Refreshing or closing the browser may auto-submit the exam.</li>
        <li>Opening new tabs will trigger warnings.</li>
        <li>3 warnings will automatically submit the exam.</li>
        <li>Timer runs even if you disconnect.</li>
        <li>Browser navigation is disabled.</li>
        <li>Some exams may require full-screen mode.</li>
    </ul>
      `,
      icon: "warning",
      confirmButtonText: "I Agree & Start",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        confirmButton: "agree-button",
        cancelButton: "cancel-button",
        // actions: "button-wrapper",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      // console.log("User agreed to the rules.");
      // startExamFunction();
      navigate(`/exam/live/${id}`);
    } else {
      console.log("User did not agree to the rules.");
    }
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
                    <button
                      onClick={() => showExamRules(singleExam?.examId)}
                      className="btn-md btn-link text-accentColor cursor-pointer"
                    >
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
