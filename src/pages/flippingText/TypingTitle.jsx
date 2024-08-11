

// src/components/TypingTitle.js
import React, { useEffect, useState } from 'react';
import './TypingTitle.css';

const TypingTitle = ({ title }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(title.substring(0, index));
      index++;
      if (index > title.length) {
        clearInterval(interval);
      }
    }, 150); // Adjust typing speed here

    return () => clearInterval(interval); // Cleanup on unmount
  }, [title]);

  return <h1 className="typing-title">{displayedText}</h1>;
};


export default TypingTitle;
