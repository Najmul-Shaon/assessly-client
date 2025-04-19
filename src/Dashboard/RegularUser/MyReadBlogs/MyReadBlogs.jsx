import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import { Link } from "react-router-dom";

const MyReadBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myReadBlogs = [], refetch } = useQuery({
    queryKey: ["myReadBlogs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/read/${user?.email}`);
      return res.data;
    },
  });


  useEffect(() => {
    refetch();
  }, [refetch]);

  //
  return (
    <div>
      <SectionTitle header={"My Read Blogs"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Title</th>
              <th>Class</th>
              <th>Topic</th>
              <th>Time</th>
              <th>Author</th>
              <th>Read at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myReadBlogs.map((singleReadBlog, i) => (
              <tr key={singleReadBlog?._id}>
                <th>{i + 1}</th>
                <td>{singleReadBlog?.title}</td>
                <td>{singleReadBlog?.class || "N/A"}</td>
                <td>{singleReadBlog?.topic}</td>
                <td>{singleReadBlog?.readingTime}</td>
                <td>{singleReadBlog?.author}</td>

                <td>{new Date(singleReadBlog?.readAt).toLocaleDateString()}</td>
                <td className="flex items-center gap-1 text-xl">
                  <Link to={`/blog/details/${singleReadBlog?.blogId}`}>
                    <button className="btn-md btn-link text-accentColor cursor-pointer">
                      Read
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myReadBlogs.length <= 0 && (
          <>
            <h3 className="text-center my-4">
              There are no blog. Please read first.
              <Link to={"/blogs"} className="text-accentColor underline ms-2">
                <span>Blogs</span>
              </Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default MyReadBlogs;
