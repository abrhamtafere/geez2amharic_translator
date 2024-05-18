import { FaInfoCircle } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UnregisteredUserMessage = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 mb-8">
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md text-center">
        <div className="flex items-center justify-center mb-4">
          <FaInfoCircle className="text-blue-500 dark:text-blue-300 text-2xl mr-2" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Login to Get More Features
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Login to access additional features including file uploading and
          saving your favorites.
        </p>
        <button
                  className="flex items-center justify-center gap-2 bg-light-blue-500 text-white p-2 px-4 rounded hover:shadow-2xl hover:text-light-blue-700 font-semibold mt-2 hidden"
                  onClick={handleLogin}
                >
                  <MdLogin className="text-gray-700" />
                  Login
                </button>
      </div>
      
    </div>
  );
};

export default UnregisteredUserMessage;
