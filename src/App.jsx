import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import TopBar from "./components/Navigation/TopBar";
import Demo from "./pages/Demo";
import SideBar from "./components/Navigation/SideBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SingIn";
import Profile from "./components/Profile/Profile";
import History from "./components/Profile/History";
import Logout from "./components/Auth/Logout";
import LoginSuccess from "./components/Auth/LoginSuccess";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <TopBar /> */}
        {/* <div className="cflex"> */}
        <SideBar />
        {/* Main content area where routes will render the component */}
        <div className="Xcontent ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<SingIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/login-success" element={<LoginSuccess />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          {/* </div> */}
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
