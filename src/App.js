import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminProjectApproval from "./pages/AdminProjectApproval";
import MyApplications from "./pages/MyApplications";
import Projects from "./pages/Projects";

function App() {
  return (
    // <Router>

    // </Router>
    <Router>
      <div className="App">
        <LandingPage />
      </div>
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/admin" element={<AdminProjectApproval />} />
      </Routes>
    </Router>
  );
}

export default App;
