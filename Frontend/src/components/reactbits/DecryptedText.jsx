/**
 * UI Component powered by React Bits
 * @see https://www.reactbits.dev/
 */
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const DecryptedText = ({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const getRandomChar = (targetChar) => {
    if (useOriginalCharsOnly && text) {
      return text[Math.floor(Math.random() * text.length)];
    }
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const textLength = text.length;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';

            if (sequential) {
              if (index < Math.floor((iteration / maxIterations) * textLength)) {
                return text[index];
              }
            } else {
              if (iteration >= maxIterations) {
                return text[index];
              }
            }

            return getRandomChar(char);
          })
          .join('');
      });

      iteration += 1;

      if (iteration > maxIterations + (sequential ? textLength : 0)) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view' && isInView) {
      triggerAnimation();
    }
  }, [isInView, animateOn]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (animateOn === 'hover') {
      triggerAnimation();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block cursor-default ${parentClassName}`}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
};

export default DecryptedText;
