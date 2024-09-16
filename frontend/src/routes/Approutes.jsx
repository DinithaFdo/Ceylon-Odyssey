import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageTPackages from "../pages/IshanFrontend/AllPackagesAdmin"
import AddTPackage from "../pages/IshanFrontend/AddTourPackage"
import UpdateTourPackage from "../pages/IshanFrontend/UpdateTourPackage";


function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/manageTourPackages" element={<ManageTPackages />} />
                <Route path="/AddTPackage" element={<AddTPackage />} />
                <Route path="/manageTourPackages/:id" element={<UpdateTourPackage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
