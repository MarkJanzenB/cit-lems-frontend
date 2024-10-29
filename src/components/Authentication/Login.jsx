import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Appbar from '../Appbar/AuthAppbar';
import './Login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    idNumber: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.idNumber || !formData.password) {
      setError('Institutional ID and password are required');
      return;
    }

    if (formData.idNumber === "testId" && formData.password === "testPassword") {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid institutional ID or password');
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <>
      <div className="login-container">
        <div className="login-bg" />
          <div className="sign-up">
            <h2>Join Us for a Seamless Laboratory Management Experience</h2>
            <p>
              Simplify your laboratory operations with our web application </p>
              <p> that streamlines borrowing and enhances inventory management.</p>
              <p> Sign up now to boost your lab's efficiency and productivity!</p>
            
            <button onClick={handleSignUp} className="sign-up-button">
              SIGN UP
            </button>
          </div>
        <div className="login-box">
          <div className="border-container">
            <form onSubmit={handleSubmit}>
              <h2>User Authentication</h2>
              <div className="logform">
                <label style={{fontSize: '20px', marginTop: '20px'}}>Institutional ID:</label>
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
                <label style={{fontSize: '20px'}}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <button type="submit" className="login-button" style={{backgroundColor: '#800000', marginTop: '20px'}}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
