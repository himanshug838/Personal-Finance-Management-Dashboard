/**
 * UI Component powered by React Bits
 * @see https://www.reactbits.dev/
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BlurText = ({
  text = '',
  delay = 0.1,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  onAnimationComplete,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const getVariant = () => {
    const yOffset = direction === 'top' ? -15 : 15;
    return {
      hidden: {
        filter: 'blur(10px)',
        opacity: 0,
        y: yOffset,
      },
      visible: (i) => ({
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        transition: {
          delay: i * delay,
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }),
    };
  };

  const variants = getVariant();

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-1.5 ${className}`}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={variants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          className="inline-block"
        >
          {el === ' ' ? '\u00A0' : el}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
