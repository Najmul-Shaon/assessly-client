// import CountUp from "react-countup";
// import SectionTitle from "../../../components/sectionTiltle/SectionTitle";

// const Highliights = () => {
//   return (
//     <div className="mt-24 max-w-screen-2xl mx-auto px-4">
//       <SectionTitle
//         header={"Key Stats & Insights"}
//         subHeader={"Stay updated with the latest exam stats and progress"}
//       ></SectionTitle>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
//         <div className="flex flex-col items-center bg-primaryColor/20 p-8 rounded-l-4xl rounded-br-4xl border-t-4 border-e-4 border-primaryColor">
//           <h3 className="text-3xl font-bold">
//             <CountUp end={100} duration={3} />+
//           </h3>

//           <p className="text-textColor text-lg">Total Examine</p>
//         </div>
//         <div className="flex flex-col items-center bg-primaryColor/20 p-8 rounded-l-4xl rounded-br-4xl border-t-4 border-e-4 border-primaryColor">
//           <h3 className="text-3xl font-bold">
//             <CountUp end={10} duration={2} />+
//           </h3>
//           <p className="text-textColor text-lg">Total Exams</p>
//         </div>
//         <div className="flex flex-col items-center bg-primaryColor/20 p-8 rounded-l-4xl rounded-br-4xl border-t-4 border-e-4 border-primaryColor">
//           <h3 className="text-3xl font-bold">
//             <CountUp end={10} duration={2} />+
//           </h3>

//           <p className="text-textColor text-lg">Total Blogs</p>
//         </div>
//         <div className="flex flex-col items-center bg-primaryColor/20 p-8 rounded-l-4xl rounded-br-4xl border-t-4 border-e-4 border-primaryColor">
//           <h3 className="text-3xl font-bold">
//             <CountUp end={10} duration={2} />+
//           </h3>

//           <p className="text-textColor text-lg">Total Subject</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Highliights;

import CountUp from "react-countup";
import SectionTitle from "../../../components/sectionTiltle/SectionTitle";

const Highlights = () => {
  return (
    <div className="mt-24 max-w-screen-2xl mx-auto px-4">
      <SectionTitle
        header="Key Stats & Insights"
        subHeader="Stay updated with the latest exam stats and progress"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {/* Stat Card */}
        {[
          { end: 100, label: "Total Examine", duration: 3 },
          { end: 10, label: "Total Exams", duration: 2 },
          { end: 10, label: "Total Blogs", duration: 2 },
          { end: 10, label: "Total Subject", duration: 2 },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center justify-center text-center p-10 rounded-3xl overflow-hidden border border-primaryColor shadow-lg bg-gradient-to-br from-primaryColor/20 to-white backdrop-blur-sm transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300"
          >
            {/* Decorative Blobs */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primaryColor/30 rounded-full blur-2xl opacity-30"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primaryColor/40 rounded-full blur-2xl opacity-20"></div>

            {/* Count */}
            <h3 className="text-5xl font-extrabold text-primaryColor drop-shadow-md">
              <CountUp end={stat.end} duration={stat.duration} />+
            </h3>
            <p className="mt-2 text-textColor text-lg font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
