import CountUp from "react-countup";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";

const Highliights = () => {
  return (
    <div className="mt-24 max-w-screen-2xl mx-auto px-4">
      <SectionTitle
        header={"Key Stats & Insights"}
        subHeader={"Stay updated with the latest exam stats and progress"}
      ></SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        <div className="flex flex-col items-center bg-primaryColor/20 p-8 rounded-l-4xl rounded-br-4xl border-t-4 border-e-4 border-primaryColor">
          <h3 className="text-3xl font-bold">
            <CountUp end={100} duration={3} />+
          </h3>

          <p className="text-textColor text-lg">Total Examine</p>
        </div>
        <div className="flex flex-col items-center bg-primaryColor/20 p-8 rounded-l-4xl rounded-br-4xl border-t-4 border-e-4 border-primaryColor">
          <h3 className="text-3xl font-bold">
            <CountUp end={10} duration={2} />+
          </h3>
          <p className="text-textColor text-lg">Total Exams</p>
        </div>
        <div className="flex flex-col items-center bg-primaryColor/20 p-8 rounded-l-4xl rounded-br-4xl border-t-4 border-e-4 border-primaryColor">
          <h3 className="text-3xl font-bold">
            <CountUp end={10} duration={2} />+
          </h3>

          <p className="text-textColor text-lg">Total Class</p>
        </div>
        <div className="flex flex-col items-center bg-primaryColor/20 p-8 rounded-l-4xl rounded-br-4xl border-t-4 border-e-4 border-primaryColor">
          <h3 className="text-3xl font-bold">
            <CountUp end={10} duration={2} />+
          </h3>

          <p className="text-textColor text-lg">Total Subject</p>
        </div>
      </div>
    </div>
  );
};

export default Highliights;
