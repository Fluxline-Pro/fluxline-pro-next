import React from 'react';

interface GeneratedWithAISvgProps {
  isDarkMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Generated With AI SVG Icon
 * Three-sparkle icon indicating AI-assisted content.
 */
export const GeneratedWithAISvg: React.FC<GeneratedWithAISvgProps> = ({
  className,
  style,
}) => {
  return (
    <svg
      className={className}
      style={{ width: '24px', height: '24px', ...style }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      aria-hidden='true'
    >
      {/* Large sparkle — centre-left */}
      <path
        d='M8.5 8.5L9.7 12.8L14 14L9.7 15.2L8.5 19.5L7.3 15.2L3 14L7.3 12.8Z'
        fill='var(--fx-accent)'
      />
      {/* Medium sparkle — upper-right */}
      <path
        d='M18 2.5L18.7 4.8L21 5.5L18.7 6.2L18 8.5L17.3 6.2L15 5.5L17.3 4.8Z'
        fill='var(--fx-accent)'
      />
      {/* Small sparkle — lower-right */}
      <path
        d='M20 15.7L20.55 17.45L22.3 18L20.55 18.55L20 20.3L19.45 18.55L17.7 18L19.45 17.45Z'
        fill='var(--fx-accent)'
      />
    </svg>
  );
};

export default GeneratedWithAISvg;
