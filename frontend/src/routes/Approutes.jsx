import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageTPackages from "../pages/IshanFrontend/AllPackagesAdmin"
import AddTPackage from "../pages/IshanFrontend/AddTourPackage"
import UpdateTourPackage from "../pages/IshanFrontend/UpdateTourPackage";
import TourPackageUser from "../pages/IshanFrontend/TourPackageUser";
import IndivudualPackage from "../pages/IshanFrontend/IndivudualPackage";


function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/manageTourPackages" element={<ManageTPackages />} />
                <Route path="/AddTPackage" element={<AddTPackage />} />
                <Route path="/manageTourPackages/:id" element={<UpdateTourPackage />} />
                <Route path="/tour-packages" element={<TourPackageUser />} />
                <Route path="/tourPackage/:id" element={<IndivudualPackage />} />

            </Routes>
        </Router>
    );
}

export default AppRoutes;
