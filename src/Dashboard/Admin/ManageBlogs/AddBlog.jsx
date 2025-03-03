import { useForm } from "react-hook-form";

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Create a New Blog
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Blog Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-gray-700 font-medium">Author Name</label>
          <input
            {...register("author", { required: "Author name is required" })}
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="block text-gray-700 font-medium">
            Thumbnail URL
          </label>
          <input
            {...register("thumbnail", {
              required: "Thumbnail URL is required",
            })}
            type="url"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter thumbnail image URL"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Publish Date */}
        <div>
          <label className="block text-gray-700 font-medium">
            Publish Date
          </label>
          <input
            {...register("date", { required: "Date is required" })}
            type="date"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Estimated Read Time */}
        <div>
          <label className="block text-gray-700 font-medium">
            Estimated Read Time (minutes)
          </label>
          <input
            {...register("readTime", {
              required: "Read time is required",
              min: 1,
            })}
            type="number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter estimated read time"
          />
          {errors.readTime && (
            <p className="text-red-500 text-sm">{errors.readTime.message}</p>
          )}
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-gray-700 font-medium">
            Blog Content
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="6"
            placeholder="Write your blog content here..."
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium">
            Tags (comma-separated)
          </label>
          <input
            {...register("tags")}
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Education, Lifelong Learning, Growth"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
