import React from 'react';

interface DeezerLogoProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const DeezerLogo: React.FC<DeezerLogoProps> = ({
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
      {/* Deezer logo - horizontal bars */}
      <rect x='3' y='4' width='8' height='2.5' rx='0.5' fill={fillColor} />
      <rect x='3' y='8' width='8' height='2.5' rx='0.5' fill={fillColor} />
      <rect x='3' y='12' width='8' height='2.5' rx='0.5' fill={fillColor} />
      <rect x='3' y='16' width='8' height='2.5' rx='0.5' fill={fillColor} />
      <rect x='13' y='8' width='8' height='2.5' rx='0.5' fill={fillColor} />
      <rect x='13' y='12' width='8' height='2.5' rx='0.5' fill={fillColor} />
      <rect x='13' y='16' width='8' height='2.5' rx='0.5' fill={fillColor} />
    </svg>
  );
};

export default DeezerLogo;
