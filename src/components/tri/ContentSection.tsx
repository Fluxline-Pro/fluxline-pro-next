'use client';

import React from 'react';
import { useAppTheme } from '../../theme/hooks/useAppTheme';

export interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
  surface?: 'default' | 'muted';
}

export function ContentSection({
  children,
  className,
  surface = 'default',
}: ContentSectionProps) {
  const { theme } = useAppTheme();

  return (
    <section
      className={`w-full ${className ?? ''}`.trim()}
      style={{
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        paddingLeft: theme.spacing.l,
        paddingRight: theme.spacing.l,
        borderRadius: theme.borderRadius.container.medium,
        backgroundColor:
          surface === 'muted' ? theme.palette.neutralLighterAlt : 'transparent',
      }}
    >
      {children}
    </section>
  );
}

export default ContentSection;
