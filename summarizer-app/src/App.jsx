import React from "react";
import ResponsiveAppBar from "./Components/Appbar";
import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import About from "./Components/About";
import Settings from "./Components/Settings";

const App = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Settings" element={<Settings />}/>
                <Route path="/About" element={<About/>}/>
            </Routes>
        </>
    );
}

export default App;