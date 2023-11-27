// NewQuoteButton.js
import React from 'react';
import '../Styles/NewQuoteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

function NewQuoteButton({ updateQuote }) {

  const getRandomQuote = async () => {
    try {
      // Fetch a new background photo
      // const backgroundResponse = await fetch( 'http://localhost:3000/getBackground');
      // const backgroundData = await backgroundResponse.json();
      // updateBackgroundPhoto(backgroundData);
      const apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://tama-imoisili-quotes-app-2cb0e821d0e8.herokuapp.com/getRandomQuote'
      : 'http://localhost:3000/getRandomQuote';
      console.log(process.env.NODE_ENV);
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
        <FontAwesomeIcon icon={faRandom} />
    </button>
  );
}

export default NewQuoteButton;