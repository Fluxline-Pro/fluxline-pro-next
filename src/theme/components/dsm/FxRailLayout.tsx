'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface FxRailLayoutProps {
  rail: React.ReactNode;
  children: React.ReactNode;
  stickyTop?: number;
  parallax?: boolean;
  style?: React.CSSProperties;
}

function useRailParallax(enabled: boolean) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ y: 60, opacity: 0 });
  const rafRef = useRef<number>(0);
  const isDesktop = useRef(true);

  const update = useCallback(() => {
    const el = sectionRef.current;
    if (!el || !isDesktop.current) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // progress: 0 = section bottom at viewport bottom, 1 = section top at viewport top
    const total = rect.height + vh;
    const scrolled = vh - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    // Map to a reveal curve: fade in from 0→0.3, hold 0.3→0.7, fade out 0.7→1
    let y = 0;
    let opacity = 1;

    if (progress < 0.25) {
      // entering: slide up from +60px, fade in
      const t = progress / 0.25;
      y = 60 * (1 - t);
      opacity = t;
    } else if (progress > 0.8) {
      // exiting: slide up to -40px, fade out
      const t = (progress - 0.8) / 0.2;
      y = -40 * t;
      opacity = 1 - t;
    }

    setTransform({ y, opacity });
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const checkDesktop = () => {
      isDesktop.current =
        window.innerWidth >= 768 &&
        document.documentElement.getAttribute('data-fx-motion') !== 'reduce';
      if (!isDesktop.current) {
        setTransform({ y: 0, opacity: 1 });
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    checkDesktop();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkDesktop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkDesktop);
    };
  }, [enabled, update]);

  return { sectionRef, transform };
}

export default function FxRailLayout({
  rail,
  children,
  stickyTop = 100,
  parallax = false,
  style,
}: FxRailLayoutProps) {
  const { sectionRef, transform } = useRailParallax(parallax);

  const railStyle: React.CSSProperties = parallax
    ? {
        transform: `translateY(${transform.y}px)`,
        opacity: transform.opacity,
        transition: 'none',
        willChange: 'transform, opacity',
      }
    : {};

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .fx-rail-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div
        ref={sectionRef}
        className="fx-rail-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--fx-rail-width) minmax(0,1fr)',
          gap: 'var(--fx-rail-gap)',
          alignItems: 'start',
          ...style,
        }}
      >
        <div style={{ position: 'sticky', top: stickyTop, ...railStyle }}>
          {rail}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {children}
        </div>
      </div>
    </>
  );
}
