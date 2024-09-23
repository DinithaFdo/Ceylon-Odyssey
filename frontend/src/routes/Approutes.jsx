import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageTPackages from "../pages/IshanFrontend/AllPackagesAdmin"
import AddTPackage from "../pages/IshanFrontend/AddTourPackage"
import UpdateTourPackage from "../pages/IshanFrontend/UpdateTourPackage";
import TourPackageUser from "../pages/IshanFrontend/TourPackageUser";
import IndivudualPackage from "../pages/IshanFrontend/IndivudualPackage";
import QuotationForm from "../pages/IshanFrontend/QuotationForm";
import Admin from "../pages/dashboard/admin";


function AppRoutes() {
    return (
        <Router>
            <Routes>
                
                <Route path="/tour-packages" element={<TourPackageUser />} />
                <Route path="/tour-packages/:id" element={<IndivudualPackage />} />
                <Route path="/quotationForm" element={<QuotationForm />} />


                <Route path="/dashboard" element={<Admin />} />
                <Route path="/dashboard/AddTPackage" element={<AddTPackage />} />
                <Route path="/dashboard/manageTourPackages/:id" element={<UpdateTourPackage />} />

            </Routes>
        </Router>
    );
}

export default AppRoutes;
