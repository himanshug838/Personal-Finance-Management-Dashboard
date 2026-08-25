import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CountUp = ({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = ',',
  decimals = 2,
  decimal = '.',
  prefix = '',
  suffix = '',
  onEnd,
  onStart,
}) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || !startWhen || hasAnimated.current) return;
    hasAnimated.current = true;

    if (onStart) onStart();

    let startTime = null;
    let animationFrame = null;

    const startValue = direction === 'down' ? to : from;
    const endValue = direction === 'down' ? from : to;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeProgress;

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(endValue);
        if (onEnd) onEnd();
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, startWhen, from, to, direction, duration, delay, onStart, onEnd]);

  const formatNumber = (num) => {
    const fixedNum = Number(num).toFixed(decimals);
    const [intPart, decPart] = fixedNum.split('.');

    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    if (decimals > 0 && decPart !== undefined) {
      return `${prefix}${formattedInt}${decimal}${decPart}${suffix}`;
    }
    return `${prefix}${formattedInt}${suffix}`;
  };

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
    </span>
  );
};

export default CountUp;
