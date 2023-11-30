import '../Styles/Home.css';
import QuoteContainer from './QuoteContainer';
import NewQuoteButton from './NewQuoteButton';
import FavouritesButton from './FavouritesButton';
import SignInButton from './SignInButton';
import React, { useState } from 'react';
import NewImageButton from './NewImageButton';
import ViewFavourites from './ViewFavourtiesButton';
import SignInSignOut from './SignInSignOut';
import CategoriesButton from './CategoriesButton';
import ShareQuoteButton from './ShareQuoteButton';

function Home() {
  const quote = { text: 'Welcome to my quote generator app' };
  const author = { text: 'By Tama Imoisili' };
  const [currentQuote, setCurrentQuote] = useState(quote);
  const [currentAuthor, setCurrentAuthor] = useState( author);
  const [backgroundPhoto, setBackgroundImage] = useState('/default.jpg');
  const [isMenuOpen, setMenuOpen] = useState(false);

  const updateQuote = (newQuote) => {
    setCurrentQuote({ text: newQuote.content });
    setCurrentAuthor({ text: newQuote.author });
  };
  const updateBgImage = (newImage) => {
    setBackgroundImage(newImage);
  };
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
};

  //<QuoteContainer quote={staticQuote} author={staticAuthor.text} />
  return (
    <div className="Home">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundPhoto.startsWith('http') ? '' : process.env.PUBLIC_URL}${backgroundPhoto})` }}></div>
        <QuoteContainer quote={currentQuote.text} author={currentAuthor.text} />
        <NewQuoteButton updateQuote={updateQuote}/>
        <NewImageButton updateBgImage={updateBgImage}/>
        <FavouritesButton/>
        <SignInButton toggleMenu={toggleMenu}/>
        <ViewFavourites/>
        <CategoriesButton/>
        <ShareQuoteButton/>
    </div>
  );
}

export default Home;