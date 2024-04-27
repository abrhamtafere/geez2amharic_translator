import AboutUs from "../components/AboutUs/AboutUs";
import HomePage from "../components/HomePage/HomePage";

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
