import React from 'react';
import { mergeStyles } from '@fluentui/react';
import { useAppTheme } from '../../theme/hooks/useAppTheme';

interface BlueSkyLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const BlueSkyLogo: React.FC<BlueSkyLogoProps> = ({
  className,
  style,
}) => {
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
      fill={theme.palette.themePrimary}
    >
      <path d='M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.948-4.547 1.85-6.271-1.335-7.233a12.04 12.04 0 0 0-1.158-.233 13.58 13.58 0 0 0 1.158.233c2.39.39 5.988-.305 6.703-3.371C23.656 9.338 24 4.59 24 3.768c0-.688-.139-1.86-.902-2.203-.66-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z' />
    </svg>
  );
};

export default BlueSkyLogo;
