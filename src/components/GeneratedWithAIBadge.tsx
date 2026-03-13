'use client';

import React from 'react';
import { TooltipHost, DirectionalHint } from '@fluentui/react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { GeneratedWithAISvg } from '@/assets/svgs/GeneratedWithAISvg';

/**
 * GeneratedWithAIBadge Component
 * Displays a "Generated with AI" pill badge with a gradient border and a
 * Fluent UI tooltip that appears on hover, tap, or keyboard focus (TAB).
 */
export const GeneratedWithAIBadge: React.FC = () => {
  const { theme, themeMode } = useAppTheme();

  const isDark =
    themeMode === 'dark' ||
    themeMode === 'grayscale-dark' ||
    themeMode === 'high-contrast';

  return (
    <TooltipHost
      content='This content was drafted with AI assistance and carefully verified by our team for accuracy. We take full responsibility for what we publish and advocate transparent, responsible AI use.'
      directionalHint={DirectionalHint.rightCenter}
      calloutProps={{ gapSpace: 10 }}
    >
      {/* Gradient border wrapper — padding trick creates the border */}
      <div
        tabIndex={0}
        role='img'
        aria-label='Generated with AI. This content was drafted with AI assistance and carefully verified by our team for accuracy.'
        className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-full'
        style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
          padding: '1.5px',
          borderRadius: '999px',
          cursor: 'default',
        }}
      >
        {/* Inner pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: isDark ? '#0d0d1a' : theme.palette.white,
            borderRadius: '999px',
            color: theme.palette.themePrimary,
            fontSize: '0.875rem',
            fontFamily: (theme.fonts.medium.fontFamily as string) || 'inherit',
            fontWeight: 600,
            letterSpacing: '0.01em',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <GeneratedWithAISvg
            style={{
              width: '20px',
              height: '20px',
              flexShrink: 0,
              color: theme.palette.themePrimary,
            }}
          />
          <span>Generated with AI</span>
        </div>
      </div>
    </TooltipHost>
  );
};

export default GeneratedWithAIBadge;
