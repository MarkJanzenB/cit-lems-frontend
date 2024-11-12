import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Authentication/Login.jsx';
import Register from './Authentication/Register.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Home from './Landingpage/Home.jsx';
import Schedule from "./Dashboard/Schedule/Schedule.jsx";// Add a new Home component for the root path
//inventory tab
import Inventory from "./Dashboard/Inventory/Inventory.jsx";
//Schedule tab
import Request from "./Dashboard/Schedule/ScheduleTab/Request.jsx"
import Today from "./Dashboard/Schedule/ScheduleTab/Today.jsx"
import UpcomingSchedule from "./Dashboard/Schedule/ScheduleTab/UpcomingSchedule.jsx"
//report tab
import Report from "./Dashboard/Report/Report.jsx";
import Damages from "./Dashboard/Report/ReportTab/Damages.jsx";
import ReturnItems from "./Dashboard/Report/ReportTab/ReturnItems.jsx";
//history tab
import List from "./Dashboard/History/HistoryTab/List.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path={"/schedule"} element={<Schedule />} />
            <Route path={"/inventory"} element={<Inventory />} />
            <Route path={"/reports"} element={<Report />} />
            <Route path={"/borrowhistory/list"} element={<List/>} />
            <Route path="/schedule/request" element={<Request />} />
            <Route path="/schedule/today" element={<Today />} />
            <Route path ="/schedule/upcoming" element={<UpcomingSchedule />}/>
            <Route path ="/reports/damages" element={<Damages />}/>
            <Route path ="/reports/returnitems" element={<ReturnItems />}/>

        </Routes>
    );
}

export default AppRoutes;