// SignInButton.js
import React from 'react';
import '../Styles/SignInSignOut.css'

function SignInSignOut({onClick, isOpen }) {

  return (
    <div className= {`SignInSignOut ${isOpen ? 'open' : ''}`}>
        {isOpen && <button className= {`SignInSignOutButton ${isOpen ? 'open' : ''}`} onClick={onClick}>
            sign out
        </button>
        }
    </div>
    
  );
}

export default SignInSignOut;