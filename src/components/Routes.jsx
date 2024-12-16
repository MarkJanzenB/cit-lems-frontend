import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './Authentication/Login.jsx';
import Register from './Authentication/Register.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Home from './Landingpage/Home.jsx';
import Schedule from "./Dashboard/Schedule/Schedule.jsx";
import Inventory from "./Dashboard/Inventory/Inventory.jsx";
import InventoryST from "./Dashboard/Inventory/InventoryST.jsx";
import Export from "./Dashboard/Inventory/Export.jsx";
import Request from "./Dashboard/Schedule/ScheduleTab/Request.jsx";
import Today from "./Dashboard/Schedule/ScheduleTab/Today.jsx";
import UpcomingSchedule from "./Dashboard/Schedule/ScheduleTab/UpcomingSchedule.jsx";
import Calendar from "./Calendar/Calendar.jsx";
import Report from "./Dashboard/Report/Report.jsx";
import Damages from "./Dashboard/Report/ReportTab/Damages.jsx";
import Resolved from "./Dashboard/Report/ReportTab/Resolved.jsx";
import ReturnItems from "./Dashboard/History/ReturnItems.jsx";
import List from "./Dashboard/History/List.jsx";
import UnauthorizedPage from './UnauthorizedPage.jsx';
import EditProfile from "./Settings/EditProfile.jsx";
import PrivateRoute from './PrivateRoute.jsx';
import useLocalStorageListener from '../hooks/useLocalStorageListener';
import BorrowList from './Dashboard/History/BorrowList.jsx';
import BorrowCart from './BorrowCart/BorrowCart';

function AppRoutes() {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useLocalStorageListener();

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken && location.pathname !== '/' && location.pathname !== '/register' && location.pathname !== '/login') {
            navigate("/login");
            return;
        }

        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, [navigate, location.pathname]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Role-based Dashboard Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

            {/* Schedule Routes */}
            <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>}>
                <Route path="request" element={<Request />} />
                <Route path="today" element={<Today />} />
                <Route path="upcoming" element={<UpcomingSchedule />} />
                <Route path="calendar" element={<Calendar />} />
            </Route>

            {/* Inventory Routes */}
            <Route path="/inventory" element={<PrivateRoute><Inventory userRole={userRole} /></PrivateRoute>} />
            <Route path="/inventoryST" element={<PrivateRoute allowedRoles={[1]}><InventoryST /></PrivateRoute>} />
            <Route path="/inventory/export" element={<PrivateRoute allowedRoles={[2, 3]}><Export /></PrivateRoute>} />

            {/* Report Routes */}
            <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>}>
                <Route path="damages" element={<Damages />} />
                <Route path="resolved" element={<Resolved />} />
            </Route>

            {/* History Routes */}
            <Route path="/borrowhistory" element={<PrivateRoute><ReturnItems userRole={userRole} /></PrivateRoute>} />
            <Route path="/borrowhistory/list" element={<PrivateRoute><List /></PrivateRoute>} />
            <Route path="/borrowhistory/returnitems" element={<PrivateRoute><ReturnItems /></PrivateRoute>} />
            <Route path="/borrowhistory/borrowlist" element={<PrivateRoute allowedRoles={[1]}><BorrowList /></PrivateRoute>} />

            {/* Borrow Cart Route */}
            <Route path="/borrowcart" element={<PrivateRoute><BorrowCart /></PrivateRoute>} />

            {/* Settings Routes */}
            <Route path="/editprofile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />

            {/* Fallback for undefined routes */}
            <Route path="*" element={<UnauthorizedPage />} />
        </Routes>
    );
}

export default AppRoutes;