import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const jwtToken = localStorage.getItem("jwtToken");

    console.log("PrivateRoute: jwtToken =", jwtToken);
    console.log("PrivateRoute: location.pathname =", location.pathname);

    if (!jwtToken) {
        console.log("PrivateRoute: No jwtToken, redirecting to /login");
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Check if the path is valid
    const validPaths = [
        "/dashboard",
        "/schedule/request",
        "/schedule/today",
        "/schedule/upcoming",
        "/schedule/calendar",
        "/inventory",
        "/inventory/export",
        "/report/damages",
        "/report/resolved",
        "/borrowhistory/list",
        "/borrowhistory/returnitems",
        "/editprofile"
    ];

    if (!validPaths.includes(location.pathname)) {
        console.log("PrivateRoute: Invalid path, redirecting to previous page or /dashboard");
        return <Navigate to={location.state?.from || "/dashboard"} />;
    }

    return children;
};

export default PrivateRoute;