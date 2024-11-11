import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appbar from "../../Appbar/Appbar";
import Sidebar from "../../Sidebar/Sidebar.jsx";


export default function Report() {
    return (
        <Router>
                <Appbar />
                <Sidebar />

        </Router>
    );

}