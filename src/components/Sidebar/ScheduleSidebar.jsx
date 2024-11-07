import React from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import './ScheduleSidebar.css';
import {Button} from "@mui/material";

export default function ScheduleSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

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
            {/*please make use ani nga back button na icon. ty.*/}
            {/*<img src="/wired-flat-32-chevron-left-hover-scale%20(1).gif" alt="Icon"/>*/}
            <h2 className="sidebar-title">
                <Link to={"/dashboard"}><Button><img src={"/ybb.gif"} style={{ width: '25px', height: '20px', marginBottom:'5px', marginLeft: '16px' }} /></Button></Link>
                SCHEDULE
            </h2>
            <div className="sidebar-buttons">
                <button className={`sidebar-button ${isActive('/schedule/request') ? 'active' : ''}`}
                        onClick={handleRequest}>Request
                </button>
                <button className={`sidebar-button ${isActive('/schedule/today') ? 'active' : ''}`}
                        onClick={handleToday}>Today
                </button>
                <button className={`sidebar-button ${isActive('/schedule/upcoming') ? 'active' : ''}`}
                        onClick={handleUpcomingSched}>Upcoming Schedule
                </button>
            </div>
        </aside>
    );
}
