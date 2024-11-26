import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Appbar from '../Appbar/AuthAppbar';
import './Login.css';
import axios from "axios";
import Button from "@mui/material/Button";

export default function Login() {
  const [formData, setFormData] = useState({
    insti_id: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkLoginCredentials = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", formData);
      console.log(response.data);
      console.log(formData);
      localStorage.setItem("jwtToken", response.data);
      return response.data;
    }catch (error) {
      console.error("Error:", error);
    }
  }

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
      const result = await checkLoginCredentials(formData); // returns a string
      console.log(result); //displays in console if register was successful
      if (result.startsWith("eyJhbGciOiJIUzI1NiJ9")) {
        setError('');
        return navigate('/dashboard');
      }else{
        setError('Incorrect Institutional ID or password');
      }
    } catch (e) {
      console.error("Error submitting form: ", e);
    }

    // if (formData.idnum === "testId" && formData.password === "testPassword") {
    //   setError('');
    //   navigate('/dashboard');
    // } else {
    //   setError('Invalid institutional ID or password');
    // }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
      <>
        {/*needs adjustment, dapat dili sha scrollable v and h kumbaga fixed ang page.*/}
      {/* <div style={{backgroundColor: '#056765'}}>
          <Link to={"/"}><Button sx={{backgroundColor: '#056765'}}><img src={"/ybb.gif"} alt={"back"} style={{
            width: '50px',
            height: '50px'
          }}/></Button></Link> 
        </div>*/}

        <div className="login-container">
          <div className="login-bg"/>
          <div className="sign-up">
            <h2>Join Us for a Seamless Laboratory Management Experience</h2>
            <p>
              Simplify your laboratory operations with our web application </p>
            <p> that streamlines borrowing and enhances inventory management.</p>
            <p> Sign up now to boost your lab's efficiency and productivity!</p>

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
                  <label style={{fontSize: '20px', marginTop: '20px'}}>Institutional ID:</label>
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
                <button type="submit" className="login-button"
                        style={{backgroundColor: '#800000', marginTop: '20px'}}>Login
                </button>
              
              </form>
            </div>
          </div>
        </div>
      </>
  );
}
