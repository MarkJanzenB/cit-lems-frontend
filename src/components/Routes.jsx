import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Authentication/Login.jsx';
import Register from './Authentication/Register.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Home from './Landingpage/Home.jsx';
import Schedule from "./Dashboard/Schedule/Schedule.jsx";
import Inventory from "./Dashboard/Inventory/Inventory.jsx";
import InventoryST from "./Dashboard/Inventory/InventoryST.jsx";
import InventoryLA from "./Dashboard/Inventory/InventoryLA.jsx";
import InventoryLI from "./Dashboard/Inventory/InventoryLI.jsx";
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
import PrivateRoute from './PrivateRoute.jsx';

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Schedule Routes */}
            <Route path="/schedule/*">
                <Route path="request" element={<Request />} />
                <Route path="today" element={<Today />} />
                <Route path="upcoming" element={<UpcomingSchedule />} />
                <Route path="calendar" element={<Calendar />} />
            </Route>

            {/*/!* Inventory Routes *!/*/}
            {/*<Route path="/inventory" element={*/}
            {/*    <PrivateRoute*/}
            {/*        roleComponents={{*/}
            {/*            1: <InventoryST />, // Science Teacher*/}
            {/*            2: <InventoryLA />, // Laboratory Assistant*/}
            {/*            3: <InventoryLI />, // Laboratory-In-Charge*/}
            {/*            default: <UnauthorizedPage /> // Fallback for unauthorized roles*/}
            {/*        }}*/}
            {/*    />*/}
            {/*} />*/}
            <Route path={"/inventory"} element={<Inventory />} />
            <Route path="/inventoryST" element={<InventoryST />} />
            <Route path="/inventoryLA" element={<InventoryLA />} />
            <Route path="/inventoryLI" element={<InventoryLI />} />
            <Route path="/inventory/export" element={<Export />} />

            {/* Report Routes */}
            <Route path="/report/*">
                <Route path="" element={<Report />} />
                <Route path="damages" element={<Damages />} />
                <Route path="returnitems" element={<ReturnItems />} />
            </Route>

            {/* History Routes */}
            <Route path="/borrowhistory/list" element={<List />} />

            {/* Fallback for undefined routes */}
            <Route path="*" element={<UnauthorizedPage />} />
        </Routes>
    );
}

export default AppRoutes;