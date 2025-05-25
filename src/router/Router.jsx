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
import PaymentCancel from "../components/Payment/PaymentCancel";
import MyExams from "../Dashboard/RegularUser/MyExam/MyExams";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "../layouts/AdminRoute";
import Features from "../pages/Features/Features";
import MyCourses from "../Dashboard/RegularUser/MyCourses/MyCourses";
import MyReadBlogs from "../Dashboard/RegularUser/MyReadBlogs/MyReadBlogs";
import PaymentHistory from "../Dashboard/RegularUser/PaymentHistory/PaymentHistory";
import MyProfile from "../Dashboard/RegularUser/MyProfile/MyProfile";
import MyCertificate from "../Dashboard/RegularUser/MyCertificate/MyCertificate";
import ExamLayout from "../layouts/ExamLayout";
import CourseVideoPage from "../Dashboard/RegularUser/MyCourses/CourseVideoPage";
import FaceTracker from "../pages/ExamLive/FaceDirectionDetector/FaceDirectionDetector";

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
        element: (
          <PrivateRoute>
            <ExamDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/course/details/:id",
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/details/:id",
        element: (
          // <PrivateRoute>
          <BlogDetails />
          // </PrivateRoute>
        ),
      },
      {
        path: "/features",
        element: <Features />,
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
      {
        path: "payment/cancel/:trxId",
        element: <PaymentCancel />,
      },
      {
        path: "video",
        element: <FaceTracker />,
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
        element: (
          <PrivateRoute>
            <RegularUserHome />
          </PrivateRoute>
        ),
      },
      {
        path: "my-courses",
        element: (
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "my-course/:id",
        element: (
          <PrivateRoute>
            <CourseVideoPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-exam",
        element: (
          <PrivateRoute>
            <MyExams />
          </PrivateRoute>
        ),
      },
      {
        path: "my-blogs",
        element: (
          <PrivateRoute>
            <MyReadBlogs />
          </PrivateRoute>
        ),
      },
      {
        path: "my-payments",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-certificates",
        element: (
          <PrivateRoute>
            <MyCertificate />
          </PrivateRoute>
        ),
      },

      // regular user area end

      // admin area start
      {
        path: "admin-home",
        element: (
          // <AdminRoute>
          <AdminHome />
          // </AdminRoute>
        ),
      },
      {
        path: "all-exams",
        element: (
          <AdminRoute>
            <AllExams />
          </AdminRoute>
        ),
      },
      {
        path: "add-exam",
        element: (
          <AdminRoute>
            <AddExam />
          </AdminRoute>
        ),
      },
      {
        path: "manage-questions",
        element: (
          <AdminRoute>
            <ManageQuestions />
          </AdminRoute>
        ),
      },
      {
        path: "manage-questions/details/:id",
        element: (
          <AdminRoute>
            <IndividualQuestionDetails />
          </AdminRoute>
        ),
      },
      {
        path: "manage-questions/edit/:id",
        element: (
          <AdminRoute>
            <IndividualQuestionEdit />
          </AdminRoute>
        ),
      },
      {
        path: "all-courses",
        element: (
          <AdminRoute>
            <AllCourses />
          </AdminRoute>
        ),
      },
      {
        path: "add-course",
        element: (
          <AdminRoute>
            <AddCourse />
          </AdminRoute>
        ),
      },
      {
        path: "all-blog",
        element: (
          <AdminRoute>
            <AllBlog />
          </AdminRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <AdminRoute>
            <AddBlog />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-payments",
        element: (
          <AdminRoute>
            <CommingSoon />
          </AdminRoute>
        ),
      },
      // admin area end
    ],
  },
  {
    path: "/exam/live/:id",
    element: (
      <PrivateRoute>
        <ExamLayout />
      </PrivateRoute>
    ),
  },
]);
