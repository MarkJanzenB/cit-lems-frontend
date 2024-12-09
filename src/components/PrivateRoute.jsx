import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const jwtToken = localStorage.getItem("jwtToken");
    const userRole = localStorage.getItem("userRole");

    if (!jwtToken) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (allowedRoles && !allowedRoles.includes(parseInt(userRole))) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;