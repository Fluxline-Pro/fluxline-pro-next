import React from 'react';

interface AmazonMusicLogoProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const AmazonMusicLogo: React.FC<AmazonMusicLogoProps> = ({
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
      {/* Amazon Music - eighth note above the Amazon smile */}
      <path
        d='M16 4.1l-6.6 1.5v7.53a2.9 2.9 0 1 0 1.7 2.64V8.03l4.9-1.11V4.1z'
        fill={fillColor}
      />
      <path
        d='M5.4 18.9c1.98 1.42 4.2 2.13 6.6 2.13 2.4 0 4.62-.71 6.6-2.13'
        stroke={fillColor}
        strokeWidth='1.7'
        strokeLinecap='round'
        fill='none'
      />
      <path
        d='M18.85 16.7l.55 2.25-2.25-.55z'
        fill={fillColor}
      />
    </svg>
  );
};

export default AmazonMusicLogo;
