import './App.css';
import QuoteContainer from './Components/QuoteContainer';
import NewQuoteButton from './Components/NewQuoteButton';
import FavouritesButton from './Components/FavouritesButton';
import SignInButton from './Components/SignInButton';
import OptionsButton from './Components/OptionsButton';
import React, { useState } from 'react';
import NewImageButton from './Components/NewImageButton';

function App() {
  const quote = { text: 'Welcome to my quote generator app' };
  const author = { text: 'By Tama Imoisili' };
  const [currentQuote, setCurrentQuote] = useState(quote);
  const [currentAuthor, setCurrentAuthor] = useState( author);
  const [backgroundPhoto, setBackgroundImage] = useState('/default.jpg');

  const updateQuote = (newQuote) => {
    setCurrentQuote({ text: newQuote.content });
    setCurrentAuthor({ text: newQuote.author });
  };
  const updateBgImage = (newImage) => {
    setBackgroundImage(newImage);
  }

  //<QuoteContainer quote={staticQuote} author={staticAuthor.text} />
  return (
    <div className="App">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundPhoto.startsWith('http') ? '' : process.env.PUBLIC_URL}${backgroundPhoto})` }}></div>
      <QuoteContainer quote={currentQuote.text} author={currentAuthor.text} />
      <NewQuoteButton updateQuote={updateQuote}/>
      <NewImageButton updateBgImage={updateBgImage}/>
      <FavouritesButton/>
      <SignInButton/>
      <OptionsButton/>
    </div>
  );
}

export default App;
