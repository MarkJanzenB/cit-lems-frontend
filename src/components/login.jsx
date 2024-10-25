import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import logo3 from "../assets/static/img/cit-logo.png";
import lems from "../assets/static/img/lems-removebg-preview.png";
import StyledPaper from "./MyPaper";
import '../index.css';
import Button from "@mui/material/Button";





const firebaseConfig = {
  apiKey: "AIzaSyDZGXMjVVHmEo3V-29wRXvkdXLZ5SjqFzs",
  authDomain: "lems-3bbc3.firebaseapp.com",
  projectId: "lems-3bbc3",
  storageBucket: "lems-3bbc3.appspot.com",
  messagingSenderId: "896933531342",
  appId: "1:896933531342:web:c1223997c4f7126cbfca9f",
  measurementId: "G-WZ8QQBDX7V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Login() {
  const [formData, setFormData] = useState({
    idNumber: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.idNumber || !formData.password) {
      setError('Institutional ID and password are required');
      return;
    }

    try {
      const q = query(collection(db, "users"), where("idNumber", "==", formData.idNumber));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Invalid institutional ID or password');
        return;
      }

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.password === formData.password) {
          setSuccess('You are successfully logged in');
          setError('');
          navigate('/dashboard'); // Redirect to dashboard
        } else {
          setError('Invalid institutional ID or password');
        }
      });
    } catch (e) {
      console.error("Error logging in: ", e);
      setError('Error logging in');
    }
  };

  const handleBack = () => {
    navigate('/'); // Adjust the path as needed
  };

  return (
      <>
        <Button onClick={handleBack} sx={{ marginTop: '20px' }}>Back</Button>
        <div className="headerrr">
          <img className="inline-element" src={logo3} alt="Cebu Institute of Technology University Logo"/>
          <img className="inline-element logo" src={lems} alt="LEMS Logo"/>
        </div>
        <hr/>
        <br/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <StyledPaper width="800px" height="500px">
            <form onSubmit={handleSubmit}>
              <h1>User Authentication</h1>
              <div className="logform">
                <label>Institutional ID:</label>
                <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                />
              </div>
              <div className="logform">
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />
              </div>
              {error && <p style={{color: 'red'}}>{error}</p>}
              {success && <p style={{color: 'green'}}>{success}</p>}
              <br/>
              <button type="submit">Login</button>
            </form>
          </StyledPaper>
        </div>
      </>
  );
}