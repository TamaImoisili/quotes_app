// FavouritesButton.js
import React, {useState} from 'react';
import '../Styles/FavouritesButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function FavouritesButton() {
  const [isPressed, setIsPressed] = useState(false);

  const AddToFavourites = () => {
    // Toggle the pressed state
    setIsPressed(!isPressed);
  };

  return (
    <button className={`FavouritesButton ${isPressed ? 'pressed' : ''}`} title="Add to favourites" onClick={AddToFavourites} >
          <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}

export default FavouritesButton;