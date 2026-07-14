import React from 'react';

interface SpreakerLogoProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const SpreakerLogo: React.FC<SpreakerLogoProps> = ({
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
      {/* Spreaker mark */}
      <path
        d='M14.615 0l-5.64 6.54L.529 4.718l8.68 7.372-8.537 7.463 8.411-1.984L14.843 24l.71-8.601 7.918-3.483-7.963-3.33L14.621 0h-.006z'
        fill={fillColor}
      />
    </svg>
  );
};

export default SpreakerLogo;
