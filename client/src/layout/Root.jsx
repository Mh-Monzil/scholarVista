import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Root = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <div className="container sm:px-0 2xl:max-w-[1920px] mx-auto ">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
