// ViewFavourites.js
import React from 'react';
import '../Styles/CategoriesButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

function CategoriesButton({ onClick }) {
  return (
    <button className="CategoriesButton" onClick={onClick} title='Categories'>
         <FontAwesomeIcon icon={faTag}/> 
    </button>
  );
}

export default CategoriesButton;