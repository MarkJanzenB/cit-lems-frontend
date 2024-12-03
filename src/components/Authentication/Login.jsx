import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css'; // Preserves your existing styles

import { jwtDecode } from 'jwt-decode'; // Import the jwt-decode library

export default function Login() {
  const [formData, setFormData] = useState({
    insti_id: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    setError('');
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.insti_id || !formData.password) {
      setError('Institutional ID and password are required');
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/user/login", formData);
      const token = response.data;

      if (token) {
        try {
          const decoded = jwtDecode(token); // Decode JWT using jwt-decode
          console.log("Decoded Token:", decoded);

          if (decoded && decoded.role_id) {
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("userRole", decoded.role_id);

            setError('');
            return navigate('/dashboard'); // Redirect after successful login
          } else {
            setError('Invalid token structure');
          }
        } catch (decodingError) {
          console.error("Error decoding token:", decodingError);
          setError('Failed to decode token');
        }
      } else {
        setError('Login failed: Invalid response from server');
      }
    } catch (e) {
      console.error("Error submitting form: ", e);
      setError('An error occurred. Please try again.');
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
            <p>Simplify your laboratory operations with our web application </p>
            <p>that streamlines borrowing and enhances inventory management.</p>
            <p>Sign up now to boost your lab's efficiency and productivity!</p>

            <button onClick={handleSignUp} className="sign-up-button">
              SIGN UP
            </button>
            <img
                src="../src/assets/static/img/LEMS1.png"
                alt="LEMS logo"
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: '100px',
                  height: 'auto',
                  cursor: 'pointer',
                  zIndex: '3',
                }}
                onClick={handleLogoClick}
            />
          </div>
          <div className="login-box">
            <div className="border-container">
              <form onSubmit={handleSubmit}>
                <h2>User Authentication</h2>
                <div className="logform">
                  <label style={{ fontSize: '20px', marginTop: '20px' }}>Institutional ID:</label>
                  <input
                      type="text"
                      name="insti_id"
                      value={formData.insti_id}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                      className="outlined-input"
                  />
                </div>
                <div className="logform">
                  <label style={{ fontSize: '20px' }}>Password:</label>
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
                <button type="submit" className="login-button"
                        style={{ backgroundColor: '#800000', marginTop: '20px' }}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
  );
}