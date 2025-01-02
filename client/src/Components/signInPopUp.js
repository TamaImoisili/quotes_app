import React, { useState } from 'react';
import '../Styles/signInPopUp.css'; // Adjust the path based on your project structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignInPopup = ({ apiURL, setDemo, setGlobalError, isOpen, setVisibility, setAuth, setUserID, updateIsOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleAction = () => {
    // Your logic for handling sign-in or sign-up based on the current state
    if (isSignUp) {
      // Handle sign-up logic
      handleSignUp();
    } else {
      // Handle sign-in logic
      handleSignIn(email, password);

    }
  };
  const toggleSignInUp = (newValue) => {
    // Toggle between sign-in and sign-up
    setIsSignUp(newValue);
  };
  const cancelSignIn = async () => {
    updateIsOpen(false);
    setVisibility(false);
    setIsSignUp(false);
  };
  const handleSignIn = async (Email, Password) => {
    try {
      // Validate email and password if needed
      console.log("Trying sign in");
      if (!Email && !Password) {
        setError("Please enter your email and password to sign in");
        return;
      }

      if (!Email) {
        setError("Please enter your email");
        return;
      }

      if (!Password) {
        setError("Please enter your password");
        return;
      }
      // Make a POST request to your server endpoint=
      const response = await fetch('http://localhost:8888/.netlify/functions/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });

      // Handle the response from your server
      if (response.ok) {
        const resData = await response.json();
        setVisibility(false);
        // Clear form, close the popup, and handle access granting
        setEmail('');
        setPassword('');
        // If sign-in is successful, close the popup

        setAuth(true);
        setGlobalError(0, "Sign in successful.");
        setUserID(resData.data.user_id);
        updateIsOpen(false);
      } else {
        const { error } = await response.json();
        setGlobalError(1, "Sign in failed, please check email for confirmation or create an account.");
        setVisibility(false);
        setAuth(false);
        setError(error);
        setUserID(-1);
        updateIsOpen(false);
      }
    } catch (error) {
      // Handle sign-in errors
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      if (!email && !name && !password) {
        setError('Please enter your name, email, and password to sign up');
        return;
      } else {
        if (!email) {
          setError('Please enter your email');
          return;
        }
        if (!name) {
          setError('Please enter your name');
          return;
        }
        if (!password) {
          setError('Please enter your password');
          return;
        }
      }

      // Make a POST request to your server endpoint for sign-up
      const response = await fetch('http://localhost:8888/.netlify/functions/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      // Handle the response from your server
      if (response.ok) {
        const resData = await response.json();
        // Handle success, e.g., close the popup, update UI, etc.
        setGlobalError(0, "Sign up successful, please check email for confirmation.");
        setVisibility(false);
        setAuth(true);
        setError(null);
        setUserID(resData.data.user_id);
        updateIsOpen(false);
      } else {
        console.log(response.json());
        const { error } = await response.json();
        setGlobalError(1, "Sign up failed");
        setVisibility(false);
        setAuth(false);
        setError(error);
        setUserID(-1);
        updateIsOpen(false);
      }

    } catch (error) {
      // Handle sign-up errors
      setError(error.message);
    }

  };
  const handleForgotPassword = () => {
    // Your logic for handling forgot password goes here
  };

  const handleSocialSignIn = async (provider) => {
    // Your logic for signing in with a social provider goes here
    // Make a POST request to your server endpoint for sign-in
    if (provider==='google'){
      const response = await fetch('http://localhost:8888/.netlify/functions/api/signinWithGoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json(); 
      console.log(responseData.data.url);
      openSignInPopup(responseData.data.url);
    }
  };
  function openSignInPopup(googleSignInUrl) {

    // Open a new popup window for Google Sign-In
    var popupWindow = window.open(googleSignInUrl, 'GoogleSignin','width=1000,height=1000');
    // const checkPopup = setInterval(()=>{
    //   if(!popupWindow || !popupWindow.closed) return;
    // }, 1000);
    if (popupWindow && !popupWindow.closed) {
      // Focus the new popup window
      popupWindow.focus();
  } else {
      // Handle the case where the popup window could not be opened
      console.error('Failed to open popup window for Google Sign-In');
  }
}
  const handleDemoMode = () => {
    setDemo(true);
    handleSignIn('tamaimoisili3@gmail.com', 'tama1234');
  };
  const handlefacebook  = async () => {

  };
  // Inside your SignInPopup component
  return (
    <div className={`sign-in-popup ${isOpen ? 'visible' : ''}`}>
      <div className="sign-in-buttons">
        <button
          className={`sign-in-button ${isSignUp === false ? 'active' : ''}`}
          onClick={() => toggleSignInUp(false)}
        >
          Sign In
        </button>

        <button
          className={`sign-up-button ${isSignUp === true ? 'active' : ''}`}
          onClick={() => toggleSignInUp(true)}
        >
          Sign Up
        </button>
      </div>
      <div className="input-fields">
        {isSignUp && <input
          type="text"
          placeholder="Name"
          className="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />}

        <input
          type="text"
          placeholder="Email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button className="sign-in-action" onClick={handleAction}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <div className="social-buttons">
        <button title="Sign in with google" className="google-button" onClick={() => handleSocialSignIn('google')}>
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button title="Sign in with facebook" className="facebook-button" onClick={() => handlefacebook('facebook')}>
          <FontAwesomeIcon icon={faFacebook} />
        </button>
      </div>
      <div className="action-buttons-sign-in">
        <button className="action-button-sign-in" onClick={cancelSignIn}>
          Cancel
        </button>
        <button className="forgot-button-action" onClick={handleForgotPassword}>
          Forgot password?
        </button>
      </div>
      <button className='privacypolicy'> Privacy policy</button>
      <button className='demo-mode-button' onClick={handleDemoMode}>Demo mode</button>
    </div>
  );

};

export default SignInPopup;
