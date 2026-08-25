import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const TiltedCard = ({
  children,
  className = '',
  maxRotation = 15,
  scaleOnHover = 1.03,
  glareOpacity = 0.3,
  style = {},
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY - height / 2) / (height / 2)) * -maxRotation;
    const rY = ((mouseX - width / 2) / (width / 2)) * maxRotation;

    rotateX.set(rX);
    rotateY.set(rY);

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      {...props}
    >
      {/* Glare overlay */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${x.get()}px ${y.get()}px, rgba(255, 255, 255, ${glareOpacity}), transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default TiltedCard;
