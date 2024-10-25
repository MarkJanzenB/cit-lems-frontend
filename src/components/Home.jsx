import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import logo3 from '../assets/static/img/cit-logo.png';
import lems from "../assets/static/img/lems-removebg-preview.png";
import Button from "@mui/material/Button";
import StyledPaper from "./MyPaper.jsx";
import ScrollFadePaper from './ScrollDownFadePaper';



export default function Home() {
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate('/register'); // Adjust the path as needed
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Adjust the path as needed
    };
  return(
      <>

          <div>
              <img className="inline-element logo3" src={logo3} alt="Cebu Institute of Technology University Logo"/>
              <img className="inline-element logo4" src={lems} alt="LEMS Logo"/>
              <Navigate to="/" replace/>

          </div>
          <div>
              <Button onClick={handleRegisterRedirect}
                      sx={{color: 'black', backgroundColor: '#ccffff', border: '2px solid teal'}}>Register</Button>
              <Button onClick={handleLoginRedirect}
                      sx={{color: 'black', backgroundColor: '#ccffff', border: '2px solid teal'}}>Login</Button>
          </div>
          <div>
              <br/>
              <StyledPaper width="800px" height="800px" border="1px solid grey">
                  <h1>WHATS UP</h1>
              </StyledPaper>
          </div>
          <div>
              <br/>
              <StyledPaper width="800px" height="800px" border="1px solid grey">
                  <h1>WHATS UP</h1>
              </StyledPaper>
          </div>
          <div>
              <br/>
              <StyledPaper width="800px" height="800px" border="1px solid grey">
                  <h1>WHATS UP</h1>
              </StyledPaper>
          </div>
          <div>
              <br/>
              <StyledPaper width="800px" height="800px" border="1px solid grey">
                  <h1>WHATS UP</h1>
              </StyledPaper>
          </div>
          <div>
              <br/>
              <StyledPaper width="800px" height="800px" border="1px solid grey">
                  <h1>WHATS UP</h1>
              </StyledPaper>
          </div>
          <ScrollFadePaper/>

      </>


  );


}

