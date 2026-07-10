import React from 'react';

interface RSSLogoProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const RSSLogo: React.FC<RSSLogoProps> = ({
  className,
  style,
  color,
}) => {
  const fillColor = color || 'var(--fx-accent)';

  return (
    <svg
      className={className}
      style={{ width: '24px', height: '24px', ...style }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
    >
      {/* RSS logo - waves and dot */}
      <circle cx='6' cy='18' r='2' fill={fillColor} />
      <path
        d='M4 12c4.42 0 8 3.58 8 8'
        stroke={fillColor}
        strokeWidth='2'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M4 4c8.84 0 16 7.16 16 16'
        stroke={fillColor}
        strokeWidth='2'
        strokeLinecap='round'
        fill='none'
      />
    </svg>
  );
};

export default RSSLogo;
