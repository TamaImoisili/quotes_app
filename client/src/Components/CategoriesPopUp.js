import React, { useState, useEffect, useMemo } from 'react';
import '../Styles/CategoriesPopUp.css'; // Adjust the path based on your project structure

const CategoriesPopUp = ({ isOpen, onRequestClose, onSelectCategory, selectedCategory }) => {
  const categories = useMemo(
    () => ['Inspirational', 'Motivational', 'Love', 'Wisdom', 'Life', 'Success', 'Friendship', 'Competition','Sports', 'Famous','Business','Change'], 
    []
  );
  const [selectedButton, setSelectedButton] = useState(null);

  const categorySlugMap = {
    'Famous': 'famous-quotes',
  };
  useEffect(() => {
    var tempSelected = '';
    if(selectedCategory==='famous-quotes'){
      tempSelected='Famous';
    }else{
      tempSelected = selectedCategory;
    }
    const selectedIndex = categories.indexOf(tempSelected);
    if(selectedButton!=null){
      setSelectedButton(selectedButton);
    }else{
      setSelectedButton(selectedIndex !== -1 ? selectedIndex : null);
    }

  }, [selectedCategory, selectedButton, setSelectedButton, categories]);
  
  const handleCategoryClick = (index) => {
    setSelectedButton(index);
  };
  
  const handleReset = () => {
    setSelectedButton(null);
    onSelectCategory("");
    onRequestClose();
  };

  const handleApply = () => {
    // Optionally, you can add additional logic before closing the modal
    const selectedCategoryValue = selectedButton !== null ? categories[selectedButton] : "";
    const selectedCategorySlug = categorySlugMap[selectedCategoryValue] || selectedCategoryValue;

    onSelectCategory(selectedCategorySlug);
    setSelectedButton(null);
    onRequestClose();
  };
  const handleCancel = () => {
    setSelectedButton(null);
    onRequestClose();
  };
return (
    <div  className={`category-popup ${isOpen ? 'visible' : ''}`}>
    {categories.map((category, index) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(index)}
          className={selectedButton === index ? 'selected' : ''}
        >
          {category}
        </button>
      ))}
    <div className="action-buttons">
        <button onClick={handleApply}>Apply</button>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleReset}>Reset</button>
      </div>
  </div>
);

};

export default CategoriesPopUp;
