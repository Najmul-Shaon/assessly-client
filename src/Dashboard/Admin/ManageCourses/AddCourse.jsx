import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosPublic from "../../../Hooks/axiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_Img_Host_Key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

const AddCourse = () => {
  const { user, setLoading } = useAuth();
  const navigation = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // get all exam info

  const { data: allExams = [] } = useQuery({
    queryKey: ["allExams"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/all-exams?type=all");
      return res.data;
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isIncludeExam, setIsIncludeExam] = useState(false);

  const classTypes = [6, 7, 8, 9, 10, 11, 12];
  // Example category options
  const subjects = [
    "ICT",
    "Bangla",
    "English",
    "Math",
    "Biology",
    "Physics",
    "Chemistry",
    "Accounting",
    "Economics",
  ];

  // Handle thumbnail preview
  const handleThumbnailPreview = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);

    const thumbnails = { image: data.thumbnails[0] };

    // host img to imgbb

    const res = await axiosPublic.post(imgHostingApi, thumbnails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // host video to cloudinary
    const video = new FormData();
    video.append("file", data.video[0]);
    video.append("upload_preset", "unsigned_upload");
    // const video = { video: data.video[0] };
    const videoRes = await axiosPublic.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/video/upload`,
      video,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success && videoRes.data?.asset_id) {
      const courseInfo = {
        createdBy: user?.email,
        createdDate: new Date(),
        modifiedDate: new Date(),
        class: data?.classTypes,
        description: data?.description,
        examId: data?.examId || null,
        fee: data?.fee,
        subjects: data?.subjects,
        includeExam: isIncludeExam,
        thumbnail: res?.data?.data?.display_url,
        title: data?.title,
        video: videoRes.data?.secure_url,
        duration: videoRes.data?.duration,
      };

      axiosSecure.post("/create-course", courseInfo).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Course has been created.",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setLoading(false);
          navigation("/dashboard/all-courses");
        }
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <Helmet>
        <title>Assessley | Add Course</title>
      </Helmet>
      <SectionTitle header={"Add Course"}></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Course Title */}
        <div>
          <label className="block font-medium">Course Title</label>
          <input
            placeholder="course title"
            type="text"
            {...register("title", { required: "Course title is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Course Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            placeholder="short description here"
            {...register("description", {
              required: "Course description is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Course Class and subject Dropdown */}
        <div className="grid grid-cols-3 gap-6">
          {/* Course Fee */}
          <div>
            <label className="block font-medium">Fee</label>
            <input
              placeholder="100"
              type="number"
              {...register("fee", { required: "Fee is required", min: 1 })}
              className="w-full border p-2 rounded"
            />
            {errors.fee && (
              <p className="text-red-500 text-sm">{errors.fee.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Class</label>
            <select
              {...register("classTypes", {
                required: "Please select a Class",
              })}
              className="w-full border p-2 rounded"
            >
              <option value="">Class</option>
              {classTypes.map((classType, index) => (
                <option key={index} value={classType}>
                  {classType}
                </option>
              ))}
            </select>
            {errors.classTypes && (
              <p className="text-red-500 text-sm">
                {errors.classTypes.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium">Subject</label>
            <select
              {...register("subjects", {
                required: "Please select a subject",
              })}
              className="w-full border p-2 rounded"
            >
              <option value="">Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subjects && (
              <p className="text-red-500 text-sm">{errors.subjects.message}</p>
            )}
          </div>
        </div>

        {/* checkbox area::: for Include exam  */}
        <div className="grid grid-cols-3 gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="incluedeExam"
              className="w-4 h-4"
              checked={isIncludeExam}
              onChange={() => setIsIncludeExam(!isIncludeExam)}
            />
            <label htmlFor="incluedeExam" className="font-medium">
              Include Exam
            </label>
          </div>
          <div className="col-span-2">
            <label className="block font-medium">Exam Name</label>
            <select
              {...register("examId", {
                required: isIncludeExam ? "Please select a name" : false,
              })}
              className={`w-full border p-2 rounded ${
                isIncludeExam ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!isIncludeExam} // Disable dropdown if checkbox is unchecked
            >
              <option value="">Select a Exam</option>
              {allExams.map((exam) => (
                <option key={exam?.examId} value={exam?.examId}>
                  {exam?.examId} -{exam?.examTitle}
                </option>
              ))}
            </select>
            {errors.examId && (
              <p className="text-red-500 text-sm">{errors.examId.message}</p>
            )}
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnails", { required: "Thumbnail is required" })}
            onChange={handleThumbnailPreview}
            className="w-full border rounded file-input border-black"
          />
          {errors.thumbnails && (
            <p className="text-red-500 text-sm">{errors.thumbnails.message}</p>
          )}

          {/* Preview Thumbnail */}
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-2 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block font-medium">Course Video</label>
          <input
            type="file"
            accept="video/*"
            {...register("video", { required: "Course video is required" })}
            className="w-full border rounded file-input border-black"
          />
          {errors.video && (
            <p className="text-red-500 text-sm">{errors.video.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primaryColor text-white py-2 rounded"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
