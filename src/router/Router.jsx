import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import About from "../pages/About/About";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Exams from "../pages/exams/Exams";
import Blogs from "../pages/blogs/Blogs";
import Login from "../pages/Login/Login";
import CommingSoon from "../components/commingSoon/CommingSoon";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <CommingSoon></CommingSoon>,
      },
      {
        path: "/exams",
        element: <Exams></Exams>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
    ],
  },
]);
