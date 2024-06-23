import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "/logo-yellow.png";
import UseAuth from "../../hooks/useAuth";
import Profile from "../Profile/Profile";
import ScaleLoader from "react-spinners/ScaleLoader";
import WhiteButton from "../Shared/WhiteButton";
import useUser from "../../hooks/useUser";

const Navbar = () => {
  const { user, loading } = UseAuth();
  const [menu, setMenu] = useState(false);
  const [role, isLoading] = useUser();
  console.log(role);

  // const menuName = role === "user" && "User Dashboard";

  const routes1 = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "All Scholarship",
      path: "/all-scholarship",
    },
  ];

  const routes2 = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "All Scholarship",
      path: "/all-scholarship",
    },
    {
      id: 3,
      name:
        role === "moderator"
          ? "Moderator Dashboard"
          : role === "admin"
          ? "Admin Dashboard"
          : "User Dashboard",
      path: 'dashboard/my-profile',
    },
  ];

  let routes = null;
  if (user) {
    routes = routes2;
  } else {
    routes = routes1;
  }

  return (
    <header className="p-2 px-3 lg:px-6 h-[80px] sticky top-0 z-50 bg-navy">
      <div className="max-w-7xl flex justify-between items-center h-16 mx-auto relative">
        <button
          onClick={() => setMenu(!menu)}
          className="flex justify-end md:hidden text-white"
        >
          {menu ? (
            <IoClose className="text-4xl" />
          ) : (
            <IoMenu className="text-4xl" />
          )}
        </button>
        <Link to="/" className="flex md:flex-1 items-center  gap-2">
          <img className="w-10 h-10 md:w-12 md:h-12" src={logo} alt="" />
          <span className="font-bold text-2xl md:text-3xl text-white">
            Scholar<span className="text-yellow">Vista</span>.{" "}
          </span>
        </Link>

        <ul className="items-stretch hidden space-x-6 md:flex text-white px-6">
          {routes.map((route) => (
            <li key={route.id}>
              <Link
                className="font-medium text-lg hover:text-yellow ease-in-out duration-300 cursor-pointer"
                to={`${route.path}`}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className={`${
            menu
              ? "absolute md:hidden top-16 -left-4 px-4 py-8 pr-16 sm:pr-40 space-y-3 duration-300 transition-all ease-in-out shadow-md rounded-md z-50 bg-navy text-white"
              : "absolute md:hidden -left-80 top-16 space-y-3 transition-all duration-500 text-navy bg-white"
          } `}
        >
          {routes.map((route) => (
            <li key={route.id}>
              <Link
                className="font-semibold text-lg hover:text-yellow ease-in-out duration-300 cursor-pointer active:border-b-2 p-4"
                to={`${route.path}`}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>

{/* profile  */}
        <div className="flex items-center gap-8">
          {loading ? (
            <ScaleLoader height={30} width={3} color="#F2A227" />
          ) : !loading && user ? (
            <Profile user={user} />
          ) : (
            <Link
              to="/login"
              className="block 2xl: px-5 py-1.5 text-white border-2 hover:bg-white hover:text-navy rounded-sm text-lg font-semibold md:font-bold ease-in-out duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
