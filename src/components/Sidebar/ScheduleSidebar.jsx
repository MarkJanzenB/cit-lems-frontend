import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ScheduleSidebar.css';

export default function ScheduleSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    const handleRequest = () => {
        navigate('/schedule/request');
    };
    const handleToday = () => {
        navigate('/schedule/today');
    };
    const handleUpcomingSched = () => {
        navigate('/schedule/upcoming');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="schedule-sidebar">
            <h2 className="sidebar-title">SCHEDULE</h2>
            <div className="sidebar-buttons">
                <button className="sidebar-button" onClick={handleBackToDashboard}>Back to Dashboard</button>
                <button className={`sidebar-button ${isActive('/schedule/request') ? 'active' : ''}`} onClick={handleRequest}>Request</button>
                <button className={`sidebar-button ${isActive('/schedule/today') ? 'active' : ''}`} onClick ={handleToday}>Today</button>
                <button className={`sidebar-button ${isActive('/schedule/upcoming') ? 'active' : ''}`}onClick ={handleUpcomingSched}>Upcoming Schedule</button>
            </div>
        </aside>
    );
}
