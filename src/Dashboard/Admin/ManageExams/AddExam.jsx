import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import useAxiosPublic from "../../../Hooks/axiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_Img_Host_Key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddExam = () => {
  const { user, setLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigation = useNavigate();

  const [totalQuestionsCount, setTotalQuestionsCount] = useState();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const count = parseInt(totalQuestionsCount);
      if (!isNaN(count) && count > 0) {
        setValue("questions", []);
        for (let i = 0; i < count; i++) {
          append({
            question: "",
            a: "",
            b: "",
            c: "",
            d: "",
            ans: "a",
          });
        }
      }
    }
  };

  const [isNegativeMark, setIsNegativeMark] = useState(false);

  // Watch exam type to dynamically change the form fields
  const watchExamType = watch("examType", "single"); // default to "single"

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const thumbnails = { image: data.thumbnails[0] };
    // image upload to imgbb and then get an url
    const res = await axiosPublic.post(imgHostingApi, thumbnails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const examInfo = {
        createdAt: new Date(),
        createdBy: user?.email,
        description: data.description,
        duration: data.duration,
        startDate: data.startDate,
        endDate: data.endDate,
        examTitle: data.examTitle,
        examTopic: data.subjects,
        examClass: data.classTypes,
        examType: data.examType,
        faceCam: data.faceCam,
        fee: data.fee,
        passMark: data.passMark,
        thumbnails: res?.data?.data?.display_url,
        totalMarks: data.totalMarks,
        uniqueQuestions: data.uniqueQuestions,
        isNegativeMarks: data.isNegativeMarks,
        negativeMark: data.negativeMark || null,
        questions: data?.questions,
      };
      axiosSecure.post("/create/exam", examInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Exam has been created.",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
          reset();
          navigation("/dashboard/all-exams");
        }
      });
    }
  };

  const classTypes = [6, 7, 8, 9, 10, 11, 12];

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

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
      <Helmet>
        <title>Assessley | Add Exam</title>
      </Helmet>
      <SectionTitle header={"Create Exam"} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Exam Title */}
        <div>
          <label className="block font-semibold">Exam Title:</label>
          <input
            placeholder="Exam title"
            {...register("examTitle", {
              required: "Exam title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
            className="w-full p-2 rounded border border-gray-300"
          />
          <p className="text-red-500">{errors.examTitle?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Duration */}
          <div>
            <label className="block font-semibold">Duration (minutes):</label>
            <input
              placeholder="e.g. 60"
              type="number"
              {...register("duration", {
                required: "Duration is required",
                min: {
                  value: 1,
                  message: "Duration must be at least 1 minute",
                },
              })}
              className="w-full p-2 border rounded border-gray-300"
            />
            <p className="text-red-500">{errors.duration?.message}</p>
          </div>

          {/* Total Marks */}
          <div>
            <label className="block font-semibold">Total Marks:</label>
            <input
              placeholder="e.g 100"
              type="number"
              {...register("totalMarks", {
                required: "Total marks are required",
                min: { value: 1, message: "Marks must be at least 1" },
              })}
              className="w-full p-2 border rounded border-gray-300"
            />
            <p className="text-red-500">{errors.totalMarks?.message}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            placeholder="Exam description here"
            {...register("description")}
            className="w-full p-2 border rounded border-gray-300"
          />
          <p className="text-red-500">{errors.description?.message}</p>
        </div>

        {/* Exam Type (Single or Group) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Exam Type:</label>
            <select
              {...register("examType", { required: "Exam type is required" })}
              className="w-full p-2 border rounded border-gray-300"
            >
              <option value="single">Single Exam</option>
              <option value="group">Group Exam</option>
            </select>
            <p className="text-red-500">{errors.examType?.message}</p>
          </div>
          <div>
            <label className="block font-semibold">Pass Mark:</label>
            <input
              placeholder="33"
              type="number"
              {...register("passMark", { required: "Pass Mark is required" })}
              className="w-full p-2 border rounded border-gray-300"
            />
            <p className="text-red-500">{errors.passMark?.message}</p>
          </div>
        </div>

        {/* Price and Topic - only for Single Exam */}
        {watchExamType === "single" && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold">Fee:</label>
                <input
                  placeholder="100.00"
                  type="number"
                  {...register("fee", { required: "Fee is required" })}
                  className="w-full p-2 border rounded border-gray-300"
                />
                <p className="text-red-500">{errors.fee?.message}</p>
              </div>

              <div>
                <label className="block font-medium">Class</label>
                <select
                  {...register("classTypes", {
                    required: "Please select a Class",
                  })}
                  className="w-full border p-2 rounded border-gray-300"
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
                <label className="block font-medium">Subject:</label>
                <select
                  {...register("subjects", {
                    required: "Please select a subject",
                  })}
                  className="w-full border p-2 rounded border-gray-300"
                >
                  <option value="">Subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subjects && (
                  <p className="text-red-500 text-sm">
                    {errors.subjects.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Start and End Date - only for Group Exam */}
        {watchExamType === "group" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* start daate  */}
              <div>
                <label className="block font-semibold">
                  Start Date and Time:
                </label>
                <input
                  type="datetime-local"
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                  className="w-full p-2 border rounded border-gray-300"
                />
                <p className="text-red-500">{errors.startDate?.message}</p>
              </div>
              {/* end date */}
              <div>
                <label className="block font-semibold">
                  End Date and Time:
                </label>
                <input
                  type="datetime-local"
                  {...register("endDate", { required: "End date is required" })}
                  className="w-full p-2 border rounded border-gray-300"
                />
                <p className="text-red-500">{errors.endDate?.message}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Class:</label>
                <select
                  {...register("classTypes", {
                    required: "Please select a Class",
                  })}
                  className="w-full border p-2 rounded border-gray-300"
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
                <label className="block font-medium">Subject:</label>
                <select
                  {...register("subjects", {
                    required: "Please select a subject",
                  })}
                  className="w-full border p-2 rounded border-gray-300"
                >
                  <option value="">Subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subjects && (
                  <p className="text-red-500 text-sm">
                    {errors.subjects.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Checkbox */}
        <div className="grid grid-cols-2 justify-between items-center">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("uniqueQuestions")}
                className="h-5 w-5"
              />
              <span className="font-semibold">Unique Question</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("faceCam")}
                className="h-5 w-5"
              />
              <span className="font-semibold">Camera</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("isNegativeMarks")}
                className="h-5 w-5"
                checked={isNegativeMark}
                onChange={() => setIsNegativeMark(!isNegativeMark)}
              />
              <span className="font-semibold">Negative Marking</span>
            </label>
          </div>
          <div>
            <label className="block font-semibold">Negative Mark (%)</label>
            <input
              placeholder="25"
              type="number"
              {...register(
                "negativeMark",
                isNegativeMark && { required: "Negative Mark is required" }
              )}
              className={`w-full p-2 border rounded border-gray-300 ${
                isNegativeMark ? "cursor-pointer" : "cursor-not-allowed"
              } `}
              disabled={!isNegativeMark}
            />
            <p className="text-red-500">{errors.negativeMark?.message}</p>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold">Upload Exam Image:</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded file-input border-gray-300"
            {...register("thumbnails", {
              required: "Thumbnails img is required",
            })}
          />
        </div>

        {/* dynamic question input field  */}
        {/* ***************************************************************  */}
        <div>
          <label className="font-medium">Total Sections</label>
          <input
            type="number"
            value={totalQuestionsCount}
            onChange={(e) => setTotalQuestionsCount(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Enter total and press Enter"
          />
        </div>

        {/* Render MCQ Fields */}
        {fields.map((q, index) => (
          <div
            key={q.id}
            className="border border-gray-300 p-4 rounded-lg shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">Question {index + 1}</label>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm"
              >
                ✕ Remove
              </button>
            </div>

            <input
              {...register(`questions[${index}].question`)}
              placeholder="Write question"
              className="border border-gray-300 p-2 w-full rounded"
            />

            {["a", "b", "c", "d"].map((opt) => (
              <div key={opt} className="flex items-center space-x-2">
                <input
                  {...register(`questions[${index}].${opt}`)}
                  placeholder={`Option ${opt.toUpperCase()}`}
                  className="border border-gray-300 p-2 w-full rounded"
                />
                <Controller
                  name={`questions[${index}].ans`}
                  control={control}
                  defaultValue="a"
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value={opt}
                      checked={field.value === opt}
                    />
                  )}
                />
                <label className="text-sm">Correct</label>
              </div>
            ))}
          </div>
        ))}

        {/* Manually add one MCQ */}
        <button
          type="button"
          onClick={() =>
            append({
              question: "",
              a: "",
              b: "",
              c: "",
              d: "",
              ans: "a",
            })
          }
          className="text-blue-600"
        >
          + Add Question
        </button>

        {/* ***************************************************************  */}

        <div className="flex flex-col items-end">
          {/* Submit Button */}
          <button
            type="submit"
            className="py-2 px-4 bg-primaryColor text-white font-semibold rounded cursor-pointer"
          >
            Create Exam
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExam;
