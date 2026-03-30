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
import { FluentIcon } from '@/theme/components/fluent-icon';
import { Modal } from '@/components/Modal';
import { UnifiedMarkdownRenderer } from '@/utils/markdownRenderer';
import { content as responsibleAIContent } from '@/assets/legal/responsible-ai-usage';
import { Typography } from '@/theme/components/typography';

const TOOLTIP_TEXT =
  'This content was created with AI assistance and reviewed by our team. Click the icon to read our Responsible AI Usage guidelines.';

const RESPONSIBLE_AI_LABEL = 'Read our Responsible AI Usage policy';

/**
 * GeneratedWithAIBadge Component
 * Displays a "Generated with AI" pill badge with a gradient border and a
 * tooltip that appears on hover or keyboard focus (TAB).
 * The tooltip renders via a React portal into document.body to escape any
 * parent overflow/stacking-context constraints.
 * The OpenInNewTab icon opens our Responsible AI Usage page in a modal for transparency and education around our AI practices.
 * This badge is intended to be used on any content that was created with AI assistance, to promote transparency and responsible AI use.
 */
export const GeneratedWithAIBadge: React.FC = () => {
  const { theme } = useAppTheme();
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
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
    <div className='inline-flex items-center gap-2'>
      <div ref={badgeRef} className='inline-block'>
        <div
          tabIndex={0}
          role='img'
          aria-label='Generated with AI. This content was created with AI assistance and reviewed by our team for accuracy.'
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
              fontFamily:
                (theme.fonts.medium.fontFamily as string) || 'inherit',
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
      </div>

      <button
        type='button'
        onClick={() => setIsPolicyOpen(true)}
        aria-label={RESPONSIBLE_AI_LABEL}
        title={RESPONSIBLE_AI_LABEL}
        className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-full'
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '38px',
          height: '38px',
          borderRadius: '999px',
          cursor: 'pointer',
          color: theme.palette.themePrimary,
          backgroundColor: theme.palette.neutralLighterAlt,
          border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
          boxShadow: theme.effects.elevation4,
        }}
      >
        <FluentIcon
          iconName='OpenInNewTab'
          size='small'
          color={theme.palette.themePrimary}
        />
      </button>

      <Modal
        isOpen={isPolicyOpen}
        onDismiss={() => setIsPolicyOpen(false)}
        ariaLabel='Responsible AI Usage Policy'
        maxWidth='860px'
      >
        <Typography
          variant='h3'
          style={{
            color: theme.palette.themePrimary,
            marginBottom: theme.spacing.l,
          }}
        >
          Responsible AI Usage
        </Typography>
        <UnifiedMarkdownRenderer content={responsibleAIContent} />
      </Modal>

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
