import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import About from "../pages/About/About";
import CommingSoon from "../components/commingSoon/commingSoon";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Exams from "../pages/exams/Exams";

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
        path: "/exams",
        element: <Exams></Exams>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/blogs",
        element: <CommingSoon></CommingSoon>,
      },
    ],
  },
]);
