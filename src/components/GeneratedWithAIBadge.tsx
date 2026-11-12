'use client';

import React, {
  useState,
  useRef,
  useCallback,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { GeneratedWithAISvg } from '@/assets/svgs/GeneratedWithAISvg';
import { Modal } from '@/components/Modal';
import { UnifiedMarkdownRenderer } from '@/utils/markdownRenderer';
import { content as responsibleAIContent } from '@/assets/legal/responsible-ai-usage';

const TOOLTIP_TEXT =
  'This content was created with AI assistance and reviewed by our team.\nClick the icon to read our Responsible AI Usage guidelines.';

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
export const GeneratedWithAIBadge: React.FC<{ isHero?: boolean }> = ({
  isHero = false,
}) => {
  const isMobile = useIsMobile();
  const showBelow = isMobile || isHero;
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
              backgroundColor: 'var(--fx-surface-card)',
              borderRadius: '999px',
              color: 'var(--fx-accent)',
              fontSize: '0.875rem',
              fontFamily: 'var(--fx-font)',
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
          color: 'var(--fx-accent)',
          backgroundColor: 'var(--fx-surface-card)',
          border: '1px solid var(--fx-border)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path d='M6 4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0V6.414l-9.293 9.293a1 1 0 0 1-1.414-1.414L13.586 5H7a1 1 0 0 1-1-1z' />
        </svg>
      </button>

      <Modal
        isOpen={isPolicyOpen}
        onDismiss={() => setIsPolicyOpen(false)}
        ariaLabel='Responsible AI Usage Policy'
        maxWidth='860px'
      >
        <h3
          style={{
            color: 'var(--fx-accent)',
            marginBottom: '20px',
            fontSize: 'var(--fx-h3-size)',
            fontWeight: 'var(--fx-h3-weight)' as unknown as number,
            fontFamily: 'var(--fx-font)',
            letterSpacing: 'var(--fx-heading-tracking)',
          }}
        >
          Responsible AI Usage
        </h3>
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
                  top: showBelow
                    ? tooltipRect.bottom + 8
                    : tooltipRect.top + tooltipRect.height / 2,
                  left: showBelow
                    ? tooltipRect.left + tooltipRect.width / 2
                    : tooltipRect.right + 8,
                  transform: showBelow
                    ? 'translateX(-50%)'
                    : 'translateY(-50%)',
                  maxWidth: showBelow ? '90vw' : '256px',
                  zIndex: 50,
                  width: showBelow ? 'max-content' : '256px',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  pointerEvents: 'none',
                  backgroundColor: 'var(--fx-surface-card)',
                  color: 'var(--fx-text-heading)',
                  border: '1px solid var(--fx-border)',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line',
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
