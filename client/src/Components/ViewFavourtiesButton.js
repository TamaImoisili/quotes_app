// ViewFavourites.js
import React from 'react';
import '../Styles/ViewFavouritesButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleCheck } from '@fortawesome/free-solid-svg-icons';

function ViewFavourites({ onClick }) {
  return (
    <button className="ViewFavourites" title='View favourites'onClick={onClick}>
        <FontAwesomeIcon icon={faHeartCircleCheck}/>
    </button>
  );
}

export default ViewFavourites;