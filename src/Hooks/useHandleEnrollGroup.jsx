import Swal from "sweetalert2";
import useAuth from "./useAuth";
import useAxiosSecure from "./axiosSecure";
import { useNavigate } from "react-router-dom";

const useHandleEnrollGroup = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const hanldeGroupExamEnroll = () => {
    Swal.fire({
      title: "Join Group Exam",
      input: "text",
      inputLabel: "Ask your teacher for the exam code then enter it here.",
      inputPlaceholder: "Exam Code here...",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      confirmButtonText: "Join",
      didOpen: () => {
        const input = Swal.getInput();
        const confirmBtn = Swal.getConfirmButton();
        confirmBtn.disabled = true;

        input.addEventListener("input", () => {
          confirmBtn.disabled = input.value.length < 6;
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post(
            `/api/post/group-exam/enroll?examCode=${result.value}&user=${user?.email}`
          )
          .then((res) => {
            if (res.data.isFound) {
              Swal.fire({
                icon: "success",
                title: "Congratulation!",
                showConfirmButton: false,
                timer: 1000,
              });
              navigate("/dashboard/my-exam");
            } else if (res.data.isFound === false) {
              Swal.fire({
                title: "Wrong Code.",
                text: "Please contact with your teacher.",
                icon: "error",
                showConfirmButton: false,
                timer: 1000,
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Something went wrong.",
              text: "Please try again.",
              icon: "error",
            });
          });
      }
    });
  };
  return { hanldeGroupExamEnroll };
};

export default useHandleEnrollGroup;
