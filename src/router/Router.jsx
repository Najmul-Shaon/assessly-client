import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <h3>this is home</h3>,
      },
      {
        path: "/exams",
        element: <h3>This is exams</h3>,
      },
    ],
  },
]);
