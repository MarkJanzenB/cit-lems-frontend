import React from 'react';
import Appbar from '../Appbar/Appbar'; 
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div id='wrapper'>
        <Appbar />
        <div className="landing-page">
        <div className="content">
        <h1>Lab Equipment</h1>
        <h1>Hub</h1>
        <p>Optimize lab operations with our app for efficient equipment borrowing, breakage assessment, and real-time inventory management.</p>
      </div>
      <div id="imgcontainer">
        <img src="../src/assets/scientistnobg.png" />
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
