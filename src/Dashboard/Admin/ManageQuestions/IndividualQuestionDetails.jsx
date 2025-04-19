import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { Link, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

const IndividualQuestionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: examQuestions = {} } = useQuery({
    queryKey: ["examQuestions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get/exam/${id}`);
      return res.data;
    },
  });

  const allQuestions = examQuestions?.questions || [];


  const { control, handleSubmit, register } = useForm({
    defaultValues: { allQuestions },
  });

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <div>
      <SectionTitle header={"Question Details"} />
      <div className="flex justify-evenly my-2">
        <p>
          <span className="font-bold">Exam Id:</span>
          {examQuestions.examId}
        </p>
        <p>
          <span className="font-bold">Title:</span> {examQuestions?.examTitle}
        </p>
        <p>
          <span className="font-bold">Type:</span> {examQuestions?.examType}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        {allQuestions.map((q, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            {/* Question Field */}
            <label className="block font-semibold mb-2">
              Question: {index + 1}
            </label>
            <input
              disabled
              {...register(`questions[${index}].question`)}
              defaultValue={q.question}
              className="border p-2 w-full rounded mb-3"
            />

            {/* Options */}
            {["a", "b", "c", "d"].map((option) => (
              <div key={option} className="flex items-center mb-2">
                {/* Editable Option Input */}
                <input
                  disabled
                  {...register(`questions[${index}].${option}`)}
                  defaultValue={q[option]}
                  className="border p-2 w-full rounded mr-2"
                />

                {/* Select Correct Answer Radio Button */}
                <Controller
                  name={`questions[${index}].ans`}
                  control={control}
                  defaultValue={q.ans}
                  render={({ field }) => (
                    <input
                      disabled
                      type="radio"
                      {...field}
                      value={option}
                      checked={field.value === option}
                      className="ml-2"
                    />
                  )}
                />
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center justify-center gap-2">
          <Link to={`/dashboard/manage-questions/edit/${id}`}>
            <button
              type="submit"
              className="mt-4 p-2 bg-primaryColor text-white rounded cursor-pointer"
            >
              Edit
            </button>
          </Link>
          <Link to="/dashboard/manage-questions">
            <button
              type="submit"
              className="mt-4 p-2 hover:text-white hover:bg-primaryColor border rounded cursor-pointer"
            >
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default IndividualQuestionDetails;
