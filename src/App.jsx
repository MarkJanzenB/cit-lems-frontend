import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes.jsx';

function App() {
  return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  );
}

export default App;