import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TourPackageUser from "../pages/IshanFrontend/TourPackageUser";
import IndivudualPackage from "../pages/IshanFrontend/IndivudualPackage";
import QuotationForm from "../pages/IshanFrontend/QuotationForm";
import AdminUpdateTour from "../pages/dashboard/Ishan Dashboard/UpdatePackageDashboard"
import Home from "../pages/landing/Home";
import Admin from "../pages/dashboard/Admin";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"
import UpdateEquipment from "../pages/sakindu/UpdateEquipment"
import EquipmentUserView from "../pages/sakindu/EquipmentList"
import IndividualEquipment from "../pages/sakindu/IndividualEquipment"; 
import AdminUpdateEquipment from "../pages/dashboard/Sakindu Dashbaord/UpdateEquipment";
import Onboarding from "../pages/Dinitha/Onboarding"
import Profile from "../pages/Dinitha/Profile"
import ProtectedRoute from "../components/ProtectedRoute"
import GuestRoute from "../components/GuestRoute"
import NotFound from "../components/spinner/404"
import Test from  "../components/test"
import PaymentForm from "../components/PaymentForm";
import TourismBlog from "../pages/Ishanka/UserBlog"
import IndividualBlog from "../pages/Ishanka/InduvidualBlog";
import UpdateBlogDashboard from "../pages/dashboard/Ishanka dahsbaord/UpdateBlogDashbaord";
import BookingForm from "../pages/Jihan/BookingForm";
import Confirmation from "../pages/Jihan/Confirmation";
import BookingList from "../pages/Jihan/BookingList"


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

                    <Route path="/dashboard/manageTourPackages/:id" element={<AdminUpdateTour />} />
                    <Route path="/tour-packages" element={<TourPackageUser />} />
                <Route path="/tour-packages/:id" element={<IndivudualPackage />} />
                <Route path="/quotationForm" element={<QuotationForm />} />

                <Route path="/update-blog/:id" element={<UpdateBlogDashboard />} />
                <Route path="/user-blog" element={<TourismBlog />} />
                <Route path ="/blog/:id" element = {<IndividualBlog />} />

                <Route path="/book/:id" element={<BookingForm />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/bookings" element={<BookingList />} />
             
                </Routes>
                    
            </Router>
        
    );
}

export default AppRoutes;


