import Banner from "./banner/Banner";
import Highliights from "./highlights/Highliights";
import PopulerBlogs from "./PopulerBlogs/PopulerBlogs";
import PopulerCourses from "./populerCourses/PopulerCourses";
import PopulerExams from "./populerExams/PopulerExams";
import WhyUs from "./whyUs/WhyUs";

const Home = () => {
  return (
    <div className="mt-18 lg:mt-20">
      <Banner />
      <PopulerExams />
      <PopulerCourses />
      <PopulerBlogs />
      <WhyUs />
      <Highliights />
    </div>
  );
};

export default Home;
