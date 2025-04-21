import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/axiosSecure";
import useAuth from "../../Hooks/useAuth";
import usePaid from "../../Hooks/usePaid";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { isPaid } = usePaid(id, "course");

  const { data: singleCourse = {} } = useQuery({
    queryKey: ["singleCourse"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get/course/${id}`);
      return res.data;
    },
  });

  const handlePayment = (id) => {
    const purchaseInfo = {
      paymentAt: new Date(),
      modifiedAt: new Date(),
      id: id,
      userName: user?.displayName,
      userEmail: user?.email,
      type: "course",
    };
    axiosSecure.post("/payment", purchaseInfo).then((res) => {
      window.location.replace(res?.data?.url);
    });
  };

  return (
    <div className="mt-20 bg-secondaryColor py-8">
      <div className="min-h-screen flex flex-col items-center justify-start">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-xl p-8 mb-10">
          {/* Top section with thumbnail, key info, and enroll button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <img
              src={singleCourse?.thumbnail}
              alt="exam.title"
              className="w-full h-full object-cover rounded-lg shadow-lg "
            />

            <div className=" flex flex-col">
              <div className="grow">
                <h1 className="text-3xl font-bold text-primaryColor mb-2">
                  {singleCourse?.title}
                </h1>
                <div className="text-footerTextColor mb-4 flex-none">
                  <p>
                    <strong>Class:</strong> {singleCourse?.class}
                  </p>
                  <p>
                    <strong>Topic:</strong> {singleCourse?.subjects}
                  </p>
                  <p>
                    <strong>Video Duration:</strong> {singleCourse?.duration}
                    minutes
                  </p>
                  <p>
                    <strong>Total Video:</strong> 01
                  </p>
                  <p>
                    <strong>Has Exam:</strong>{" "}
                    {singleCourse?.includeExam ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              {!isPaid && (
                <div>
                  <button
                    onClick={() => handlePayment(id)}
                    className="btn primary-btn my-4"
                  >
                    <span>Enroll Now</span>
                    <FaArrowRight />
                  </button>
                </div>
              )}
              {isPaid && (
                <div className="flex items-center gap-6">
                  <button className="btn btn-outline my-4">
                    Paid{" "}
                    <span className="text-primaryColor text-xl">
                      <FaCheckCircle />
                    </span>
                  </button>
                  <button className="btn primary-btn my-4">Start Course</button>
                </div>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-primaryColor mb-4">
              Description
            </h3>
            <p className="text-gray-600">{singleCourse?.description}</p>
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-primaryColor mb-4">
              Instructions
            </h3>
            <ul className="space-y-2 text-accentColor list-disc ms-8 ">
              <li>
                Once the exam starts, closing or refreshing the browser will
                result in automatic submission.
              </li>
              <li>
                Switching tabs or opening a new window will trigger a warning.
              </li>
              <li>Multiple warnings may lead to automatic submission.</li>
              <li>The timer will continue running even if you disconnect.</li>
              <li>Ensure a stable internet connection before starting.</li>
              <li>The Back button and browser navigation will be disabled.</li>
              <li>
                Once you move to the next question, you may not be able to
                return
              </li>
              <li>You can only attempt the exam once.</li>
              <li>
                When the timer reaches zero, your answers will be submitted
                automatically.
              </li>
              <li>The exam may require full-screen mode.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
