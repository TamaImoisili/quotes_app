// ShareQuoteButton.js
import React from 'react';
import '../Styles/ShareQuoteButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

function ShareQuoteButton({ onClick }) {
  return (
    <button className="ShareQuoteButton" title='Share this quote' onClick={onClick}>
         <FontAwesomeIcon icon={faShare}/>
    </button>
  );
}

export default ShareQuoteButton;