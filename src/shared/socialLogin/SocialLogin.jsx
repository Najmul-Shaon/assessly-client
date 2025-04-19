import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/axiosPublic";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((res) => {
        const userInfo = {
          userEmail: res.user.email,
          userName: res.user.displayName,
          userImg: res.user.photoURL,
          userRole: "user",
          createdAt: new Date(),
          modifiedAt: new Date(),
        };
        axiosPublic
          .post("/create-user", userInfo)
          .then((res) => {
            if (
              res.data.insertedId ||
              res.data.message === "User already exists"
            ) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Welcome to Assessly!!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(from, { replace: true });
            }
          })
          .catch(() => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Opps! An error occured.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Opps! An error occured.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      <div className="divider">or</div>
      <div className="flex justify-center">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline border-textColor/50 hover:bg-primaryColor hover:text-white"
        >
          <FcGoogle size={20} /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
