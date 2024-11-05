import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Authentication/Login.jsx';
import Register from './Authentication/Register.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Home from './Landingpage/Home.jsx';
import Schedule from "./Dashboard/Schedule/Schedule.jsx";// Add a new Home component for the root path
import Inventory from "./Dashboard/Inventory/Inventory.jsx";
import Report from "./Dashboard/Report/Report.jsx";
import BorrowHistory from "./Dashboard/History/BorrowHistory.jsx";
import Request from "./Dashboard/Schedule/ScheduleTab/Request.jsx"
import Today from "./Dashboard/Schedule/ScheduleTab/Today.jsx"
import UpcomingSchedule from "./Dashboard/Schedule/ScheduleTab/UpcomingSchedule.jsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path={"/schedule"} element={<Schedule />} />
      <Route path={"/inventory"} element={<Inventory />} />
      <Route path={"/report"} element={<Report />} />
      <Route path={"/borrowhistory"} element={<BorrowHistory />} />
      <Route path="/schedule/request" element={<Request />} />
      <Route path="/schedule/today" element={<Today />} />
      <Route path ="/schedule/upcoming" element={<UpcomingSchedule />}/>


    </Routes>
  );
}

export default AppRoutes;