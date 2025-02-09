import { Link } from "react-router-dom";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";
import BlogCard from "../../../components/blogCard/BlogCard";

const PopulerBlogs = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-24 px-4">
      <div>
        <SectionTitle
          header={"Populer Blogs"}
          subHeader={"Explore the Latest Ideas, Tips, and Guides"}
        ></SectionTitle>
        <div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          //   data-aos="zoom-out-up"
        >
          {/* todo: make blog card dynamic from db  */}
          <BlogCard></BlogCard>
          <BlogCard></BlogCard>
          <BlogCard></BlogCard>
          <BlogCard></BlogCard>
          <BlogCard></BlogCard>
          <BlogCard></BlogCard>
        </div>
        <div className="flex items-center justify-center mt-10">
          <Link to="/blogs">
            <button className="btn primary-btn shadow-lg shadow-primaryColor/60">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopulerBlogs;
