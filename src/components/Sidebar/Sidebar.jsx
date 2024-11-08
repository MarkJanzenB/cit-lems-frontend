import React from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import './Sidebar.css';
import {Button} from "@mui/material";

export default function Sidebar({page}) {
    const navigate = useNavigate();
    const location = useLocation();

    // Functions to handle sidebar button clicks for SCHEDULE page
    const handleRequest = () => {
        navigate('/schedule/request');
    };
    const handleToday = () => {
        navigate('/schedule/today');
    };
    const handleUpcomingSched = () => {
        navigate('/schedule/upcoming');
    };

    // Functions to handle sidebar button clicks for INVENTORY page
    const handleBack = () =>{
        navigate('/dashboard');
    }
    const handleAllItems = () =>{
        navigate('/inventory/allitems');
    }

    const isActive = (path) => location.pathname === path;


    return (
        <aside className="schedule-sidebar">
            <h2 className="sidebar-title">
                <Link to={"/dashboard"}><Button><img src={"/ybb.gif"} style={{ width: '25px', height: '20px', marginBottom:'5px', marginLeft: '16px' }} /></Button></Link>
                {page.toUpperCase()}
            </h2>
            <div className="sidebar-buttons">
                {page === 'schedule' && (
                    <>
                        <button className={`sidebar-button ${isActive('/schedule/request') ? 'active' : ''}`}
                                onClick={handleRequest}>Request
                        </button>
                        <button className={`sidebar-button ${isActive('/schedule/today') ? 'active' : ''}`}
                                onClick={handleToday}>Today
                        </button>
                        <button className={`sidebar-button ${isActive('/schedule/upcoming') ? 'active' : ''}`}
                                onClick={handleUpcomingSched}>Upcoming Schedule
                        </button>
                    </>
                )}
                {page === 'inventory' && (
                    <>
                        <button className={`sidebar-button ${isActive('/inventory') ? 'active' : ''}`}
                                onClick={handleBack}>Back
                        </button>
                    </>
                )}
                {page === 'reports' &&(
                    <>
                        //here goes the buttons for reports
                    </>
                )}
                {page === 'borrowhistory' &&(
                    <>
                        //here goes the buttons for borrowhistory
                    </>
                )}


            </div>
        </aside>
    );
}
