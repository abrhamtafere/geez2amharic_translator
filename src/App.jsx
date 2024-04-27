import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/Navigation/TopBar";
import Demo from "./pages/Demo";
import SideBar from "./components/Navigation/SideBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SingIn";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Router>
      <div className="app-container">
        <TopBar />
        <div className="cflex">
          <SideBar />
          {/* Main content area where routes will render the component */}
          <div className="content ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<SingIn />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
