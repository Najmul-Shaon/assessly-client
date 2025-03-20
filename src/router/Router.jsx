import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import About from "../pages/About/About";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Exams from "../pages/exams/Exams";
import Courses from "../pages/courses/Courses";
import CourseDetails from "../pages/courses/CourseDetails";
import Blogs from "../pages/blogs/Blogs";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ExamDetails from "../pages/exams/ExamDetails";
import BlogDetails from "../pages/blogs/BlogDetails";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../Dashboard/Admin/AdminHome/AdminHome";
import ManageUsers from "../Dashboard/Admin/ManageUsers/ManageUsers";
import AllExams from "../Dashboard/Admin/ManageExams/AllExams";
import AddExam from "../Dashboard/Admin/ManageExams/AddExam";
import ManageQuestions from "../Dashboard/Admin/ManageQuestions/ManageQuestions";
import IndividualQuestionDetails from "../Dashboard/Admin/ManageQuestions/IndividualQuestionDetails";
import IndividualQuestionEdit from "../Dashboard/Admin/ManageQuestions/IndividualQuestionEdit";
import AllBlog from "../Dashboard/Admin/ManageBlogs/AllBlog";
import AddBlog from "../Dashboard/Admin/ManageBlogs/AddBlog";
import RegularUserHome from "../Dashboard/RegularUser/RegularUserHome/RegularUserHome";
import CommingSoon from "../components/commingSoon/CommingSoon";
import AllCourses from "../Dashboard/Admin/ManageCourses/AllCourses";
import AddCourse from "../Dashboard/Admin/ManageCourses/AddCourse";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import PaymentFailed from "../components/Payment/PaymentFailed";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/exams",
        element: <Exams />,
      },
      {
        path: "/exam/details/:id",
        element: <ExamDetails />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/course/details/:id",
        element: <CourseDetails />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/details/:id",
        element: <BlogDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "payment/success/:trxId",
        element: <PaymentSuccess />,
      },
      {
        path: "payment/failed/:trxId",
        element: <PaymentFailed />,
      },
    ],
  },

  //dashboard area
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      // regular user area start
      {
        path: "user-home",
        element: <RegularUserHome />,
      },
      {
        path: "my-courses",
        element: <CommingSoon />,
      },
      {
        path: "my-exam",
        element: <CommingSoon />,
      },
      {
        path: "my-blogs",
        element: <CommingSoon />,
      },
      {
        path: "my-payments",
        element: <CommingSoon />,
      },
      {
        path: "my-profile",
        element: <CommingSoon />,
      },
      {
        path: "my-certificates",
        element: <CommingSoon />,
      },

      // regular user area end

      // admin area start
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "all-exams",
        element: <AllExams />,
      },
      {
        path: "add-exam",
        element: <AddExam />,
      },
      {
        path: "manage-questions",
        element: <ManageQuestions />,
      },
      {
        path: "manage-questions/details/:id",
        element: <IndividualQuestionDetails />,
      },
      {
        path: "manage-questions/edit/:id",
        element: <IndividualQuestionEdit />,
      },
      {
        path: "all-courses",
        element: <AllCourses />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "all-blog",
        element: <AllBlog />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-payments",
        element: <CommingSoon />,
      },
      // admin area end
    ],
  },
]);
