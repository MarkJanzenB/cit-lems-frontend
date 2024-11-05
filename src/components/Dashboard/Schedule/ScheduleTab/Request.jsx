import React from 'react';
import ScheduleSidebar from '../../../Sidebar/ScheduleSidebar';
import Appbar  from '../../../Appbar/Appbar';

export default function Request() {
    return (
        <div style={{ display: 'flex',height:'100vh', width:'100vw' }}>
            <Appbar/>
            <ScheduleSidebar />
            <div style={{ padding: '20px', flexGrow: 1 }}>
                <h1>Request Page</h1>
                
            </div>
        </div>
    );
}
