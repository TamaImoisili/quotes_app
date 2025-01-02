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
import DownloadQuoteButton from './DownloadQuoteButton';
import SignInPopup from './signInPopUp';
import ErrorMessagePopup from './ErrorMessage';
import CategoriesPopUp from './CategoriesPopUp';
import DeleteAccPage from './DeleteAccPage';
import html2canvas from 'html2canvas';

function Home() {
    const quote = { text: 'Welcome to my quote generator app' };
    const author = { text: 'By Tama Imoisili' };
    const [currentQuote, setCurrentQuote] = useState(quote);
    const [currentAuthor, setCurrentAuthor] = useState(author);
    const [backgroundPhoto, setBackgroundImage] = useState('/default.jpg');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isSignInPopupVisible, setSignInPopupVisibility] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userId, setUserID] = useState(0);
    const [error, setError] = useState(null);
    const [isPressed, setIsPressed] = useState(false);
    const defaultURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8888/.netlify/functions/api' // Local API URL
  : 'https://quotes-server.netlify.app/.netlify/functions/api'; // Production URL
    console.log(defaultURL);
    const [quoteURL, updateURL] = useState(`${defaultURL}/getRandom`);
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [errorStatus, setErrorStatus] = useState(2);
    const [downloadStatus, setDownloadStatus] = useState(true);
    const [errorIsVisible, setErrorIsVisible] = useState(false);
    const [demoMode, setDemoMode] = useState(false);
    const [delteAccount, setDeleteAccount] = useState(false);

    const updateQuote = (newQuote) => {
        setCurrentQuote({ text: newQuote.q });
        setCurrentAuthor({ text: newQuote.a });
    };
    const updateBgImage = (newImage) => {
        setBackgroundImage(newImage);
    };
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const setSignInVisibility = (newVisibility) => {
        setSignInPopupVisibility(newVisibility);
    };
    const updateAuth = (newAuth) => {
        setAuthenticated(newAuth);
    };
    const updateUserId = (newID) => {
        setUserID(newID);
    };
    const updateIsOpen = (newIsOpen) => {
        setMenuOpen(newIsOpen);
    };
    const updateIsPressed = (newIsPressed) => {
        setIsPressed(newIsPressed);
    };
    const openCategoryModal = () => {
        setCategoryModalOpen(true);
    };
    const closeCategoryModal = () => {
        setCategoryModalOpen(false);
    };

    const handleSelectCategory = (category) => {
        var updatedURL = "";

        if (category === "") {
            updatedURL = quoteURL;
        } else {
            updatedURL = `${quoteURL}?tags=${category}`;
        }

        setSelectedCategory(category);
        updateURL(updatedURL);
        closeCategoryModal();
        // Perform actions based on the selected category (e.g., fetch quotes for the selected category)
    };
    const downloadQuote = async () => {
        try {

            setDownloadStatus(false);
            await new Promise(resolve => setTimeout(resolve, 100));
            const backgroundDiv = document.getElementById('background-image');
            if (backgroundDiv) {
                backgroundDiv.style.filter = 'brightness(0.3)';
            }
            const canvas = await html2canvas(document.documentElement, { useCORS: true, scale: 1 });

            // Reset the filter effect on the background image div
            if (backgroundDiv) {
                backgroundDiv.style.filter = 'none';
            }
            // Convert the canvas to a data URL
            const screenshotUrl = canvas.toDataURL('image/png');

            // Create a link and trigger a download
            const link = document.createElement('a');
            link.href = screenshotUrl;
            link.download = 'quote_screenshot.png';
            link.click();

            setDownloadStatus(true);
        } catch (error) {
            console.error('Error capturing screenshot:', error);
        }
    };

    const errorSetter = (newStatus, newError) =>{
        setErrorStatus(newStatus);
        setError(newError);
        setErrorIsVisible(true);
    };
    const updateDemo = (newDemo) => {
        setDemoMode(newDemo);
    };
    const updateDelete = (newDelete)=>{
        setDeleteAccount(newDelete);
    }

    //<QuoteContainer quote={staticQuote} author={staticAuthor.text} />
    return (
        <div id='Home' className="Home">
            <div className="background-image-wrapper">
                <div className="background-image" style={{ backgroundImage: `url(${backgroundPhoto.startsWith('http') ? '' : process.env.PUBLIC_URL}${backgroundPhoto})` }}></div>
                <div className="overlay"></div>
            </div>
            {downloadStatus && <NewQuoteButton quoteURL={quoteURL} defaultURL={defaultURL} updateQuote={updateQuote} favesPressed={setIsPressed} />}
            {downloadStatus && <NewImageButton updateBgImage={updateBgImage} />}
            {downloadStatus && <FavouritesButton isPressed={isPressed} setIsPressed={setIsPressed} isAuthenticated={isAuthenticated} user_id={userId} quoteMacro={quote} authorMacro={author} setError={setError} />}
            {downloadStatus && <SignInButton toggleMenu={toggleMenu} />}
            {downloadStatus && <SignInSignOut setDelete={updateDelete} isDemo={demoMode} setDemo={updateDemo} setGlobalError={errorSetter} isPressed={isPressed} signInVisibility={setSignInVisibility} isSignInPopupVisible={isSignInPopupVisible} isOpen={isMenuOpen} isAuthenticated={isAuthenticated} updateAuth={updateAuth} updateIsOpen={updateIsOpen} updateIsPressed={updateIsPressed} />}
            {downloadStatus && <ViewFavourites userId={userId} />}
            {downloadStatus && <CategoriesButton onClick={openCategoryModal} />}
            {downloadStatus && <DownloadQuoteButton downloadQuote={downloadQuote} />}
            <QuoteContainer quote={currentQuote.text} author={currentAuthor.text} />
            {downloadStatus && isSignInPopupVisible && <SignInPopup isDemo={demoMode} setDemo={updateDemo} setGlobalError={errorSetter} isOpen={isSignInPopupVisible} setVisibility={setSignInVisibility} setAuth={updateAuth} setUserID={updateUserId} updateIsOpen={updateIsOpen} />}
            {downloadStatus && isCategoryModalOpen && <CategoriesPopUp isOpen={isCategoryModalOpen} onRequestClose={closeCategoryModal} onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />}
            {downloadStatus && error && <ErrorMessagePopup isVisible={errorIsVisible} setIsVisible={setErrorIsVisible} errorMessage={error} errorStatus={errorStatus} />}
            {downloadStatus && delteAccount && <DeleteAccPage demoMode={demoMode} setError={errorSetter} updateDeletePage={updateDelete} />}
        </div>
    );
}

export default Home;