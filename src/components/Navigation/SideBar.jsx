import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { FaProjectDiagram, FaUserPlus } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { PiSignInBold } from "react-icons/pi";
import { useSelector } from "react-redux";
// import { SiGnuprivacyguard} from 'react-icons/si'

// eslint-disable-next-line react/prop-types
const SideBar = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const { showSidebar } = useSelector((state) => state.translation);

  return (
    <div
      className={`h-screen fixed md:left-0 ${showSidebar} Xoverflow-y-auto flex-row flex-nowrap overflow-hidden cshadow-xl w-64 z-10 py-2 px-2 pr-1 transition-all duration-300 `}
    >
      <div className="flex bg-gray-800 text-white h-[84vh] md:h-[86vh] rounded-xl soverflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <ul className="py-4 w-full">
          <li
            className={``}
          >
            <Link to="/" className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
              currentUrl === "/"
                ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                : ""
            }`}>
              <HiHome className="w-5 h-5" />
              Dashboard
            </Link>
          </li>

          <li
            className={` `}
          >
            <Link to="/admins" className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
              currentUrl === "/admins"
                ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                : ""
            }`}>
              <RiAdminFill className="w-5 h-5" />
              Users
            </Link>
          </li>

          <li
            className={``}
          >
            <Link to="/projects" className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
              currentUrl === "/projects"
                ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                : ""
            }`}>
              <FaProjectDiagram className="w-5 h-5" />
              History
            </Link>
          </li>
          <li
            className={``}
          >
            <Link to="/settings" className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
              currentUrl === "/settings"
                ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                : ""
            }`}>
              <MdSettings className="w-5 h-5" />
              Settings
            </Link>
          </li>
          <div className="w-full flex items-center mx-2 px-6 py-2 text-gray-400 font-semibold ">
            AUTH PAGES
          </div>
          <li
            className={` `}
          >
            <Link to="/signin" className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
              currentUrl === "/signin"
                ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                : ""
            }`}>
              <PiSignInBold className="w-5 h-5" />
              Sign In
            </Link>
          </li>

          <li
            className={` `}
          >
            <Link to="/signup" className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
              currentUrl === "/signup"
                ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                : ""
            }`}>
              <FaUserPlus className="w-5 h-5" />
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;