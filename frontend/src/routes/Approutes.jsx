
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"
import AddEquipment from "../pages/sakindu/AddEquipment"
import AllEquipment from "../pages/sakindu/Inventory"
import UpdateEquipment from "../pages/sakindu/UpdateEquipment"
import EquipmentUserView from "../pages/sakindu/EquipmentList"
import IndividualEquipment from "../pages/sakindu/IndividualEquipment"; 
import AdminCreateEquipment from "../pages/dashboard/Sakindu Dashbaord/CreateEquipment";
import AdminManageEquipment from "../pages/dashboard/Sakindu Dashbaord/ManageEquipment";
import AdminUpdateEquipment from "../pages/dashboard/Sakindu Dashbaord/UpdateEquipment";



function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/addequipment" element={<AddEquipment />} />
                <Route path="/inventory" element={<AllEquipment />} />
                <Route path="/updateequipment/:id" element={<UpdateEquipment />} />
                <Route path="/userequipment" element={<EquipmentUserView />} />
                <Route path="/equipment/:id" element={<IndividualEquipment />} />

                <Route path="/Equipment-dashboard/AddEquipment" element={<AdminCreateEquipment />} />
                <Route path="/Equipment-dashboard" element={<AdminManageEquipment />} />
                <Route path="/Equipment-dashboard/updateequipment/:id" element={<AdminUpdateEquipment />} />
              
                
            </Routes>
        </Router>
    );
}

export default AppRoutes;
