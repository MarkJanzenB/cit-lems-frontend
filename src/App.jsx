// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/Landingpage/Home';
import Login from './components/Authentication/login';
import Register from './components/Authentication/Register';
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Schedule from "./components/Dashboard/Schedule/Schedule.jsx";
import Inventory from "./components/Dashboard/Inventory/Inventory.jsx";
import Report from "./components/Dashboard/Report/Report.jsx";
import BorrowHistory from "./components/Dashboard/History/BorrowHistory.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path={'/dashboard'} element={<Dashboard/>}/>
          <Route path={'/schedule'} element={<Schedule/>}/>
          <Route path={'/inventory'} element={<Inventory/>}/>
          <Route path={'/report'} element={<Report/>}/>
          <Route path={'/borrowhistory'} element={<BorrowHistory/>}/>
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
