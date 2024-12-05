import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes.jsx';
import './App.css';
import { Helmet } from 'react-helmet';


function App() {
  return (
        <div className='MainBG'>
            <BrowserRouter>
                <Helmet>
                    <title>LEMS</title>
                </Helmet>
                <Routes/>
            </BrowserRouter>
        </div>
  );
}

export default App;