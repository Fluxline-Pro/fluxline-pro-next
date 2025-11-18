import React from 'react';
import { mergeStyles } from '@fluentui/react';
import { useAppTheme } from '../../theme/hooks/useAppTheme';

interface EmailLogoProps {
  isDarkMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const EmailLogo: React.FC<EmailLogoProps> = ({ className, style }) => {
  const { theme } = useAppTheme();
  const rootClass = mergeStyles(
    {
      width: '24px',
      height: '24px',
    },
    className
  );

  return (
    <svg
      className={rootClass}
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
        stroke={theme.palette.themePrimary}
        strokeWidth='2'
        fill='none'
      />
      <path
        d='m22 6-10 7L2 6'
        stroke={theme.palette.themePrimary}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
    </svg>
  );
};

export default EmailLogo;
