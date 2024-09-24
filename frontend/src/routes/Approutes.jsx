import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import AddDestination from "../pages/destination/addDestination";
import AllDestination from "../pages/destination/allDestination";
import EditDestinationPage from "../pages/destination/EditDestinationPage";
import DestinationList from "../pages/destination/DestinationList";
import DestinationDetail from "../pages/destination/DestinationDetail";
import DestinationAnalytics from "../pages/destination/DestinationAnalytics";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-destination" element={<AddDestination />} />
                <Route path="/view-destinations" element={<AllDestination />} />
                <Route path="/edit-destination/:id" element={<EditDestinationPage />} />
                <Route path="/destinations" element={<DestinationList />} />
                <Route path="/destination/:id" element={<DestinationDetail />} />
                <Route path="/analytics" element={<DestinationAnalytics />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;

