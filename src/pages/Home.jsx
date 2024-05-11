import { useSelector } from "react-redux";
import AboutUs from "../components/AboutUs/AboutUs";
import HomePage from "../components/HomePage/HomePage";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="bg-gray-100">
      {
        user ? <div className="flex pr-4 bg-green-500 w-full justify-end">{user} logout</div>: <div className="flex pr-4 bg-green-500 w-full justify-end">login</div>
      }
      
      
      <div
        className="relative text-center py-16 bg-contain bg-center sm:bg-left lg:bg-bottom"
        style={{ backgroundImage: "url('/Images/geezalphabet.png')" }}
      >
        <h1 className="text-2xl font-bold text-light-blue-700 sm:text-xl lg:text-3xl ">
          Geez to Amharic Translator
        </h1>
      </div>
      <HomePage />
      <AboutUs />
      <button className='bg-orange-500' onClick={handleLogout}>logout</button>

    </div>
  );
};

export default Home;
