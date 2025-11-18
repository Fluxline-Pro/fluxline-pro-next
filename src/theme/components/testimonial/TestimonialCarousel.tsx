'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

interface TestimonialCarouselProps {
  children: React.ReactNode[];
  onItemClick?: (index: number) => void;
}

/**
 * TestimonialCarousel Component
 * Horizontally scrollable carousel with navigation arrows
 * Shows 3 cards on desktop, 2 on tablet, 1 on mobile
 * Touch/swipe support with smooth scrolling
 */
export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  children,
  onItemClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { theme } = useAppTheme();

  // Check scroll position
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  // Scroll by viewport width
  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children.length]);

  const buttonStyles = {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    background: theme.palette.white,
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    border: `2px solid ${theme.palette.neutralLight}`,
    cursor: 'pointer',
    boxShadow: theme.effects.elevation8,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy('left')}
          aria-label="Scroll left"
          style={{ ...buttonStyles, left: '8px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.palette.neutralLighter;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.palette.white;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <Icon
            iconName="ChevronLeft"
            styles={{
              root: {
                fontSize: '20px',
                color: theme.palette.themePrimary,
              },
            }}
          />
        </button>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: theme.spacing.m,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '1rem 2rem',
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            onClick={() => onItemClick?.(index)}
            style={{
              minWidth: 'clamp(280px, 33.333%, 400px)',
              scrollSnapAlign: 'start',
              cursor: onItemClick ? 'pointer' : 'default',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (onItemClick) {
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              if (onItemClick) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollBy('right')}
          aria-label="Scroll right"
          style={{ ...buttonStyles, right: '8px' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.palette.neutralLighter;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.palette.white;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <Icon
            iconName="ChevronRight"
            styles={{
              root: {
                fontSize: '20px',
                color: theme.palette.themePrimary,
              },
            }}
          />
        </button>
      )}

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
