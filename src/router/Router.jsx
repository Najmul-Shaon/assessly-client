import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import About from "../pages/About/About";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Exams from "../pages/exams/Exams";
import Blogs from "../pages/blogs/Blogs";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ExamDetails from "../pages/exams/ExamDetails";
import BlogDetails from "../pages/blogs/BlogDetails";
import Dashboard from "../layouts/Dashboard";
import AdminHome from "../Dashboard/Admin/AdminHome/AdminHome";
import CommingSoon from "../components/commingSoon/CommingSoon";

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
    ],
  },

  //dashboard area
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "manage-exams",
        element: <CommingSoon />,
      },
      {
        path: "manage-users",
        element: <CommingSoon />,
      },
      {
        path: "manage-questions",
        element: <CommingSoon />,
      },
    ],
  },
]);
