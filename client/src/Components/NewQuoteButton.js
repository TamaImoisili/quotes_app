// NewQuoteButton.js
import React from 'react';
import '../Styles/NewQuoteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

function NewQuoteButton({ onClick }) {
  return (
    <button className="NewQuoteButton" onClick={onClick}>
        <FontAwesomeIcon icon={faRandom} />
    </button>
  );
}

export default NewQuoteButton;