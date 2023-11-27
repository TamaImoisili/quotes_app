import './App.css';
import QuoteContainer from './Components/QuoteContainer';
import NewQuoteButton from './Components/NewQuoteButton';
import FavouritesButton from './Components/FavouritesButton';
import React, { useState } from 'react';

function App() {
  const quote = { text: 'Welcome to my quote generator app' };
  const author = { text: 'By Tama Imoisili' };
  const [currentQuote, setCurrentQuote] = useState(quote);
  const [currentAuthor, setCurrentAuthor] = useState( author);

  const updateQuote = (newQuote) => {
    setCurrentQuote({ text: newQuote.content });
    setCurrentAuthor({ text: newQuote.author });
  };
  //<QuoteContainer quote={staticQuote} author={staticAuthor.text} />
  return (
    <div className="App">
      <QuoteContainer quote={currentQuote.text} author={currentAuthor.text} />
      <NewQuoteButton updateQuote={updateQuote}/>
      <FavouritesButton/>
    </div>
  );
}

export default App;
