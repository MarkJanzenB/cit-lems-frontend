// Report.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Report() {
    return (
        <div>
            <h1>Report Page</h1>
            <Outlet />
        </div>
    );
}