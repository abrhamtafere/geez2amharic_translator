import { useSelector } from "react-redux";
import AboutUs from "../components/AboutUs/AboutUs";
import HomePage from "../components/HomePage/HomePage";
import { useNavigate } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import UnregisteredUserMessage from "../components/HomePage/UnregisteredUserMessage";

// import { selectToken } from "../redux/slice/authSlice";

const Home = () => {
  const navigate = useNavigate();
  // const token = useSelector(selectToken);
  const { user } = useSelector((state) => state.auth);

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="mb-[-20rem] rounded-lg shadow-lg relative ">
        <div className="p-4 pt-8">
          {/* if user is not login */}
          {user ? (
            <div className="text-end pr-6 mb-[-3rem]">
              <div className="flex justify-end gap-4">
                <button
                  className="flex items-center justify-center gap-2 bg-white text-light-blue-500 p-2 px-4 rounded hover:shadow-2xl hover:text-light-blue-700 font-semibold"
                  title="go to profile"
                  onClick={handleProfile}
                >
                  <FaUserCog className="text-gray-700" />
                  <span> Welcome <span className=''>{user}</span></span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 bg-white text-light-blue-500 p-2 px-4 rounded hover:shadow-2xl hover:text-light-blue-700 font-semibold "
                  onClick={handleLogout}
                >
                  <MdLogout className="text-gray-700" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-end pr-6 mb-[-3rem]">
              <div className="flex justify-end gap-4">
                <button
                  className="flex items-center justify-center gap-2 bg-white text-light-blue-500 p-2 px-4 rounded hover:shadow-2xl hover:text-light-blue-700 font-semibold"
                  onClick={handleLogin}
                >
                  <MdLogin className="text-gray-700" />
                  Login
                </button>
                <button
                  className="flex items-center justify-center gap-2 bg-white text-light-blue-500 p-2 px-4 rounded hover:shadow-2xl hover:text-light-blue-700 font-semibold"
                  onClick={handleRegister}
                >
                  <GiArchiveRegister className="text-gray-700" />
                  Register
                </button>
              </div>
            </div>
          )}
          <div
            className="flex items-center justify-center text-2xl font-bold text-white sm:text-xl lg:text-4xl h-44 p-8 bg-cover bg-center rounded-md overflow-hidden text-center shadow-md stroke-black mb-8 bg-gray-100"
            style={{ backgroundImage: `url("/images/bg-sign-up-cover.jpeg")` }}
          >
            Geez to Amharic Translator
          </div>
        </div>
        <HomePage />
        <UnregisteredUserMessage />
        <AboutUs />
      </div>
    </div>
  );
};

export default Home;
