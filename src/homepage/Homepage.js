import React, { useContext } from 'react'; 
import UserContext from "../auth/UserContext";

import ProfileProgressDisplay from '../_commonComponents/ProfileProgressDisplay';
import backgroundPhoto from '../static/gigBearPhoto.png';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Logo from '../static/google-logo.svg';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './Homepage.css';

/** Site homepage */

const theme = createTheme();

const Homepage = ({ userType }) => {
  const { currentUser } = useContext(UserContext);

  const googleLogin = () => {
    window.open("https://api.gigbears.com:3001/auth/google", "_self");
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={`Homepage`}>
        <div
        style={{
          backgroundImage: `url(${backgroundPhoto})`,
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
        <div className={`Homepage-container${currentUser ? ' logged-in' : ''}`}>
          <h1 className="Homepage-title">Gig Bear</h1>
          <p className="Homepage-lead">Welcome to Gig Bears!</p>
          
          {currentUser
              ? <>
                <h2 id="welcome-lead" style={{color: 'black'}}>
                  Welcome Back, {currentUser.firstName || currentUser.username}!
                </h2>
                {currentUser.profileProgress < 100 
                ? <p> Continue completing your profile! </p>
                : <p> You've completed your profile! </p>}
                <ProfileProgressDisplay progress={currentUser.profileProgress || 0} />
              </>
              : (
                  <div>
                    <Stack direction="column" spacing={2}>
                        {userType === "user" ? <Button color="primary" variant="contained" size="small" onClick={googleLogin}>
                          <div className="Google-logo">
                            <img src={Logo} alt="Google logo" style={{width: '4rem'}} />
                          </div>
                          <p className="btn">Log in with Google</p>
                        </Button> : null}
                        <Button id="email-login-btn" color="success" variant="contained" size="small">
                        <Link className="btn"
                            to="/login">
                            Log in with email
                        </Link>
                        </Button>
                        <Button color="warning" variant="contained" size="small">
                        <Link className="btn"
                            to="/signup">
                            Sign up
                        </Link>
                        </Button>
                      </Stack>
                  </div>
              )}
        </div>
      </div>
      </ThemeProvider>
  );
}

export default Homepage;
