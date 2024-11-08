import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes.jsx';
import './App.css';


function App() {
  return (
        <div className='MainBG'>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </div>
  );
}

export default App;