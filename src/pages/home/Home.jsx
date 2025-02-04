import Banner from "./banner/Banner";
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
    </div>
  );
};

export default Home;
