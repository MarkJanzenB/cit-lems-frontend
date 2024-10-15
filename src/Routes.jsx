import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home'; // Add a new Home component for the root path

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> // Add a new route for the root path
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;