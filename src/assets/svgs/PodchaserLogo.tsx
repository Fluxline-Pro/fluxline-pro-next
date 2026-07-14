import React from 'react';

interface PodchaserLogoProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const PodchaserLogo: React.FC<PodchaserLogoProps> = ({
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
      {/* Podchaser - "P" monogram with a play mark in the bowl */}
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6 3.4h6.4a5.5 5.5 0 0 1 0 11H9.3v6.2H6V3.4zm3.3 2.95v5.1h3a2.55 2.55 0 0 0 0-5.1h-3z'
        fill={fillColor}
      />
      <path d='M10.35 7.55l3 1.35-3 1.35V7.55z' fill={fillColor} />
    </svg>
  );
};

export default PodchaserLogo;
