import Swal from "sweetalert2";
import useAuth from "./useAuth";

const useLogout = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    Swal.fire({
      title: "Sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008080",
      cancelButtonColor: "#ff6f61",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              text: "Successfully logged out.",
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch(() => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong. Please try again.",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      }
    });
  };
  return handleLogout;
};

export default useLogout;
