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
      viewBox='0 0 568 501'
      fill='none'
    >
      <path
        d='M123.121 33.664C179.927 80.664 240.755 175.715 284 233.723c43.245-58.008 104.073-153.059 160.879-200.059C491.866-1.386 568-14.831 568 57.064c0 14.434-8.254 121.169-13.091 138.499-16.923 60.37-78.569 75.808-133.402 66.498 95.768 16.288 120.19 70.248 67.522 124.208-99.882 102.501-143.642-25.723-154.638-58.543-1.98-5.802-2.9-8.514-2.9-6.216v.006c0-2.298-.921.414-2.9 6.216-11.003 32.82-54.756 161.044-154.638 58.543-52.668-53.96-28.246-107.92 67.522-124.208-54.833 9.31-116.479-6.128-133.402-66.498C8.254 178.233 0 71.498 0 57.064 0-14.831 76.135-1.386 123.121 33.664Z'
        fill={theme.palette.themePrimary}
      />
    </svg>
  );
};

export default BlueSkyLogo;
