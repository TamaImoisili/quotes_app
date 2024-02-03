import React from 'react';
import '../Styles/ErrorMessage.css'
const ErrorMessagePopup = ({ isVisible, setIsVisible, errorMessage, errorStatus }) => {

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {errorStatus===1 && isVisible && (
        <div className="error-popup">
          <p>{errorMessage}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
      {errorStatus===0 && isVisible && (
        <div className="success-popup">
          <p>{errorMessage}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  );
};

export default ErrorMessagePopup;
