// SignInButton.js
import React from 'react';
import '../Styles/SignInButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function SignInButton({toggleMenu }) {

  return (
    <button className="SignInButton" title='User account' onClick={toggleMenu}>
         <FontAwesomeIcon icon={faUserCircle}/>
    </button>
    
  );
}

export default SignInButton;