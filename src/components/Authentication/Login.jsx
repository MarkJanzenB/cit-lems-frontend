import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from 'jwt-decode'; // Ensure correct import for jwt-decode
import './Login.css'; // Preserves your existing styles

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
    setError(''); // Clear error when input changes
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

      // Check if the response data is valid
      const token = response.data;
      if (!token) {
        setError('Login failed: No token received');
        return;
      }

      try {
        // Decode the JWT token
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        // Validate the token structure
        if (decoded && decoded.role_id && decoded.sub) {
          // Store token and user role in localStorage
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("userRole", decoded.role_id);

          setError(''); // Clear errors
          navigate('/dashboard'); // Redirect after successful login
        } else {
          setError('Invalid token structure received');
        }
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        setError('Failed to decode token. Please try again.');
      }
    } catch (error) {
      console.error("Error during login request:", error);

      // Handle HTTP and network errors
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid Institutional ID or password');
        } else {
          setError(`Server error: ${error.response.data || 'Please try again later.'}`);
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
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
