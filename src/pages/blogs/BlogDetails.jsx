import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import { CiBookmark } from "react-icons/ci";
import useAxiosSecure from "../../Hooks/axiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: singleBlog = {} } = useQuery({
    queryKey: ["singleBlog"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get/blog/${id}`);
      return res.data;
    },
  });

  // check isRead or not

  const { data: isRead = false, refetch } = useQuery({
    queryKey: ["isRead"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/is-read?id=${id}&user=${user?.email}`
      );

      return res?.data.isRead;
    },
  });

  // add to isRead

  const handleAddToRead = () => {
    const readBlog = {
      createdAt: new Date(),
      blogId: id,
      userEmail: user?.email,
    };
    axiosSecure.post("/blog/add/read", { readBlog }).then((res) => {

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Added to Read List!",
          showConfirmButton: false,
          timer: 1000,
        });
        refetch();
      }
    });
  };

  // delete from isRead

  const handleDeleteFromRead = (id) => {

    axiosSecure
      .delete(`/blog/delete/read?id=${id}&user=${user?.email}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Remove from Read List!",
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        }
      });
  };


  const contents = singleBlog?.content || [];
  const tags = singleBlog?.tags?.split(",") || [];
  return (
    <div className="mt-20 bg-secondaryColor min-h-screen flex justify-center py-8">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-xl p-8">
        {/* Top Section: Thumbnail, Key Info */}
        <div className="mb-8">
          <img
            src={singleBlog?.thumbnail}
            alt={singleBlog?.title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="flex items-center justify-between">
            <div className="mt-4 text-sm text-footerTextColor">
              <span>
                By <strong>{singleBlog?.createdAuthor}</strong>
              </span>{" "}
              |<span> {new Date(singleBlog?.createdDate).toDateString()}</span>{" "}
              |<span> {singleBlog?.readingTime} min to read</span>
            </div>
            <div>
              {!isRead && (
                <span
                  onClick={handleAddToRead}
                  className="text-2xl cursor-pointer"
                >
                  <CiBookmark />
                </span>
              )}
              {isRead && (
                <span
                  onClick={() => handleDeleteFromRead(id)}
                  className="text-2xl text-primaryColor cursor-pointer"
                >
                  <IoMdCheckmarkCircleOutline />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Blog Title & Summary */}
        <h1 className="text-4xl font-bold text-primaryColor mb-4">
          {singleBlog?.title}
        </h1>
        <p className="text-lg text-gray-700 mb-6 italic">
          {singleBlog?.summary}
        </p>

        {/* Table of Contents */}
        <div className="mb-6 p-4 bg-primaryColor/10 rounded-lg">
          <h2 className="text-lg font-semibold text-primaryColor">
            Table of Contents
          </h2>
          <ul className="list-disc pl-5 text-primaryColor">
            {contents.map((content, i) => (
              <li key={i}>
                <a href={`#${content?.title}`} className="hover:underline">
                  {content?.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Content */}
        <div className="leading-relaxed">
          {contents.map((content, i) => (
            <div key={i} id={content?.title} className="mb-6">
              <h2 className="text-2xl font-semibold text-primaryColor mb-2">
                {content?.title}
              </h2>
              <p className="text-footerTextColor">{content?.text}</p>
            </div>
          ))}

          <div className="mb-6">
            <blockquote className="mt-4 p-4 border-l-4 border-primaryColor bg-gray-100 text-gray-600 italic">
              &quot;{singleBlog?.quote}&quot; – {singleBlog?.quoteAuthor}
            </blockquote>
          </div>
        </div>

        {/* Tags & Categories */}
        <div className="flex flex-wrap mt-6 gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-primaryColor/10 text-primaryColor px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-primaryColor mb-4">
            Related Articles
          </h3>
          <ul className="list-disc pl-5 text-primaryColor">
            <li>
              <a href="/blog/2" className="hover:underline text-primaryColor">
                The Power of Online Learning
              </a>
            </li>
            <li>
              <a href="/blog/3" className="hover:underline text-primaryColor">
                Developing a Growth Mindset
              </a>
            </li>
            <li>
              <a href="/blog/4" className="hover:underline text-primaryColor">
                Top Free Educational Resources
              </a>
            </li>
          </ul>
        </div>

        {/* Comments Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-primaryColor mb-4">
            Comments
          </h3>
          <div className="mb-4">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primaryColor"
              placeholder="Add a comment..."
            ></textarea>

            <button className="btn primary-btn my-4">Submit</button>
          </div>

          <div className="mt-4">
            <div className="border-b py-3">
              <p className="font-semibold">Alice Smith</p>
              <p className="text-gray-700">
                Great insights! I love the emphasis on continuous learning.
              </p>
            </div>
            <div className="border-b py-3">
              <p className="font-semibold">David Johnson</p>
              <p className="text-gray-700">
                Thanks for the tips! I&apos;ll start setting my learning goals
                today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
