
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"
import Blog from "../pages/Ishanka/AddBlog"
import BlogList from "../pages/Ishanka/BlogList"
import UpdateBlog from "../pages/Ishanka/UpdateBlog"
import TourismBlog from "../pages/Ishanka/UserBlog"
import IndividualBlog from "../pages/Ishanka/InduvidualBlog";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/add-blog" element={<Blog />} />
                <Route path="/blog-list" element={<BlogList />} />
                <Route path="/update-blog/:id" element={<UpdateBlog />} />
                <Route path="/user-blog" element={<TourismBlog />} />
                <Route path ="/blog/:id" element = {<IndividualBlog />} />

                
            </Routes>
        </Router>
    );
}

export default AppRoutes;
