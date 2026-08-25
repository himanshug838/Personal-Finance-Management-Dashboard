import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SplitText = ({
  text = '',
  className = '',
  delay = 0.05,
  animationFrom = { opacity: 0, y: 20 },
  animationTo = { opacity: 1, y: 0 },
  easing = [0.25, 0.1, 0.25, 1],
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'left',
  onLetterAnimationComplete,
}) => {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin, amount: threshold });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: animationFrom,
    visible: {
      ...animationTo,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap gap-x-1.5 ${className}`}
      style={{ textAlign }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={itemVariants}
              className="inline-block"
              onAnimationComplete={
                wordIndex === words.length - 1 && charIndex === word.length - 1
                  ? onLetterAnimationComplete
                  : undefined
              }
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

export default SplitText;
