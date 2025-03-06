import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import loginImg from "../../assets/login.gif";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import SocialLogin from "../../shared/socialLogin/SocialLogin";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    login(data?.email, data?.password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome Back!",
          showConfirmButton: false,
          timer: 1000,
        });
        reset();
        navigate(from, { replace: true });
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error occured! Try again.",
          showConfirmButton: false,
          timer: 1000,
        });
      });
    console.log(data?.email);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-24 max-w-screen-2xl mx-auto px-4">
      <div className="order-2 md:order-none hidden md:inline">
        <img
          className="flex items-center justify-center"
          src={loginImg}
          alt="login image"
        />
      </div>
      <div className="flex items-center justify-end order-1 md:order-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-xl shadow-xl max-w-sm w-full border"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                placeholder="Abcd!1"
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
              Login
            </button>
            <div>
              <p className="text-sm">
                New here?{" "}
                <span className="text-accentColor">
                  <Link to="/register">Register</Link>
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
