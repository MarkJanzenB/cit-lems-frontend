import React from 'react';
import { Navigate } from 'react-router-dom';
import logo3 from '../assets/static/img/cit-logo.png';
import lems from '../assets/static/img/lems.png';



export default function Home() {
  return(
      <>
          <div>
            <img className="inline-element" src={logo3} alt="Cebu Institute of Technology University Logo" />
            <img className="inline-element logo" src={lems} alt="LEMS Logo" />
            <Navigate to="/" replace />
          </div>
          <div>

          </div>




      </>


  );


}

