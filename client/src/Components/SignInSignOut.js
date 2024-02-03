// SignInButton.js
import React from 'react';
import '../Styles/SignInSignOut.css'

function SignInSignOut({ setDelete, isDemo, setDemo, setGlobalError, signInVisibility, isSignInPopupVisible, isOpen, isAuthenticated, updateAuth, updateIsOpen, updateIsPressed}) {

  const handleSignOut = async () => {

    if(!isAuthenticated){
      signInVisibility(!isSignInPopupVisible);
    }
    if (isSignInPopupVisible===false && isAuthenticated) {
      try {
        if(isDemo){
          setDemo(false);
        }
        // Validate email and password if needed

        // Make a POST request to your server endpoint
        const response = await fetch('http://localhost:8888/.netlify/functions/api/signout', {
          method: 'POST',
        });
        if (response.ok) {
          updateAuth(false);
          setGlobalError(0, "Sign out successful");
          updateIsOpen(false);
        } else {
          const { error } = await response.json();
          setGlobalError(1, "Sign out failed");
          updateIsOpen(false);
          console.log("Sign out error", error);
        }
      } catch (error) {
        // Handle sign-out errors
        console.log(error.message);
      }
    }
  }

  const handleDelete = ()=>{
    setDelete(true);
  }
  return (
    <div className={isAuthenticated ? (isOpen ? 'SignOut open' : 'SignOut') : (isOpen ? 'SignIn open' : 'SignIn')}>
      {isOpen && <button className={isAuthenticated ? (isOpen ? 'SignOut-Button open' : 'SignOut-Button') : (isOpen ? 'SignIn-Button open' : 'SignIn-Button')} onClick={handleSignOut}>
        {isAuthenticated ? 'Sign Out' : 'Sign In'}
      </button>
      }
      {isAuthenticated && isOpen && <button className='DeleteAccount' onClick={handleDelete}>Delete account</button>}
    </div>

  );
}

export default SignInSignOut;