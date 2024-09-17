
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"
import Onboarding from "../pages/Dinitha/Onboarding"
import Profile from "../pages/Dinitha/Profile"
import ProtectedRoute from "../components/ProtectedRoute"

function AppRoutes() {
    return (

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/profile"
                            element={
                                <ProtectedRoute>
                                <Profile />
                                </ProtectedRoute>
                            }
                            />
                    </Routes>
            </Router>
        
    );
}

export default AppRoutes;


