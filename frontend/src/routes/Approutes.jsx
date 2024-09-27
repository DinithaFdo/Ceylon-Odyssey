import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TourPackageUser from "../pages/IshanFrontend/TourPackageUser";
import IndivudualPackage from "../pages/IshanFrontend/IndivudualPackage";
import QuotationForm from "../pages/IshanFrontend/QuotationForm";
import AdminUpdateTour from "../pages/dashboard/Ishan Dashboard/UpdatePackageDashboard"
import Landing from "../pages/landing/Home";
import Admin from "../pages/dashboard/Admin";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />

                <Route path="/tour-packages" element={<TourPackageUser />} />
                <Route path="/tour-packages/:id" element={<IndivudualPackage />} />
                <Route path="/quotationForm" element={<QuotationForm />} />

                <Route 
                    path="/dashboard" 
                    element={
                        //<ProtectedRoute adminOnly>
                            <Admin />
                        //</ProtectedRoute>
                    } 
                />

                <Route path="/dashboard/manageTourPackages/:id" element={<AdminUpdateTour />} />

            </Routes>
        </Router>
    );
}

export default AppRoutes;
