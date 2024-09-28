
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
import Onboarding from "../pages/Dinitha/Onboarding"
import Profile from "../pages/Dinitha/Profile"
import ProtectedRoute from "../components/ProtectedRoute"
import GuestRoute from "../components/GuestRoute"
import Admin from "../pages/dashboard/Admin"
import NotFound from "../components/spinner/404"
import Test from  "../components/test"
import PaymentForm from "../components/PaymentForm";



function AppRoutes() {
    return (
        <Router>
            <Routes>
                
                <Route path="/updateequipment/:id" element={<UpdateEquipment />} />
                <Route path="/userequipment" element={<EquipmentUserView />} />
                <Route path="/equipment/:id" element={<IndividualEquipment />} />

                <Route path="/Equipment-dashboard/updateequipment/:id" element={<AdminUpdateEquipment />} />
           
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                    <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />

                    <Route path="/onboarding" element={<ProtectedRoute> <Onboarding /> </ProtectedRoute> } />
                    <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute adminOnly>
                                <Admin />
                            </ProtectedRoute>
                        } 
                    />

                    <Route path="*" element={<NotFound />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/payment" element={<PaymentForm />} />
             
                </Routes>
                    
            </Router>
        
    );
}

export default AppRoutes;


