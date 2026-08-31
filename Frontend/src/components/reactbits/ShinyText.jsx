/**
 * UI Component powered by React Bits
 * @see https://www.reactbits.dev/
 */
import React from 'react';

const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
  shimmerColor = '#ffffff',
}) => {
  return (
    <span
      className={`inline-block font-semibold ${
        disabled
          ? ''
          : 'bg-clip-text text-transparent bg-[linear-gradient(110deg,#355EFC,45%,#ffffff,55%,#355EFC)] bg-[length:200%_100%] animate-shiny-text'
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
