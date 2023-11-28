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
      const apiUrl = `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=yQ9KO4B4hQ3PB68zH_p9329REx24t6hS0fn5eThGStw&width=${screenWidth}&height=${screenHeight}`;
      const backgroundResponse = await fetch( apiUrl);
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