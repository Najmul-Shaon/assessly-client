import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAuth from "../../../Hooks/useAuth";
import useIsCourseComplete from "../../../Hooks/useIsCourseComplete";

const CourseVideoPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosSecure = useAxiosSecure();
  const [completedVideos, setCompletedVideos] = useState([]);
  const { isComplete, refetch } = useIsCourseComplete(id);

  const MySwal = withReactContent(Swal);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/course/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const videoList = course?.videoList || [
    { title: course?.title, url: course?.video },
  ];
  const currentVideo = videoList[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < videoList.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleComplete = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Clicking complete will update the database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Complete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "bg-green-600 text-white px-4 py-2 rounded",
        cancelButton: "bg-gray-300 text-black px-4 py-2 rounded ml-2",
      },
    });

    if (result.isConfirmed) {
      try {
        // 🔄 Send PATCH or POST request to your API
        const res = await axiosSecure.post(
          `/course/complete?courseId=${id}&email=${user?.email}`,
          {
            email: user?.email,
            courseId: id,
            courseStatus: "Completed",
            examId: course?.examId,
            examStatus: "No",
            created_at: new Date(),
            updatedAt: new Date(),
          }
        );

        // ✅ Show success message
        if (res.data.insertedId) {
          await Swal.fire({
            title: "Success!",
            text: "Task marked as complete.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          refetch();
          navigate("/dashboard/my-courses");
        }

        // Optional: Refetch data or update UI
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong while updating.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Video Player Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative pt-[56.25%] bg-black rounded-t-2xl overflow-hidden">
            <ReactPlayer
              url={currentVideo?.url}
              className="absolute top-0 left-0"
              width="100%"
              height="100%"
              controls
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-teal-700 flex items-center gap-2">
              <FaRegCirclePlay className="text-teal-600" />{" "}
              {currentVideo?.title}
            </h1>

            {/* Prev/Next Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${
                  currentIndex === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === videoList.length - 1}
                className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${
                  currentIndex === videoList.length - 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Fixed Width Video List */}
        <div className="w-full lg:w-[250px] bg-white rounded-2xl shadow-xl p-4 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Course Videos
          </h2>
          <ul className="space-y-3 list-decimal ms-5">
            {videoList.map((vid, index) => (
              <li
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`p-2 rounded-md cursor-pointer  ${
                  completedVideos.includes(vid.title)
                    ? "line-through text-gray-500"
                    : ""
                }`}
              >
                {vid.title}
              </li>
            ))}
          </ul>

          {/* Mark as Complete Button */}
          {isComplete ? (
            <button className="mt-6 w-full py-2 rounded-md bg-primaryColor hover:bg-teal-800 text-white cursor-not-allowed">
              Completed
            </button>
          ) : (
            <button
              onClick={() => handleComplete(id)}
              className="mt-6 w-full py-2 rounded-md bg-primaryColor hover:bg-teal-800 text-white cursor-pointer"
            >
              Complete Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseVideoPage;
