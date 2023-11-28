// Options.js
import React from 'react';
import '../Styles/OptionsButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars }from '@fortawesome/free-solid-svg-icons';
function OptionsButton({ onClick }) {
  return (
    <button className="OptionsButton" onClick={onClick}>
       <FontAwesomeIcon icon={faBars} />
    </button>
  );
}

export default OptionsButton;