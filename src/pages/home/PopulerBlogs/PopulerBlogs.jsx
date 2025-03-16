import { Link } from "react-router-dom";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import BlogCard from "../../../components/blogCard/BlogCard";
import { FaArrowRight } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const PopulerBlogs = () => {
  const axiosPublic = useAxiosPublic();

  const { data: populerBlogs = [] } = useQuery({
    queryKey: ["populerBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get/blogs?limit=8");
      return res.data;
    },
  });

  // console.log(populerBlogs);
  return (
    <div className="max-w-screen-2xl mx-auto mt-24 px-4">
      <div>
        <SectionTitle
          header={"Populer Blogs"}
          subHeader={"Explore the Latest Ideas, Tips, and Guides"}
        ></SectionTitle>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {populerBlogs.map((blog) => (
            <BlogCard key={blog?.blogId} blog={blog}></BlogCard>
          ))}
        </div>
        <div className="flex items-center justify-center mt-10">
          <Link to="/blogs">
            <button className="btn primary-btn shadow-lg shadow-primaryColor/60">
              <span>Read More</span> <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopulerBlogs;
