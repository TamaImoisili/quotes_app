// FavouritesButton.js
import React from 'react';
import '../Styles/SignInButton.css'

function SignInButton({ onClick }) {
  return (
    <button className="SignInButton" onClick={onClick}>
        sign in
    </button>
  );
}

export default SignInButton;