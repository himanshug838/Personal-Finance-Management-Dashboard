import React from 'react';

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = '#355EFC',
  speed = '6s',
  children,
  ...props
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-xl p-[1px] ${className}`}
      {...props}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#355EFC] to-transparent opacity-80 animate-star-border"
        style={{
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 w-full h-full rounded-[inherit]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
