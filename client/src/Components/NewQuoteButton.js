// NewQuoteButton.js
import React from 'react';
import '../Styles/NewQuoteButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';

function NewQuoteButton({ updateQuote, bgImage }) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const getRandomQuote = async () => {
    try {
      // Fetch a new background photo
      const apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://tama-imoisili-quotes-app-2cb0e821d0e8.herokuapp.com'
      : 'http://localhost:3000';
      const backgroundResponse = await fetch( `${apiUrl}/getBackground?width=${screenWidth}&height=${screenHeight}`);
      const backgroundData = backgroundResponse.ok ? await backgroundResponse.json() : '/default.jpg';
      const backgroundImageUrl = backgroundResponse.ok ? backgroundData.urls.regular : '/default.jpg';
      console.log(backgroundImageUrl);
      const response = await fetch(`${apiUrl}/getRandomQuote`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newQuotedata = await response.json();

      updateQuote(newQuotedata, backgroundImageUrl); // Call the updateQuote function from props
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