import React from 'react';
import '../Styles/QuoteContainer.css';
import NewQuoteButton from './NewQuoteButton';
import FavouritesButton from './FavouritesButton';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function QuoteContainer({ quote, author }) {

  return (
    <div className="QuoteContainer">
       <p className="QuoteText">
          <i className="fa-quote-left"><FontAwesomeIcon icon={faQuoteLeft} /> </i>
          {quote.text}
          <i className="fa-quote-right"> <FontAwesomeIcon icon={faQuoteRight} /></i> 
       </p>
      {author && <p className="QuoteAuthor">{author}.</p>}
      <NewQuoteButton/>
      <FavouritesButton/>
    </div>
  );
}

export default QuoteContainer;