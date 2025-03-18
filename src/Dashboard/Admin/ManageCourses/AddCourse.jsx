import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";

const AddCourse = () => {
  // get all exam info
  const axiosSecure = useAxiosSecure();
  const { data: allExams = [] } = useQuery({
    queryKey: ["allExams"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/all-exams?type=all");
      return res.data;
    },
  });

  // const { examTitle, examId } = allExams;
  // console.log(allExams);

  // const examInfo = [];

  // {
  //   allExams.map((exam) => {
  //     console.log(exam);
  //     examInfo.push([exam?.examTitle, exam?.examId]);
  //   });
  // }
  // console.log(examInfo);

  const {
    register,
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
  const examNames = ["Beginner", "Intermediate", "Advanced"];

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
  const onSubmit = (data) => {
    console.log("Form Data:", data);

    // Prepare form data for backend
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("thumbnail", data.thumbnail[0]); // First file
    formData.append("video", data.video[0]); // First file
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
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
          {/* Course Price */}
          <div>
            <label className="block font-medium">Price</label>
            <input
              placeholder="100"
              type="number"
              {...register("price", { required: "Price is required", min: 1 })}
              className="w-full border p-2 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
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
            {...register("thumbnail", { required: "Thumbnail is required" })}
            onChange={handleThumbnailPreview}
            className="w-full border rounded file-input border-black"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
