// FavouritesButton.js
import React, { useState, useEffect } from 'react';
import '../Styles/FavouritesButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function FavouritesButton({ isAuthenticated, user_id, quoteMacro, authorMacro, setError }) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const signOutStatus = async () => {

      if (!isAuthenticated) {
        setIsPressed(false);
      }
    }
    const checkFavouriteStatus = async () => {
      if (isAuthenticated) {
        try {
          const quote = quoteMacro.text;
          const response = await fetch('http://localhost:8888/.netlify/functions/api/checkfave', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, quote: quote }),
          });


          if (response.ok) {
            const res = await response.json();
            if (res.faveID !== 0) {
              setIsPressed(true);
            } else {
              setIsPressed(false);
            }
            //
          } else {
            const { error } = await response.json();
            setError(error.message);
          }
        } catch (error) {
          setError("Failed to check favourite status");
        }
      }
    };
    signOutStatus();
    checkFavouriteStatus();
  }, [isAuthenticated, user_id, quoteMacro.text, setError]);

  const AddToFavourites = async () => {
    // Toggle the pressed state
    if (isAuthenticated) {
      try {
        // Validate email and password if needed

        // Make a POST request to your server endpoint
        const quote = quoteMacro.text;
        const author = authorMacro.text;
        const response = await fetch('http://localhost:8888/.netlify/functions/api/checkfave', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id, quote: quote, remStatus: "0" }),
        });

        if (response.ok) {
          const res =await response.json(); 
          if (res.faveID === 0){
              const response1 = await fetch('http://localhost:8888/.netlify/functions/api/addfave', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, quote, author }),
              });
    
              // Handle the response from your server
              if (response1.ok) {
                // Clear form, close the popup, and handle access granting
                // If sign-in is successful, close the popup
                setIsPressed(!isPressed);
                setError(null);
              } else {
                const { error } = await response.json();
                setError(error.message);
              }
          }else{
            console.log("remove the fave");
          //If the user is signed in and the quote is alrady liked, a second press unlikes it.
          const removeStat = await fetch('http://localhost:8888/.netlify/functions/api/checkfave', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, quote: quote, remStatus: "1" }),
          });
           //this is done using the checkfave server request again but this time the remStatus/remove status is set to "1" being true. 
          if (removeStat.ok) {

            setIsPressed(!isPressed);
            setError(null);
          } else {
            const { error } = await removeStat.json();
            setError(error.message);
          }
          }
          

        } 
      } catch (error) {
        // Handle sign-in errors
        setError("Failed to add");
      }
    } else {
      setIsPressed(false);
    }
  };

  return (
    <button className={`FavouritesButton ${isPressed ? 'pressed' : ''}`} title="Add to favourites" onClick={AddToFavourites} >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}

export default FavouritesButton;