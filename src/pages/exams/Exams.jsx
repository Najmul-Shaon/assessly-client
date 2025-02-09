import SectionTitle from "../../components/sectionTiltle/SectionTitle";
import ExamCard from "../../components/examCard/ExamCard";
import FilterArea from "./FilterArea/FilterArea";

const Exams = () => {
  return (
    <div className="">
      <div className="mt-18 bg-primaryColor/10 py-8">
        <SectionTitle header={"All Exams"}></SectionTitle>{" "}
      </div>
      <div className="grid grid-cols-12 max-w-screen-xl mx-auto px-4 mt-12 gap-6">
        {/* filter area  */}
        <div className="col-span-2">
          <FilterArea></FilterArea>
        </div>
        {/* exam card area  */}
        <div className="col-span-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* sorting area */}
            <div className="col-span-3 flex justify-end gap-6 items-center bg-secondaryColor p-4 rounded-xl">
              <div className="flex items-center gap-2 justify-end">
                <p>Show:</p>
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
              <div className="flex items-center gap-2 justify-end">
                <p>Sort by:</p>
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
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
            <ExamCard></ExamCard>
          </div>
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
