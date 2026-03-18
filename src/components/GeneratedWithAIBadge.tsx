'use client';

import React, {
  useState,
  useRef,
  useCallback,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { GeneratedWithAISvg } from '@/assets/svgs/GeneratedWithAISvg';

const TOOLTIP_TEXT =
  'This content was drafted with AI assistance and carefully verified by our team for accuracy. We take full responsibility for what we publish and advocate transparent, responsible AI use.';

/**
 * GeneratedWithAIBadge Component
 * Displays a "Generated with AI" pill badge with a gradient border and a
 * tooltip that appears on hover or keyboard focus (TAB).
 * The tooltip renders via a React portal into document.body to escape any
 * parent overflow/stacking-context constraints.
 */
export const GeneratedWithAIBadge: React.FC = () => {
  const { theme } = useAppTheme();
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const badgeRef = useRef<HTMLDivElement>(null);

  const showTooltip = useCallback(() => {
    if (badgeRef.current) {
      setTooltipRect(badgeRef.current.getBoundingClientRect());
    }
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltipRect(null);
  }, []);

  const isVisible = tooltipRect !== null;

  return (
    <div ref={badgeRef} className='inline-block'>
      {/* Gradient border wrapper — padding trick creates the border */}
      <div
        tabIndex={0}
        role='img'
        aria-label='Generated with AI. This content was drafted with AI assistance and carefully verified by our team for accuracy.'
        aria-describedby={isVisible ? 'ai-badge-tooltip' : undefined}
        className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-full'
        style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
          padding: '1.5px',
          borderRadius: '999px',
          cursor: 'default',
        }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {/* Inner pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            backgroundColor: theme.palette.neutralLighterAlt,
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
            }}
          />
          <span>Generated with AI</span>
        </div>
      </div>

      {/* Portal tooltip — renders into document.body to escape all parent constraints */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isVisible && tooltipRect && (
              <motion.div
                id='ai-badge-tooltip'
                role='tooltip'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  top: tooltipRect.top + tooltipRect.height / 2,
                  left: tooltipRect.right + 8,
                  transform: 'translateY(-50%)',
                  zIndex: 50,
                  width: '256px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  pointerEvents: 'none',
                  backgroundColor: theme.palette.neutralLighter,
                  color: theme.palette.neutralPrimary,
                  border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                }}
              >
                {TOOLTIP_TEXT}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default GeneratedWithAIBadge;
