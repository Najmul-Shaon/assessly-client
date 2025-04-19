import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AllBlog = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allBlogs = [] } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get/blogs?limit=all");
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Assessley | All Blogs</title>
      </Helmet>
      <SectionTitle header={"All Blog"} />

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Blog Id</th>
              <th>Title</th>
              <th>Read Time</th>
              <th>Author Name</th>
              <th>Author Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBlogs.map((singleBlog, i) => (
              <tr key={singleBlog?._id}>
                <th>{i + 1}</th>
                <td>{singleBlog?.blogId}</td>
                <td>{singleBlog?.title}</td>
                <td>{singleBlog?.readingTime} min</td>
                <td>{singleBlog?.createdAuthor}</td>
                <td>{singleBlog?.createdBy}</td>
                <td className="flex items-center gap-2 text-xl">
                  <span className="text-accentColor">
                    <IoTrashBinOutline />
                  </span>
               
                  <Link>
                    <span className="text-primaryColor">
                      <FaRegEdit />{" "}
                    </span>
                  </Link>{" "}
               
                  <Link>
                    <span className="text-primaryColor">
                      <IoEyeOutline />
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBlog;
