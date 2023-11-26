// FavouritesButton.js
import React from 'react';
import '../Styles/FavouritesButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function FavouritesButton({ onClick }) {
  return (
    <button className="FavouritesButton" onClick={onClick}>
        <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}

export default FavouritesButton;