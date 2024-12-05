import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Sidebar.css';
import { Button } from "@mui/material";


export default function Sidebar({ page }) {
    const navigate = useNavigate();
    const location = useLocation();

    const labels = {
        schedule: 'Schedule',
        inventory: 'Inventory',
        report: 'Report',
        borrowhistory: 'Borrow History'
    };

    const label = labels[page] || 'Return';

    const handleRequest = () => {
        navigate('/schedule/request');
    };
    const handleToday = () => {
        navigate('/schedule/today');
    };
    const handleUpcomingSched = () => {
        navigate('/schedule/upcoming');
    };

    const handleExport = () => {
        navigate('/inventory/export');
    };
    const handleCategoryPage = () => {
        navigate('/inventory');
    };

    const handleDamages = () => {
        navigate('/report/damages');
    };
    const handleReturnItems = () => {
        navigate('/borrowhistory/returnitems');
    };
    const handleBorrowHistory = () => {
        navigate('/borrowhistory/list');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="sidebar-container">
            <h2 className="sidebar-title">
                <Link to={"/dashboard"}><Button><img src={"/ybb.gif"} alt="Logo" style={{
                    width: '25px',
                    height: '100%',
                    marginBottom: '3px',
                    marginLeft: '16px'
                }}/>
                    <h1 style={{color: "#F2EE9D"}}>{label.toUpperCase()}</h1>
                </Button></Link>
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
                                onClick={handleCategoryPage} style={{display: 'block'}}>Categories
                        </button>
                        <button className={`sidebar-button ${isActive('/inventory/export') ? 'active' : ''}`}
                                onClick={handleExport} style={{display: 'block'}}>Export Inventory
                        </button>
                    </>
                )}
                {page === 'report' && (
                    <>
                        <button className={`sidebar-button ${isActive('/report/damages') ? 'active' : ''}`}
                                onClick={handleDamages} style={{display: 'block'}}>Damages
                        </button>
                    </>
                )}
                {page === 'borrowhistory' && (
                    <>
                        <button className={`sidebar-button ${isActive('/borrowhistory/list') ? 'active' : ''}`}
                                onClick={handleBorrowHistory} style={{display: 'block'}}>Borrow Schedule
                        </button>
                        <button className={`sidebar-button ${isActive('/borrowhistory/returnitems') ? 'active' : ''}`}
                                onClick={handleReturnItems} style={{display: 'block'}}>Return Items
                        </button>
                    </>
                )}
            </div>
        </aside>
    );
}