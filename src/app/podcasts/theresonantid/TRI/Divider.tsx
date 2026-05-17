import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

interface DividerProps {
  top?: boolean; // If true, adds extra top margin for spacing when used at the top of a section
  bottom?: boolean; // If true, adds extra bottom margin for spacing when used at the bottom of a section
}

export const Divider: React.FC<DividerProps> = ({ top, bottom }) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        borderTop: `1px solid ${theme.palette.neutralPrimary}`,
        marginTop: top ? theme.spacing.xxxl : theme.spacing.m,
        marginBottom: bottom ? theme.spacing.xxxl : theme.spacing.m,
      }}
    />
  );
}

export default Divider;