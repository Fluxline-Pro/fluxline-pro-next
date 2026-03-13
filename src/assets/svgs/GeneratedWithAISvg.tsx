import React from 'react';

interface GeneratedWithAISvgProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Generated With AI SVG Icon
 * Card-style AI badge icon with directional arrow indicator
 */
export const GeneratedWithAISvg: React.FC<GeneratedWithAISvgProps> = ({
  className,
  style,
}) => {
  return (
    <svg
      className={className}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 22 22'
      fill='none'
      aria-hidden='true'
    >
      {/* Card outline */}
      <rect
        x='1.5'
        y='4'
        width='12'
        height='14'
        rx='2.5'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      {/* Letter A — diagonals */}
      <path
        d='M4.5 16L6.75 10.5L9 16'
        stroke='currentColor'
        strokeWidth='1.35'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {/* Letter A — crossbar */}
      <path
        d='M5.3 14H8.2'
        stroke='currentColor'
        strokeWidth='1.35'
        strokeLinecap='round'
      />
      {/* Letter I */}
      <path
        d='M11 10.5V16'
        stroke='currentColor'
        strokeWidth='1.35'
        strokeLinecap='round'
      />
      {/* Corner arrow indicator (upper-right) — L bracket */}
      <path
        d='M14.5 2H20.5V8'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {/* Corner arrow — diagonal slash */}
      <path
        d='M20.5 2L14.5 8'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default GeneratedWithAISvg;
