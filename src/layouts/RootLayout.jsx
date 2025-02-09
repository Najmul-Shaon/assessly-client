import { Outlet } from "react-router-dom";
import NavBar from "../shared/navbar/NavBar";
import Footer from "../shared/footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-[calc(100vh-436px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
