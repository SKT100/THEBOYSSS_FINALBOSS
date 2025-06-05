
import React from 'react';

const splitText = (text) => {
  return text.split('').map((char, index) => {
    const isBold = index < 6;
    return (
      <span
        key={index}
        className="letter"
        style={{
          animationDelay: `${index * 0.05}s`,
          fontWeight: isBold ? 'bold' : 'normal',
        }}
      >
        {char}
      </span>
    );
  });
};

export default splitText;
