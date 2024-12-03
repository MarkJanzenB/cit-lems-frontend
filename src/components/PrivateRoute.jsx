import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // This is the correct import for version 4.0.0

const PrivateRoute = ({ roleComponents, allowedRoles }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const payload = jwtDecode(token);

        // Debug logs
        console.log("Decoded Token:", payload);
        const userRole = payload.role_id;
        console.log("User Role:", userRole);

        if (allowedRoles.includes(userRole)) {
            const Component = roleComponents[userRole] || roleComponents.default;
            return Component ? <Component /> : <Navigate to="/unauthorized" replace />;
        } else {
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;
