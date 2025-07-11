import SectionTitle from "../../components/sectionTiltle/SectionTitle";
import FilterArea from "../../components/FilterArea/FilterArea";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaRegRectangleXmark } from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "../../components/courseCard/CourseCard";
import Spinner from "../../shared/spinner/Spinner";
import { Helmet } from "react-helmet-async";
import Pagination from "../../components/pagination";

const Exams = () => {
  const axiosPublic = useAxiosPublic();
  const [isFilterView, setIsFilterView] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSortValue, setSelectedSortValue] = useState("");

  // sorting handler
  const handleSort = (e) => {
    setSelectedSortValue(e.target.value);
  };

  // filters default value
  const [filters, setFilters] = useState({
    type: "all",
    classs: {
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
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


  const transformToQuery = (filters) => {
    const params = new URLSearchParams();

    // Add sort by to the params
    if (selectedSortValue) {
      params.append("sortBy", selectedSortValue);
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

  // get total course count based on queries::: this will be need to calc pagination
  const { data: courseCount = {}, refetch: refetchCourseCount } = useQuery({
    queryKey: ["courseCount", queryString],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/get-all-courses?${queryString}&count=1`
      );
      return res.data;
    },
  });

  // calculate number of page and page sequence
  const numberOfPage = Math.ceil(courseCount?.count / itemsPerPage);
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

  const {
    data: allCourses = [],
    isLoading: allCourseLoading,
    refetch,
  } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-all-courses?${queryString}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
    refetchCourseCount();
  }, [queryString, refetch, refetchCourseCount]);

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };


  return (
    <div>
      <Helmet>
        <title>Assessley | Courses</title>
      </Helmet>
      <div className="mt-18 bg-primaryColor/10 py-8">
        <SectionTitle header={"All Courses"}></SectionTitle>{" "}
      </div>

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
      <div className="grid grid-cols-12 max-w-screen-2xl mx-auto px-4 mt-12 gap-6">
        {/* filter area  */}
        <div className="lg:col-span-3 hidden lg:inline">
          <FilterArea filters={filters} setFilters={setFilters} />
        </div>

        {/* Course card area  */}
        <div className="col-span-12 lg:col-span-9">
          {/* sorting area */}
          <div className="flex justify-between lg:justify-end gap-6 items-center bg-primaryColor/10 p-4 rounded-xl">
            {/* filter section for small and medium devices  */}
            <div className="inline lg:hidden">
              <span
                onClick={() => setIsFilterView(true)}
                className="text-primaryColor text-xl"
              >
                <FaFilter />
              </span>
            </div>

            {/* per page count  */}
            <div className="hidden lg:inline">
              <div className="flex items-center gap-2 ">
                <p className="text-sm lg:text-md">Show:</p>
                <select
                  defaultValue={itemsPerPage}
                  onChange={handleItemsPerPage}
                  name="pagePerView"
                  id="pagePerView"
                  className="rounded-lg px-2 py-1 bg-white"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                </select>
              </div>
            </div>
            {/* sort item  */}
            <div className="flex items-center gap-2">
              <p className="text-sm lg:text-md">Sort by:</p>
              <select
                onChange={handleSort}
                name="sortBy"
                id="sortBy"
                className="rounded-lg px-2 py-1 bg-white"
              >
                <option value="Default">Default</option>
                <option value="pl2h">Price (Low → High)</option>
                <option value="ph2l">Price (High → Low)</option>
                <option value="cs2l">Class (Small → Large)</option>
                <option value="cl2s">Class (Large → Small)</option>
              </select>
            </div>
          </div>
          {allCourseLoading && <Spinner />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {allCourses.map((course) => (
              <CourseCard key={course?.courseId} course={course}></CourseCard>
            ))}
          </div>
        </div>
      </div>
      {/* pagination  */}
      <Pagination
        pagesSequence={pagesSequence}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
};

export default Exams;
