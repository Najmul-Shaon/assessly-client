import { Helmet } from "react-helmet-async";
import Banner from "./banner/Banner";
import Highliights from "./highlights/Highliights";
import PopulerBlogs from "./PopulerBlogs/PopulerBlogs";
import PopulerCourses from "./populerCourses/PopulerCourses";
import PopulerExams from "./populerExams/PopulerExams";
import WhyUs from "./whyUs/WhyUs";
// import CourseCard2 from "../../components/CourseCard2";

const Home = () => {
  return (
    <div className="mt-18 lg:mt-20">
      <Helmet>
        <title>Assessley | Home</title>
      </Helmet>
      <Banner />
      <PopulerExams />
      <PopulerCourses />
      <PopulerBlogs />
      <WhyUs />
      <Highliights />
      {/* <CourseCard2/> */}
    </div>
  );
};

export default Home;
