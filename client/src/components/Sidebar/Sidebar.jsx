import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "/logo-yellow.png";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { FaFileAlt } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import useUser from "../../hooks/useUser";
import ScaleLoader from "react-spinners/ScaleLoader";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useUser();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-navy text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      
        <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-navy w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center bg-navy mx-auto">
              <Link to="/" className="flex md:flex-1 items-center  gap-2">
                <img className="w-8 h-8 md:w-12 md:h-12" src={logo} alt="" />
                <span className="font-bold text-2xl text-white">
                  Scholar<span className="text-yellow">Vista</span>.{" "}
                </span>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* my profile */}
              <NavLink
                to="my-profile"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                    isActive
                      ? "bg-white text-navy"
                      : "text-white hover:bg-orange-100 "
                  }`
                }
              >
                <ImProfile />
                <span className="mx-4 font-medium">My Profile</span>
              </NavLink>

              {/* user ////////////////// */}
              {role === "user" && (
                <>
                  {/* my application */}
                  <NavLink
                    to="my-application"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white    hover:text-navy ${
                        isActive
                          ? "bg-white text-navy"
                          : "text-white hover:bg-orange-100 "
                      }`
                    }
                  >
                    <FaFileAlt />
                    <span className="mx-4 font-medium">My Application</span>
                  </NavLink>

                  {/* My reviews */}
                  <NavLink
                    to="my-reviews"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                        isActive
                          ? "bg-white text-navy"
                          : "text-white hover:bg-orange-100 "
                      }`
                    }
                  >
                    <MdRateReview />
                    <span className="mx-4 font-medium">My Reviews</span>
                  </NavLink>
                </>
              )}

              {role === "moderator" && (
                <>
                  {/* manage scholarships */}
                  <NavLink
                    to="manage-scholarships"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white   hover:text-navy ${
                        isActive
                          ? "bg-white text-navy"
                          : "text-white hover:bg-orange-100 "
                      }`
                    }
                  >
                    <FaFileAlt />
                    <span className="mx-4 font-medium">
                      Manage Scholarships
                    </span>
                  </NavLink>

                  {/* all reviews */}
                  <NavLink
                    to="all-reviews"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                        isActive
                          ? "bg-white text-navy"
                          : "text-white hover:bg-orange-100 "
                      }`
                    }
                  >
                    <MdRateReview />
                    <span className="mx-4 font-medium">All Reviews</span>
                  </NavLink>

                  {/* all applied scholarship */}
                  <NavLink
                    to="all-applied-scholarship"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                        isActive
                          ? "bg-white text-navy"
                          : "text-white hover:bg-orange-100 "
                      }`
                    }
                  >
                    <MdRateReview />
                    <span className="mx-4 font-medium">
                      All Applied Scholarship
                    </span>
                  </NavLink>

                  {/* add scholarship */}
                  <NavLink
                    to="add-scholarship"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                        isActive
                          ? "bg-white text-navy"
                          : "text-white hover:bg-orange-100 "
                      }`
                    }
                  >
                    <MdRateReview />
                    <span className="mx-4 font-medium">Add Scholarship</span>
                  </NavLink>
                </>
              )}

              {role === "admin" && (
                <>
                  {/* add scholarship */}
                  <NavLink
                    to="add-scholarship"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                        isActive
                          ? "bg-white text-navy"
                          : "text-white hover:bg-orange-100 "
                      }`
                    }
                  >
                    <MdRateReview />
                    <span className="mx-4 font-medium">Add Scholarship</span>
                  </NavLink>

                  {/* manage scholarships */}
                  <NavLink
                    to="manage-scholarships"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                    isActive
                      ? "bg-white text-navy"
                      : "text-white hover:bg-orange-100 "
                  }`
                    }
                  >
                    <FaFileAlt />
                    <span className="mx-4 font-medium">
                      Manage Scholarships
                    </span>
                  </NavLink>

                  {/* manage applied application */}
                  <NavLink
                    to="all-applied-scholarship"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                    isActive
                      ? "bg-white text-navy"
                      : "text-white hover:bg-orange-100 "
                  }`
                    }
                  >
                    <MdRateReview />
                    <span className="mx-4 font-medium">
                      Manage Applied Application
                    </span>
                  </NavLink>

                  {/* manage reviews */}
                  <NavLink
                    to="all-reviews"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                    isActive
                      ? "bg-white text-navy"
                      : "text-white hover:bg-orange-100 "
                  }`
                    }
                  >
                    <MdRateReview />
                    <span className="mx-4 font-medium">Manage Reviews</span>
                  </NavLink>

                  {/* manage users */}
                  <NavLink
                    to="manage-users"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform rounded-md shadow-sm shadow-white hover:text-navy ${
                    isActive
                      ? "bg-white text-navy"
                      : "text-white hover:bg-orange-100 "
                  }`
                    }
                  >
                    <MdRateReview />
                    <span className="mx-4 font-medium">Manage Users</span>
                  </NavLink>

                  
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* logout */}
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-white  hover:bg-orange-100   hover:text-navy transition-colors duration-300 transform shadow-sm shadow-white"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
