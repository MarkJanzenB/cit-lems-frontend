import React from 'react';
import ScheduleSidebar from '../../../Sidebar/ScheduleSidebar';
import Appbar  from '../../../Appbar/Appbar';

export default function UpcomingSchedule() {
    return (
        <div style={{ display: 'flex', width:'100vw',height:'100vh' }}>
            <Appbar/>
            <ScheduleSidebar />
            <div style={{ padding: '20px', flexGrow: 1 }}>
                <h1>Request Page</h1>
                
            </div>
        </div>
    );
}
