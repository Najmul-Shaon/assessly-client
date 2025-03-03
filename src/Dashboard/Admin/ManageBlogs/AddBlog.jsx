import { useForm, useFieldArray } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosPublic from "../../../Hooks/axiosPublic";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_Img_Host_Key;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigation = useNavigate();
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      content: [{ title: "", text: "" }], // Default one content section
    },
  });

  // Register dynamic fields using useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content", // This should be the key in your form data
  });

  const onSubmit = async (data) => {
    const thumbnails = { image: data.thumbnails[0] };
    // Image upload to imgbb and then get an url
    const res = await axiosPublic.post(imgHostingApi, thumbnails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const blogInfo = {
        createdBy: user?.email,
        createdAuthor: user?.displayName,
        createdDate: new Date(),
        modifiedDate: new Date(),
        thumbnail: res?.data?.data?.display_url,
        title: data?.title,
        summary: data?.summary,
        readingTime: data?.readingTime,
        content: data?.content,
        quote: data?.quote,
        quoteAuthor: data?.quoteAuthor,
        tags: data?.tags,
        topic: data?.topic,
      };
      axiosSecure.post("/create/blog", blogInfo).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Blog has been created.",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          navigation("/dashboard/all-blog");
        }
      });
    }
    console.log(data);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <SectionTitle header={"Create a blog"} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Thumbnail Upload */}
        <div>
          <label className="block font-medium">Thumbnail</label>
          <input
            type="file"
            {...register("thumbnails")}
            className="w-full border border-black rounded file-input"
            accept="image/*"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter blog title"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block font-medium">Summary</label>
          <textarea
            {...register("summary", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter a short summary"
          ></textarea>
        </div>

        {/* Date, Author Name & Reading Time */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-medium">Time (min)</label>
            <input
              type="number"
              {...register("readingTime", { required: true })}
              className="w-full border p-2 rounded"
              min="1"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block font-medium">Topic</label>
            <input
              type="text"
              {...register("topic", { required: true })}
              className="w-full border p-2 rounded"
              min="1"
              placeholder="e.g. Physics"
            />
          </div>
          <div>
            <label className="block font-medium">Date</label>
            <input
              defaultValue={new Date().toISOString().split("T")[0]}
              disabled
              type="date"
              className="w-full border p-2 rounded cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-medium">Author</label>
            <input
              defaultValue={user?.displayName}
              type="text"
              disabled
              className="w-full border p-2 rounded cursor-not-allowed"
            />
          </div>
        </div>

        {/* Content Sections */}
        <div>
          <label className="block font-medium">Content Sections</label>
          {fields.map((item, index) => (
            <div key={item.id} className="mb-4 p-3 border rounded">
              <input
                type="text"
                {...register(`content[${index}].title`)}
                defaultValue={item.title}
                placeholder="Section title"
                className="w-full border p-2 rounded mb-2"
              />
              <textarea
                {...register(`content[${index}].text`)}
                defaultValue={item.text}
                placeholder="Section content"
                className="w-full border p-2 rounded mb-2"
              ></textarea>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-accentColor text-white px-3 rounded"
                >
                  ✕ Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ title: "", text: "" })}
            className="mt-2 text-blue-500"
          >
            + Add Section
          </button>
        </div>

        {/* Quote Section */}
        <div>
          <label className="block font-medium">Quote</label>
          <textarea
            {...register("quote")}
            className="w-full border p-2 rounded"
            placeholder="Enter a quote"
          ></textarea>
        </div>

        {/* Quote Author */}
        <div>
          <label className="block font-medium">Quote Author</label>
          <input
            type="text"
            {...register("quoteAuthor")}
            className="w-full border p-2 rounded"
            placeholder="Enter quote author"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium">Tags (comma-separated)</label>
          <input
            type="text"
            {...register("tags")}
            className="w-full border p-2 rounded"
            placeholder="e.g. Education, LifelongLearning"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-primaryColor text-white font-semibold rounded cursor-pointer"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
