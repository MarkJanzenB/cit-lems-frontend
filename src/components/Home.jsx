import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Home() {
  return(
    <div>
      <h1>Home</h1>
      <Navigate to="/" replace/>
    </div>
  );


}

