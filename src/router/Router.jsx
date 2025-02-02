import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import About from "../pages/About/About";
import CommingSoon from "../components/commingSoon/commingSoon";
import ErrorPage from "../pages/errorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <h3>this is home</h3>,
      },
      {
        path: "/exams",
        element: <CommingSoon></CommingSoon>,
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
