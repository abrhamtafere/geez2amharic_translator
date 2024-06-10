import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMenuOpen } from "react-icons/md";
import { setShowSidebar } from "../../redux/slice/translationSlice";
import { FiLogOut } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { selectUser } from "../../redux/slice/authSlice";
// import { MdDashboard } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
// import { SiGnuprivacyguard} from 'react-icons/si'

// eslint-disable-next-line react/prop-types
const SideBar = () => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const sidebarRef = useRef(null);
  const { showSidebar } = useSelector((state) => state.translation);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  // dark mode functionality
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handler to close the sidebar if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        showSidebar === "left-0"
      ) {
        dispatch(setShowSidebar()); // This will toggle the sidebar to close
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, showSidebar]); // Include showSidebar in the dependency array

  return (
    <div ref={sidebarRef} className="flex mt-16">
      <span
        className="bg-white rounded-r-md z-50 "
        onClick={() => dispatch(setShowSidebar())}
      >
        <MdOutlineMenuOpen
          className={`size-8 shadow-xl bg-black/40 hover:bg-black/80  text-white  zrounded-l ${
            showSidebar === "left-0" ? "rounded-r" : "rotate-180 rounded-l "
          } fixed`}
        />
      </span>
      <div
        className={`h-screen fixed xmd:left-0 ${showSidebar} flex-row flex-nowrap  Xshadow-xl w-64 z-10 py-2 px-2 pr-1 transition-all duration-300 Xoverflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/80 scrollbar-track-gray-100 `}
      >
        <div className="flex bg-gray-800 text-white min-h-[84vh] xmd:h-[86vh] rounded-xl mb-16">
          <ul className="flex flex-col kjustify-center  py-4 w-full">
            {/* {user && (
              <li className={``}>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-4  font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4 px-4 py-3 rounded-lg mx-2 ${
                    currentUrl === "/dashboard"
                      ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                      : ""
                  }`}
                >
                  <MdDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              </li>
            )} */}
            <li className={``}>
              <Link
                to="/"
                className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
                  currentUrl === "/"
                    ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                    : ""
                }`}
              >
                <HiHome className="w-5 h-5" />
                Home
              </Link>
            </li>
            {user && (
              <li className={``}>
                <Link
                  to="/history"
                  className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
                    currentUrl === "/history"
                      ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                      : ""
                  }`}
                >
                  <MdFavorite className="w-5 h-5" />
                  Favorites
                </Link>
              </li>
            )}

            {user && (
              <li className={``}>
                <Link
                  to="/profile"
                  className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
                    currentUrl === "/profile"
                      ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                      : ""
                  }`}
                >
                  <BiUser className="w-5 h-5" />
                  Profile
                </Link>
              </li>
            )}
            <div className="w-full flex items-center mx-2 px-6 py-2 text-gray-400 font-semibold ">
              AUTH PAGES
            </div>
            {!user && (
              <>
                <li className={` `}>
                  <Link
                    to="/login"
                    className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
                      currentUrl === "/login"
                        ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                        : ""
                    }`}
                  >
                    <PiSignInBold className="w-5 h-5" />
                    Login
                  </Link>
                </li>

                <li className={` `}>
                  <Link
                    to="/signup"
                    className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
                      currentUrl === "/signup"
                        ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                        : ""
                    }`}
                  >
                    <FaUserPlus className="w-5 h-5" />
                    Register
                  </Link>
                </li>
              </>
            )}

            {user && (
              <li className={` `}>
                <Link
                  to="/logout"
                  className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
                    currentUrl === "/logout"
                      ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                      : ""
                  }`}
                >
                  <FiLogOut className="w-5 h-5" />
                  Logout
                </Link>
              </li>
            )}

            <li className={` hidden`}>
              <Link
                onClick={() => setDarkMode(!darkMode)}
                // to="/dark"
                className={`flex items-center gap-4   font-semi-bold hover:bg-gray-700 py-2 px-4 cursor-pointer mb-4  px-4 py-3 rounded-lg mx-2 ${
                  currentUrl === "/dark"
                    ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white hover:shadow-sm hover:shadow-blue-200"
                    : ""
                }`}
              >
                {darkMode ? <MdLightMode className="w-5 h-5" />:
                <MdDarkMode className="w-5 h-5" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
                {/* Dark Mode */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
