import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Authentication/Login.jsx';
import Register from './Authentication/Register.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Home from './Landingpage/Home.jsx';
import Schedule from "./Dashboard/Schedule/Schedule.jsx";
import Inventory from "./Dashboard/Inventory/Inventory.jsx";
import Export from "./Dashboard/Inventory/Export.jsx";
import Request from "./Dashboard/Schedule/ScheduleTab/Request.jsx";
import Today from "./Dashboard/Schedule/ScheduleTab/Today.jsx";
import UpcomingSchedule from "./Dashboard/Schedule/ScheduleTab/UpcomingSchedule.jsx";
import Calendar from "./Calendar/Calendar.jsx";
import Report from "./Dashboard/Report/Report.jsx";
import Damages from "./Dashboard/Report/ReportTab/Damages.jsx";
import ReturnItems from "./Dashboard/Report/ReportTab/ReturnItems.jsx";
import List from "./Dashboard/History/HistoryTab/List.jsx";
import UnauthorizedPage from './UnauthorizedPage.jsx';
import EditProfile from "./Settings/EditProfile.jsx";

function AppRoutes() {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            navigate("/login");
            return;
        }

        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, [navigate]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Role-based Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Schedule Routes */}
            <Route path="/schedule/*">
                <Route path="request" element={<Request />} />
                <Route path="today" element={<Today />} />
                <Route path="upcoming" element={<UpcomingSchedule />} />
                <Route path="calendar" element={<Calendar />} />
            </Route>

            {/* Inventory Routes */}
            <Route path="/inventory" element={<Inventory userRole={userRole} />} />
            <Route path="/inventory/export" element={<Export />} />

            {/* Report Routes */}
            <Route path="/report/*">
                <Route path="" element={<Report />} />
                <Route path="damages" element={<Damages />} />
                <Route path="returnitems" element={<ReturnItems />} />
            </Route>

            {/* History Routes */}
            <Route path="/borrowhistory/list" element={<List />} />

            {/* Settings Routes */}
            <Route path={"/editprofile"} element={<EditProfile />} />

            {/* Fallback for undefined routes */}
            <Route path="*" element={<UnauthorizedPage />} />
        </Routes>
    );
}

export default AppRoutes;