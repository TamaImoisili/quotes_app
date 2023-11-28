import './App.css';
import QuoteContainer from './Components/QuoteContainer';
import NewQuoteButton from './Components/NewQuoteButton';
import FavouritesButton from './Components/FavouritesButton';
import SignInButton from './Components/SignInButton';
import OptionsButton from './Components/OptionsButton';
import React, { useState } from 'react';

function App() {
  const quote = { text: 'Welcome to my quote generator app' };
  const author = { text: 'By Tama Imoisili' };
  const [currentQuote, setCurrentQuote] = useState(quote);
  const [currentAuthor, setCurrentAuthor] = useState( author);
  const [backgroundPhoto, setBackgroundImage] = useState('/default.jpg');

  const updateQuote = (newQuote, bgImage) => {
    setCurrentQuote({ text: newQuote.content });
    setCurrentAuthor({ text: newQuote.author });
    setBackgroundImage(bgImage);
  };

  //<QuoteContainer quote={staticQuote} author={staticAuthor.text} />
  return (
    <div className="App">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundPhoto.startsWith('http') ? '' : process.env.PUBLIC_URL}${backgroundPhoto})` }}></div>
      <QuoteContainer quote={currentQuote.text} author={currentAuthor.text} />
      <NewQuoteButton updateQuote={updateQuote} bgImage={backgroundPhoto}/>
      <FavouritesButton/>
      <SignInButton/>
      <OptionsButton/>
    </div>
  );
}

export default App;
