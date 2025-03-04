import SectionTitle from "../../components/sectionTiltle/SectionTitle";
import ExamCard from "../../components/examCard/ExamCard";
import FilterArea from "./FilterArea/FilterArea";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { FaRegRectangleXmark } from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const Exams = () => {
  const axiosPublic = useAxiosPublic();
  const [isFilterView, setIsFilterView] = useState(false);

  const { data: allExams = [] } = useQuery({
    queryKey: ["allExams"],
    queryFn: async () => {
      // const res = await axiosPublic("/get/all-exams?type=single");
      const res = await axiosPublic("/get/all-exams?type=single");
      return res.data;
    },
  });

  // console.log(allExams);

  return (
    <div>
      <div className="mt-18 bg-primaryColor/10 py-8">
        <SectionTitle header={"All Exams"}></SectionTitle>{" "}
      </div>

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
      <div className="grid grid-cols-12 max-w-screen-2xl mx-auto px-4 mt-12 gap-6">
        {/* filter area  */}
        <div className="lg:col-span-3 hidden lg:inline">
          <FilterArea></FilterArea>
        </div>

        {/* exam card area  */}
        <div className="col-span-12 lg:col-span-9">
          {/* sorting area */}
          <div className="flex justify-between lg:justify-end gap-6 items-center bg-primaryColor/10 p-4 rounded-xl">
            {/* filter section for small and medium devices  */}
            <div className="inline lg:hidden">
              <span
                onClick={() => setIsFilterView(true)}
                className="text-primaryColor text-xl"
              >
                <FaFilter></FaFilter>
              </span>
            </div>

            {/* per page count  */}
            <div className="hidden lg:inline">
              <div className="flex items-center gap-2 ">
                <p className="text-sm lg:text-md">Show:</p>
                <select
                  defaultValue={12}
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
                defaultValue="Default"
                name="sortBy"
                id="sortBy"
                className="rounded-lg px-2 py-1 bg-white"
              >
                <option value="Default">Default</option>
                <option value="Class (Small → Large)">
                  Class (Small → Large)
                </option>
                <option value="Class (Large → Small)">
                  Class (Large → Small)
                </option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {allExams.map((exam) => (
              <ExamCard key={exam?.examId} exam={exam}></ExamCard>
            ))}
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* pagination  */}
      {/* <div className="flex items-center justify-center mt-12">
        <div className="join">
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">4</button>
        </div>
      </div> */}
      {/* suggestion section  */}
      {/* <div className="mt-12 max-w-screen-2xl mx-auto px-4">
        <div className="divider font-bold text-primaryColor text-2xl mb-8">
          Similar Challanges
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExamCard></ExamCard>
          <ExamCard></ExamCard>
          <ExamCard></ExamCard>
          <ExamCard></ExamCard>
        </div>
      </div> */}
    </div>
  );
};

export default Exams;
