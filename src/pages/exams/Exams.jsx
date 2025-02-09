import SectionTitle from "../../components/sectionTiltle/SectionTitle";
import ExamCard from "../../components/examCard/ExamCard";
import FilterArea from "./FilterArea/FilterArea";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { FaRegRectangleXmark, FaStar } from "react-icons/fa6";

const Exams = () => {
  const [isFilterView, setIsFilterView] = useState(false);
  console.log(isFilterView);
  return (
    <div className="">
      <div className="mt-18 bg-primaryColor/10 py-8">
        <SectionTitle header={"All Exams"}></SectionTitle>{" "}
      </div>

      {isFilterView && (
        <div className="flex absolute z-40">
          <FilterArea></FilterArea>
          <span
            onClick={() => setIsFilterView(!isFilterView)}
            className="-ms-8 mt-2 text-2xl text-accentColor"
          >
            <FaRegRectangleXmark />
          </span>
        </div>
      )}

      {isFilterView && (
        <div
          onClick={() => setIsFilterView(!isFilterView)}
          className="min-w-screen min-h-screen absolute bg-primaryColor opacity-50 z-30"
        ></div>
      )}
      <div className="grid grid-cols-12 max-w-screen-xl mx-auto px-4 mt-12 gap-6">
        {/* filter area  */}
        <div className="lg:col-span-2 hidden lg:inline">
          <FilterArea></FilterArea>
        </div>

        {/* exam card area  */}
        <div className="col-span-12 lg:col-span-10">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
          {/* sorting area */}
          <div className="flex justify-between lg:justify-end gap-6 items-center bg-secondaryColor p-4 rounded-xl">
            {/* filter section for small and medium devices  */}
            <div className="inline lg:hidden">
              <span
                onClick={() => setIsFilterView(!isFilterView)}
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
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
          </div>
          {/* </div> */}
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
  );
};

export default Exams;
