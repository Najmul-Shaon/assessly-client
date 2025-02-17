import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa6";
import registerImg from "../../assets/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { MdEmail } from "react-icons/md";
import useAxiosPublic from "../../Hooks/axiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/axiosSecure";
import SocialLogin from "../../shared/socialLogin/SocialLogin";

const image_hosting_key = import.meta.env.VITE_Img_Host_Key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
export default function Register() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userImg = { image: data.userImage[0] };
    // image upload to imgbb and then get an url
    const res = await axiosPublic.post(imgHostingApi, userImg, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      createUser(data?.email, data?.password)
        .then(() => {
          updateUserProfile(data?.userName, res?.data?.data?.display_url)
            .then(() => {
              const userInfo = {
                userName: data?.userName,
                userImg: res?.data?.data?.display_url,
                userEmail: data?.email,
                userRole: "user",
              };
              axiosSecure
                .post("/create-user", userInfo)
                .then((res) => {
                  console.log("post res from db", res.data);
                  if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Welcome to Assessly!",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    navigate("/");
                  }
                })
                .catch(() => {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "An Error Occured.",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/email-already-in-use") {
            Swal.fire({
              title: "Opps!",
              text: "Already have an account with this email.",
              icon: "error",
            });
          }
        });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-24 container mx-auto px-4">
      <div className="order-2 md:order-none hidden md:inline">
        <img
          className="flex items-center justify-center"
          src={registerImg}
          alt="register image"
        />
      </div>
      <div className="flex items-center justify-center order-1 md:order-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-xl shadow-xl max-w-sm w-full border"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Welcome to <span className="text-primaryColor">Assesly</span>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* name  */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                {...register("userName", { required: "Username is required" })}
                placeholder="Your name here"
                className="w-full pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-white/50 outline-none"
              />
              {errors.userName && (
                <p className="text-accentColor text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>
            {/* user mail  */}
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="example@gmail.com"
                className="w-full pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-white/50 outline-none"
              />
              {errors.email && (
                <p className="text-accentColor text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* user image  */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                {...register("userImage", { required: "Image is required" })}
                className="w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-white/50 outline-none file:rounded-md file:mr-3 file:px-4 file:bg-primaryColor/40"
              />
              {errors.userImage && (
                <p className="text-red-500 text-sm">
                  {errors.userImage.message}
                </p>
              )}
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  maxLength: {
                    value: 20,
                    message: "Password not more than 20 character",
                  },
                  minLength: {
                    value: 6,
                    message: "Password not less than 6 characted",
                  },
                  pattern: {
                    value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
                    message:
                      "Password must contain one number, one uppercase, one lowercase and one special character",
                  },
                })}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:ring-white/50 outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </button>
              {errors.password && (
                <p className="text-accentColor text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn primary-btn w-full">
              Register
            </button>
            <div>
              <p className="text-sm">
                Already have an account?{" "}
                <span className="text-accentColor">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </form>
          <SocialLogin />
        </motion.div>
      </div>
    </div>
  );
}
