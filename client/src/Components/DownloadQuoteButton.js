// ShareQuoteButton.js
import React from 'react';
import '../Styles/DownloadQuoteButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function ShareQuoteButton({ downloadQuote}) {


  return (
    <button className="ShareQuoteButton" title='Share this quote' onClick={downloadQuote}>
         <FontAwesomeIcon icon={faDownload}/>
    </button>
  );
}

export default ShareQuoteButton;