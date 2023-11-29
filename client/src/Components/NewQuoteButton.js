// NewQuoteButton.js
import React from 'react';
import '../Styles/NewQuoteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

function NewQuoteButton({ updateQuote}) {
  
  const getRandomQuote = async () => {
    try {
      // Fetch a new background photo
      const apiUrl =`https://api.quotable.io/random`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newQuotedata = await response.json();

      updateQuote(newQuotedata); // Call the updateQuote function from props
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <button className="NewQuoteButton" onClick={getRandomQuote}>
        <FontAwesomeIcon icon={faRandom} title='Get new quote' />
    </button>
  );
}

export default NewQuoteButton;