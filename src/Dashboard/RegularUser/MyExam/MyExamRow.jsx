import { useNavigate } from "react-router-dom";
import useIsExamSubmitted from "../../../Hooks/useIsExamSubmitted";
import Swal from "sweetalert2";

const MyExamRow = ({ exam, index }) => {
  const navigate = useNavigate();
  const { isSubmitted } = useIsExamSubmitted(exam?.examId);

  const getExamStatus = (startDate, endDate) => {
    const now = new Date();
    if (new Date(startDate) > now) {
      return "Upcomming";
    }
    if (new Date(endDate) < now) {
      return "Expired";
    }
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
    });

    if (result.isConfirmed) {
      navigate(`/exam/live/${id}`);
    }
  };

  //   console.log(exam?.paymentAt);
  //   console.log(exam);

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{exam?.examTitle}</td>
      <td>{exam?.class || "N/A"}</td>
      <td>{exam?.examTopic}</td>
      <td>{exam?.examMarks}</td>
      <td>{exam?.examType === "single" ? "Single" : "Group"}</td>
      <td>{exam?.faceCam ? "Yes" : "No"}</td>
      <td>{new Date(exam?.paymentAt).toLocaleDateString()}</td>
      <td>
        {exam?.examType === "single"
          ? "Lifetime"
          : getExamStatus(exam?.startDate, exam?.endDate)}
      </td>
      <td className="flex gap-2 items-center">
        {isSubmitted ? (
          <button
            className="btn-md btn-link text-primaryColor cursor-pointer"
            onClick={() => navigate(`/exam/result/${exam?.examId}`)}
          >
            View Result
          </button>
        ) : getExamStatus(exam?.startDate, exam?.endDate) === "Ongoing" ||
          exam?.examType === "single" ? (
          <button
            className="btn-md btn-link text-accentColor cursor-pointer"
            onClick={() => showExamRules(exam?.examId)}
          >
            Start
          </button>
        ) : (
          <button
            className="btn-md btn-disabled text-gray-400 cursor-not-allowed"
            disabled
          >
            Not Available
          </button>
        )}
      </td>
    </tr>
  );
};

export default MyExamRow;
