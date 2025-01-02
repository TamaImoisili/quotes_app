// NewQuoteButton.js
import React from 'react';
import '../Styles/NewQuoteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

function NewQuoteButton({ quoteURL, defaultURL, updateQuote, favesPressed}) {
  
  const getRandomQuote = async () => {
    try {
      // Fetch a new background photo
      console.log(quoteURL);
      console.log(defaultURL);
      const response = await fetch(quoteURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newQuotedata = await response.json();
      console.log(newQuotedata[0]);
      updateQuote(newQuotedata[0]); // Call the updateQuote function from props
      favesPressed(false);
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