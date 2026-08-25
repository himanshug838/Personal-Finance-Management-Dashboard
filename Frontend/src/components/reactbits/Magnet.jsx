import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
  inactiveTransition = { type: 'spring', stiffness: 300, damping: 20 },
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, inactiveTransition);
  const y = useSpring(0, inactiveTransition);

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX / magnetStrength);
    y.set(distanceY / magnetStrength);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;
