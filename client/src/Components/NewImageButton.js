// NewImageButton.js
import React from 'react';
import '../Styles/NewImageButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function NewImageButton({ updateBgImage}) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const getNewImage = async () => {
      // Fetch a new background photo
      const apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://tama-imoisili-quotes-app-2cb0e821d0e8.herokuapp.com'
      : 'http://localhost:3000';
      const backgroundResponse = await fetch( `${apiUrl}/getBackground?width=${screenWidth}&height=${screenHeight}`);
      const backgroundData = backgroundResponse.ok ? await backgroundResponse.json() : '/default.jpg';
      const backgroundImageUrl = backgroundResponse.ok ? backgroundData.urls.regular : '/default.jpg';
      updateBgImage(backgroundImageUrl)

  };
  return (
    <button className="NewImageButton" onClick={getNewImage}>
        <FontAwesomeIcon icon={faImage} />
    </button>
  );
}

export default NewImageButton;