import React from "react";
import ResponsiveAppBar from "./Components/Appbar";
import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import About from "./Components/About";
import Settings from "./Components/Settings";
import StickyFooter from "./Components/StickyFooter";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

const App = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Settings" element={<Settings />}/>
                <Route path="/About" element={<About/>}/>
                <Route path="/Sign-in" element={<SignIn/>}/>
                <Route path="/Sign-up" element={<SignUp/>}/>
            </Routes>
            <StickyFooter></StickyFooter>
        </>
    );
}

export default App;