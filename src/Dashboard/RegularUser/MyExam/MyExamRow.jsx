import { useNavigate } from "react-router-dom";
import useIsExamSubmitted from "../../../Hooks/useIsExamSubmitted";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/axiosSecure";

const MyExamRow = ({ exam, index }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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

  const showResult = async (examId, email) => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await axiosSecure.get(
        `/exam/result?id=${examId}&email=${email}`
      );

      const result = res.data;
      const obtainMarks = parseFloat(result?.obtainMarks).toFixed(2);

      if (!result) {
        return Swal.fire(
          "No Result Found",
          "Result not available yet.",
          "info"
        );
      }

      const tableHTML = `
        <table style="width:100%;border-collapse:collapse;text-align:center">
          <thead>
            <tr style="background:#f6f6f6">
              <th style="border:1px solid #ddd;padding:8px">Total Marks</th>
              <th style="border:1px solid #ddd;padding:8px">Answered</th>
              <th style="border:1px solid #ddd;padding:8px">Obtained</th>
              <th style="border:1px solid #ddd;padding:8px">Correct</th>
              <th style="border:1px solid #ddd;padding:8px">Wrong</th>
              <th style="border:1px solid #ddd;padding:8px">Skipped</th>
              <th style="border:1px solid #ddd;padding:8px">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid #ddd;padding:8px">${
                result?.totalMarks
              }</td>
              <td style="border:1px solid #ddd;padding:8px">${
                result?.totalAnswered
              }</td>
              <td style="border:1px solid #ddd;padding:8px">${obtainMarks}</td>
              <td style="border:1px solid #ddd;padding:8px">${
                result?.totalRight
              }</td>
              <td style="border:1px solid #ddd;padding:8px">${
                result?.totalWrong
              }</td>
              <td style="border:1px solid #ddd;padding:8px">${
                result?.totalSkip
              }</td>
              <td style="border:1px solid #ddd;padding:8px">${
                result?.status || "Wait"
              }</td>
            </tr>
          </tbody>
        </table>
      `;

      Swal.fire({
        title: "Your Exam Result",
        html: tableHTML,
        icon: "success",
        confirmButtonText: "Close",
        width: "700px",
        customClass: {
          confirmButton: "custom-confirm-btn",
        },
      });
    } catch (error) {
      Swal.fire(
        "Error",
        "Something went wrong while fetching the result.",
        "error"
      );
    }
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

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{exam?.examTitle}</td>
      <td>{exam?.examClass || "N/A"}</td>
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
            onClick={() => showResult(exam?.examId, user?.email)}
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
