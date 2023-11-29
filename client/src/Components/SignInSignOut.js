// SignInButton.js
import React from 'react';
import '../Styles/SignInSignOut.css'

function SignInSignOut({onClick, isOpen }) {

  return (
    <div className= {`SignInSignOut ${isOpen ? 'open' : ''}`}>
        <button className="SignInSignOutButton" onClick={onClick}>
            sign in
        </button>
    </div>
    
  );
}

export default SignInSignOut;