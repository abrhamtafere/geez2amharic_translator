import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import TopBar from "./components/Navigation/TopBar";
import Demo from "./pages/Demo";
import SideBar from "./components/Navigation/SideBar";

function App() {
  return (
    <Router>
      <div className="">
        <TopBar />
        <SideBar />
        <Demo />
      </div>
      <div className="">{/* //routes here ! */}</div>
    </Router>
  );
}

export default App;
