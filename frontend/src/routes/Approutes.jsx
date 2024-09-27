
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"
import UpdateEquipment from "../pages/sakindu/UpdateEquipment"
import EquipmentUserView from "../pages/sakindu/EquipmentList"
import IndividualEquipment from "../pages/sakindu/IndividualEquipment"; 
import AdminUpdateEquipment from "../pages/dashboard/Sakindu Dashbaord/UpdateEquipment";
import Admin from "../pages/dashboard/Admin";



function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/updateequipment/:id" element={<UpdateEquipment />} />
                <Route path="/userequipment" element={<EquipmentUserView />} />
                <Route path="/equipment/:id" element={<IndividualEquipment />} />

                
                <Route path="/Equipment-dashboard/updateequipment/:id" element={<AdminUpdateEquipment />} />

                <Route 
                    path="/dashboard" 
                    element={
                        //<ProtectedRoute adminOnly>
                            <Admin />
                        //</ProtectedRoute>
                    } 
                />
              
                
            </Routes>
        </Router>
    );
}

export default AppRoutes;
