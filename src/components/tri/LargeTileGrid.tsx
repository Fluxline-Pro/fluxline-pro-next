'use client';

import React from 'react';
import { useAppTheme } from '../../theme/hooks/useAppTheme';

export interface LargeTileGridProps {
  children: React.ReactNode;
  className?: string;
}

export function LargeTileGrid({ children, className }: LargeTileGridProps) {
  const { theme } = useAppTheme();

  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 ${className ?? ''}`.trim()}
      style={{
        gap: theme.spacing.l,
      }}
    >
      {children}
    </div>
  );
}

export default LargeTileGrid;
