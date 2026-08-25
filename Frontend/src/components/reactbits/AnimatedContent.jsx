/**
 * UI Component powered by React Bits
 * @see https://www.reactbits.dev/
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedContent = ({
  children,
  distance = 30,
  direction = 'vertical',
  reverse = false,
  config = { damping: 20, stiffness: 100 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const getOffset = () => {
    const d = reverse ? -distance : distance;
    if (direction === 'vertical') return { y: d, x: 0 };
    return { x: d, y: 0 };
  };

  const offset = getOffset();

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: animateOpacity ? initialOpacity : 1,
        x: offset.x,
        y: offset.y,
        scale: scale !== 1 ? 0.95 : 1,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          : undefined
      }
      transition={{
        type: 'spring',
        ...config,
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
