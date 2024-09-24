import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TourPackageUser from "../pages/IshanFrontend/TourPackageUser";
import IndivudualPackage from "../pages/IshanFrontend/IndivudualPackage";
import QuotationForm from "../pages/IshanFrontend/QuotationForm";
import AdminTourPackage from "../pages/dashboard/Ishan Dashboard/TourPackageAdmin";
import AdminCreateTour from "../pages/dashboard/Ishan Dashboard/CreateTourDashboard"
import AdminUpdateTour from "../pages/dashboard/Ishan Dashboard/UpdatePackageDashboard"

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/tour-packages" element={<TourPackageUser />} />
                <Route path="/tour-packages/:id" element={<IndivudualPackage />} />
                <Route path="/quotationForm" element={<QuotationForm />} />

                <Route path="/TourPackage-dashboard" element={<AdminTourPackage />} />
                <Route path="/TourPackage-dashboard/AddTPackage" element={<AdminCreateTour />} />
                <Route path="/TourPackage-dashboard/manageTourPackages/:id" element={<AdminUpdateTour />} />

            </Routes>
        </Router>
    );
}

export default AppRoutes;
