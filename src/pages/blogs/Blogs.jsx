import { useEffect, useState } from "react";
import BlogCard from "../../components/blogCard/BlogCard";
import SectionTitle from "../../components/sectionTiltle/SectionTitle";
import FilterArea from "../../components/FilterArea/FilterArea";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../shared/spinner/Spinner";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  const [isFilterView, setIsFilterView] = useState(false);
  const axiosPublic = useAxiosPublic();

  // ********************************************

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  // const [selectedSortValue, setSelectedSortValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // search handler
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // filters default value
  const [filters, setFilters] = useState({
    classs: {
      class6: false,
      class7: false,
      class8: false,
      class9: false,
      class10: false,
      class11: false,
      class12: false,
    },
    subject: {
      Ict: false,
      Bangla: false,
      English: false,
      Math: false,
      Biology: false,
      Physics: false,
      Chemistry: false,
      Accounting: false,
      Economics: false,
    },
  });

  console.log(filters);

  const transformToQuery = (filters) => {
    const params = new URLSearchParams();

    // add search value/keyword to the params
    if (searchValue) {
      params.append("search", searchValue);
    }

    // Add class filters to the params
    const selectedClasses = Object.keys(filters.classs)
      .filter((key) => filters.classs[key])
      .join(",");
    if (selectedClasses) {
      params.append("classs", selectedClasses);
    }

    // Add subject filters to the params
    const selectedSubjects = Object.keys(filters.subject)
      .filter((key) => filters.subject[key])
      .join(",");
    if (selectedSubjects) {
      params.append("subject", selectedSubjects);
    }

    // Add current page to the params
    if (currentPage !== undefined) {
      params.append("currentPage", currentPage.toString());
    }

    // Add items per page to the params
    if (itemsPerPage !== undefined) {
      params.append("itemsPerPage", itemsPerPage.toString());
    }

    return params.toString();
  };

  // transform filters into query string
  const queryString = transformToQuery(filters);

  console.log(queryString);

  const blogCount = 100;

  // calculate number of page and page sequence
  const numberOfPage = Math.ceil(blogCount?.count / itemsPerPage);
  const pagesSequence = !isNaN(numberOfPage)
    ? [...Array(numberOfPage).keys()]
    : [];

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage + 1 < pagesSequence.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ********************************************

  const {
    data: allBlogs = [],
    isLoading: allBlogsLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/get/blogs?limit=all");
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [queryString, refetch]);

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  return (
    <div className="mt-20 scroll-smooth">
      <Helmet>
        <title>Assessley | Blogs</title>
      </Helmet>
      {/* section title / cover  */}
      <div className="mt-18 bg-primaryColor/10 py-8">
        <SectionTitle header={"All Blogs"}></SectionTitle>{" "}
      </div>
      {/* filter section  */}
      {isFilterView && (
        <div className="flex absolute z-40 lg:hidden">
          <FilterArea filters={filters} setFilters={setFilters} />
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
              type="search"
              onChange={handleSearch}
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
            <FilterArea filters={filters} setFilters={setFilters} />
          </div>
          {allBlogsLoading && (
            <div className="col-span-9">
              <Spinner />
            </div>
          )}

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
