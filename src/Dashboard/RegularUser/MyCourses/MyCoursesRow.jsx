import { Link, useNavigate } from "react-router-dom";
import useIsCourseComplete from "../../../Hooks/useIsCourseComplete";
import useIsExamSubmitted from "../../../Hooks/useIsExamSubmitted";
import Swal from "sweetalert2";

const MyCoursesRow = ({ singleCourse, i }) => {
  const { isComplete } = useIsCourseComplete(singleCourse?.courseId);
  const { isSubmitted } = useIsExamSubmitted(singleCourse?.examId);

  const navigate = useNavigate();

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
    <tr key={singleCourse?._id}>
      <th>{i + 1}</th>
      <td>{singleCourse?.title}</td>
      <td>{singleCourse?.class || "N/A"}</td>
      <td>{singleCourse?.subject}</td>
      <td>{singleCourse?.hasExam ? "Yes" : "No"}</td>
      <td>{singleCourse?.fee}</td>

      <td>{new Date(singleCourse?.enrolledAt).toLocaleDateString()}</td>
      <td>
        {singleCourse?.duration
          ? Number.parseFloat(singleCourse?.duration).toFixed(2)
          : "N/A"}{" "}
        sec
      </td>
      <td>{isComplete ? "Complete" : "Incomplete"}</td>
      <td>
        {singleCourse?.hasExam
          ? isSubmitted
            ? "Completed"
            : "Incompleted"
          : "N/A"}
      </td>
      <td className="flex items-center gap-1 text-xl">
        <div>
          <Link to={`/dashboard/my-course/${singleCourse?.courseId}`}>
            <button className="btn-md btn-link text-accentColor cursor-pointer">
              Watch Video
            </button>
          </Link>
          {singleCourse?.hasExam && isComplete && !isSubmitted && (
            <button
              className="btn-md btn-link text-accentColor cursor-pointer"
              onClick={() => showExamRules(singleCourse?.examId)}
            >
              Start Exam
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MyCoursesRow;
