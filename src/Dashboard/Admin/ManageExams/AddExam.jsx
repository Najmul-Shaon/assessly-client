import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowDown } from "react-icons/io";
import * as XLSX from "xlsx";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import useAxiosPublic from "../../../Hooks/axiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_Img_Host_Key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddExam = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [questions, setQuestions] = useState([]);
  //   const [image, setImage] = useState(null);

  // Watch exam type to dynamically change the form fields
  const watchExamType = watch("examType", "single"); // default to "single"

  const onSubmit = async (data) => {
    const thumbnails = { image: data.thumbnails[0] };
    // image upload to imgbb and then get an url
    const res = await axiosPublic.post(imgHostingApi, thumbnails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const examInfo = {
        createdBy: user?.email,
        description: data.description,
        duration: data.duration,
        endDate: data.endDate,
        examTitle: data.examTitle,
        examTopic: data.examTopic,
        examType: data.examType,
        fee: data.fee,
        startDate: data.startDate,
        thumbnails: res?.data?.data?.display_url,
        totalMarks: data.totalMarks,
        uniqueQuestions: data.uniqueQuestions,
        questions,
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
          reset();
          navigation("/dashboard/all-exams");
        }
      });
    }
    console.log({ data, questions });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log(sheet); // Log to inspect the data structure
        setQuestions(sheet);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const downloadSampleExcel = () => {
    const sampleData = [
      {
        sl: 1,
        question: "What is 2 + 2?",
        a: "3",
        b: "4",
        c: "5",
        d: "6",
        ans: "b",
      },
      {
        sl: 2,
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
        ans: "c",
      },
      {
        sl: 3,
        question: "Which is the largest planet?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        ans: "c",
      },
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sample Questions");

    // Trigger download
    XLSX.writeFile(wb, "Sample_Questions.xlsx");
  };

  // Handle image file change
  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     setImage(URL.createObjectURL(file)); // Display the image in the UI
  //   };

  return (
    <div className="space-y-4">
      <SectionTitle header={"Create Exam"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 space-y-4 border rounded-lg max-w-lg mx-auto"
      >
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
            className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500">{errors.description?.message}</p>
        </div>

        {/* Exam Type (Single or Group) */}
        <div>
          <label className="block font-semibold">Exam Type:</label>
          <select
            {...register("examType", { required: "Exam type is required" })}
            className="w-full p-2 border rounded"
          >
            <option value="single">Single Exam</option>
            <option value="group">Group Exam</option>
          </select>
          <p className="text-red-500">{errors.examType?.message}</p>
        </div>

        {/* Price and Topic - only for Single Exam */}
        {watchExamType === "single" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Fee:</label>
                <input
                  placeholder="100.00"
                  type="number"
                  {...register("fee", { required: "Fee is required" })}
                  className="w-full p-2 border rounded"
                />
                <p className="text-red-500">{errors.fee?.message}</p>
              </div>

              <div>
                <label className="block font-semibold">Exam Topic:</label>
                <input
                  placeholder="e.g. chemistry"
                  {...register("examTopic", {
                    required: "Exam topic is required",
                  })}
                  className="w-full p-2 border rounded"
                />
                <p className="text-red-500">{errors.examTopic?.message}</p>
              </div>
            </div>
            {/* Image Upload */}
            <div>
              <label className="block font-semibold">Upload Exam Image:</label>
              <input
                type="file"
                accept="image/*"
                // onChange={handleImageChange}
                className="w-full border rounded file-input"
                {...register("thumbnails", {
                  required: "Thumbnails img is required",
                })}
              />
              {/* {image && (
                <img
                  src={image}
                  alt="Exam"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )} */}
            </div>
          </>
        )}

        {/* Start and End Date - only for Group Exam */}
        {watchExamType === "group" && (
          <>
            <div>
              <label className="block font-semibold">
                Start Date and Time:
              </label>
              <input
                type="datetime-local"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                className="w-full p-2 border rounded"
              />
              <p className="text-red-500">{errors.startDate?.message}</p>
            </div>

            <div>
              <label className="block font-semibold">End Date and Time:</label>
              <input
                type="datetime-local"
                {...register("endDate", { required: "End date is required" })}
                className="w-full p-2 border rounded"
              />
              <p className="text-red-500">{errors.endDate?.message}</p>
            </div>
          </>
        )}

        {/* Unique Question Checkbox */}
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

        {/* File Upload */}
        <div>
          <label className="block font-semibold">
            Upload Questions (Excel):
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="w-full border rounded file-input"
          />
        </div>

        {/* Uploaded Questions Table */}
        {questions.length > 0 && (
          <div className="p-3 bg-gray-100 rounded">
            <h3 className="font-bold">Uploaded Questions Preview:</h3>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">SL</th>
                  <th className="border p-2">Question</th>
                  <th className="border p-2">Option A</th>
                  <th className="border p-2">Option B</th>
                  <th className="border p-2">Option C</th>
                  <th className="border p-2">Option D</th>
                  <th className="border p-2">Answer</th>
                </tr>
              </thead>
              <tbody>
                {questions.slice(0, 5).map((q, index) => (
                  <tr key={index}>
                    <td className="border p-2">{q.sl}</td>
                    <td className="border p-2">{q.question}</td>
                    <td className="border p-2">{q.a}</td>
                    <td className="border p-2">{q.b}</td>
                    <td className="border p-2">{q.c}</td>
                    <td className="border p-2">{q.d}</td>
                    <td className="border p-2">{q.ans}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Download Sample Excel Button */}
        <button
          type="button"
          onClick={downloadSampleExcel}
          className="w-full py-2 text-black border hover:bg-primaryColor hover:text-white font-semibold rounded flex justify-center items-center cursor-pointer"
        >
          <span className="text-xl font-bold">
            <IoMdArrowDown />
          </span>
          Sample Excel
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-primaryColor text-white font-semibold rounded cursor-pointer"
        >
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default AddExam;
