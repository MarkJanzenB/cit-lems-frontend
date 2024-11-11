import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Sidebar.css';
import { Button } from "@mui/material";

export default function Sidebar({ page }) {
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
    const handleBack = () => {
        navigate('/dashboard');
    };
    const handleAllItems = () => {
        navigate('/inventory/allitems');
    };

    // Functions to handle sidebar button clicks for REPORT page
    const handleDamages = () => {
        navigate('/reports/damages');
    };
    const handleReturnItems = () => {
        navigate('/reports/returnitems');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="sidebar-container">
            <h2 className="sidebar-title">
                <Link to={"/dashboard"}><Button><img src={"/ybb.gif"} style={{
                    width: '25px',
                    height: '20px',
                    marginBottom: '5px',
                    marginLeft: '16px'
                }}/></Button></Link>
                {page.toUpperCase()}
            </h2>
            <div className="sidebar-buttons">
                {page === 'schedule' && (
                    <>
                        <button className={`sidebar-button ${isActive('/schedule/request') ? 'active' : ''}`}
                                onClick={handleRequest} style={{display: 'block'}}>Request
                        </button>
                        <button className={`sidebar-button ${isActive('/schedule/today') ? 'active' : ''}`}
                                onClick={handleToday} style={{display: 'block'}}>Today
                        </button>
                        <button className={`sidebar-button ${isActive('/schedule/upcoming') ? 'active' : ''}`}
                                onClick={handleUpcomingSched} style={{display: 'block'}}>Upcoming Schedule
                        </button>
                    </>
                )}
                {page === 'inventory' && (
                    <>
                        <button className={`sidebar-button ${isActive('/inventory') ? 'active' : ''}`}
                                onClick={handleBack} style={{display: 'block'}}>Yearly Inventory
                        </button>
                        <button className={`sidebar-button ${isActive('/inventory') ? 'active' : ''}`}
                                onClick={handleBack} style={{display: 'block'}}>Data Analysis
                        </button>
                        <button className={`sidebar-button ${isActive('/inventory') ? 'active' : ''}`}
                                onClick={handleBack} style={{display: 'block'}}>Supply Request
                        </button>

                    </>
                )}
                {page === 'reports' && (
                    <>
                        <button className={`sidebar-button ${isActive('/reports/damages') ? 'active' : ''}`}
                                onClick={handleDamages} style={{display: 'block'}}>Damages
                        </button>
                        <button className={`sidebar-button ${isActive('/reports/returnitems') ? 'active' : ''}`}
                                   onClick={handleReturnItems} style={{display: 'block'}}>Return Items
                        </button>
                    </>
                )}
                {page === 'borrowhistory' && (
                    <>
                        {/* here goes the buttons for borrowhistory */}
                    </>
                )}
            </div>
        </aside>
    );
}