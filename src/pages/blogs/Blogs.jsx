import { useState } from "react";
import BlogCard from "../../components/blogCard/BlogCard";
import SectionTitle from "../../components/sectionTiltle/SectionTitle";
import FilterArea from "../exams/FilterArea/FilterArea";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const Blogs = () => {
  const [isFilterView, setIsFilterView] = useState(false);
  const axiosPublic = useAxiosPublic();

  const { data: allBlogs = [] } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await axiosPublic("/get/blogs");
      return res.data;
    },
  });

  return (
    <div className="mt-20 scroll-smooth">
      {/* section title / cover  */}
      <div className="mt-18 bg-primaryColor/10 py-8">
        <SectionTitle header={"All Blogs"}></SectionTitle>{" "}
      </div>
      {/* filter section  */}
      {isFilterView && (
        <div className="flex absolute z-40 lg:hidden">
          <FilterArea></FilterArea>
          <span
            onClick={() => setIsFilterView(false)}
            className="right-4 absolute top-4 text-2xl text-accentColor cursor-pointer"
          >
            <FaRegRectangleXmark />
          </span>
        </div>
      )}

      {isFilterView && (
        <div
          onClick={() => setIsFilterView(false)}
          className="fixed inset-0 bg-primaryColor opacity-50 lg:hidden z-30"
        ></div>
      )}
      {/*maintain max width section  */}
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="mt-8 flex items-center lg:justify-end justify-between">
          {/* filter section for small and medium devices  */}
          <div className="inline lg:hidden">
            <span
              onClick={() => setIsFilterView(true)}
              className="text-primaryColor text-xl"
            >
              <FaFilter className="inline-flex"></FaFilter> Filter
            </span>
          </div>
          {/* search area  */}
          <div className="join">
            <input
              className="input input-bordered join-item"
              placeholder="Search"
            />
            <button className="btn primary-btn join-item rounded-r">
              Search
            </button>
          </div>
        </div>
        {/* blogs card area  */}
        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-3 hidden lg:inline">
            <FilterArea></FilterArea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-12 lg:col-span-9">
          
            {allBlogs.map((blog) => (
              <BlogCard key={blog?.blogId} blog={blog}></BlogCard>
            ))}
          </div>
        </div>
        {/* pagination  */}
        <div className="flex items-center justify-center mt-12">
          <div className="join">
            <button className="join-item btn btn-sm btn-active">1</button>
            <button className="join-item btn btn-sm">2</button>
            <button className="join-item btn btn-sm">3</button>
            <button className="join-item btn btn-sm">4</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
