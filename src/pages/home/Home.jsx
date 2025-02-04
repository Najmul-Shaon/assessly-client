import Banner from "./banner/Banner";
import Highliights from "./highlights/Highliights";
import PopulerBlogs from "./populerBlogs/populerBlogs";
import PopulerExams from "./populerExams/PopulerExams";
import WhyUs from "./whyUs/WhyUs";

const Home = () => {
  return (
    <div className="mt-18 lg:20">
      <Banner></Banner>
      <PopulerExams></PopulerExams>
      <PopulerBlogs></PopulerBlogs>
      <WhyUs></WhyUs>
      <Highliights></Highliights>
    </div>
  );
};

export default Home;
