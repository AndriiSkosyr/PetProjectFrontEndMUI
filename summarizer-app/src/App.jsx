import React from "react";
import ResponsiveAppBar from "./Components/Appbar";
import { Route, Routes, useLocation } from "react-router";
import Home from "./Components/Home";
import About from "./Components/About";
import Settings from "./Components/Settings";
import StickyFooter from "./Components/StickyFooter";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import AddCalendar from "./Components/Pages/AddCalendar";
import UpdateCalendar from "./Components/Pages/UpdateCalendar";

const App = () => {
    const location = useLocation();  // Get current path
    
    // Pages where header and footer should not appear
    const noHeaderFooterRoutes = ['/Sign-in', '/Sign-up'];

    return (
        <>
            {/* Conditionally render the header */}
            {!noHeaderFooterRoutes.includes(location.pathname) && <ResponsiveAppBar />}
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/About" element={<About />} />
                <Route path="/Sign-in" element={<SignIn />} />
                <Route path="/Sign-up" element={<SignUp />} />
                <Route path="/AddCalendar" element={<AddCalendar />} />
                <Route path="/UpdateCalendar/:id" element={<UpdateCalendar />} />
            </Routes>

            {/* Conditionally render the footer */}
            {!noHeaderFooterRoutes.includes(location.pathname) && <StickyFooter />}
        </>
    );
}

export default App;
