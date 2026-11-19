'use client';

import React from 'react';
import FxChip from './FxChip';
import { useIsMobile } from '../../hooks/useMediaQuery';

interface FxFilterChipsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  /** Rows shown before truncating on mobile; the toggle link appears only if content actually overflows this. */
  maxMobileLines?: number;
  /**
   * Rows shown before truncating on wider screens (owner, 2026-11-19: the
   * portfolio's tags ran to about 8 lines). Same "Show all" toggle.
   */
  maxLines?: number;
}

export default function FxFilterChips({
  options,
  value,
  onChange,
  style,
  maxMobileLines = 3,
  maxLines = 2,
}: FxFilterChipsProps) {
  const isMobile = useIsMobile();
  const lines = isMobile ? maxMobileLines : maxLines;
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [collapsedHeight, setCollapsedHeight] = React.useState<number | null>(
    null
  );
  const [overflows, setOverflows] = React.useState(false);
  // The selected chip sits in a clipped row: stay open so it's visible.
  const [activeHidden, setActiveHidden] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const measure = () => {
      const firstChip = el.firstElementChild as HTMLElement | null;
      if (!firstChip) return;
      const chipHeight = firstChip.offsetHeight;
      const gap = parseFloat(getComputedStyle(el).rowGap || '0') || 0;
      const max = chipHeight * lines + gap * (lines - 1);
      setCollapsedHeight(max);
      setOverflows(el.scrollHeight > max + 1);
      const active = el.children[options.indexOf(value)] as
        | HTMLElement
        | undefined;
      setActiveHidden(
        !!active &&
          active.getBoundingClientRect().top - el.getBoundingClientRect().top >=
            max - 1
      );
    };

    measure();

    if (typeof window === 'undefined' || !window.ResizeObserver) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [options, lines, value]);

  // Clamped from the first render (server HTML included), so the rows don't
  // collapse after load and shift the page; measuring then decides whether
  // the toggle is needed. Until measured, an estimate of the chip height.
  const measured = collapsedHeight !== null;
  const collapsed = !expanded && !activeHidden && (overflows || !measured);
  const clampHeight =
    collapsedHeight ?? `calc(${lines} * 2.25rem + ${(lines - 1) * 8}px)`;

  // Keyboard focus on a clipped chip opens the list, so focus is never on
  // something you can't see (WCAG 2.4.11).
  const onRowFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!collapsed || collapsedHeight === null) return;
    const row = event.currentTarget.getBoundingClientRect().top;
    const top = (event.target as HTMLElement).getBoundingClientRect().top;
    if (top - row >= collapsedHeight - 1) setExpanded(true);
  };

  return (
    <div style={style}>
      <div
        ref={rowRef}
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          overflow: collapsed ? 'hidden' : 'visible',
          maxHeight: collapsed ? clampHeight : undefined,
        }}
        onFocus={onRowFocus}
      >
        {options.map((option) => (
          <FxChip
            key={option}
            kind='filter'
            active={option === value}
            onClick={() => onChange(option)}
          >
            {option}
          </FxChip>
        ))}
      </div>
      {overflows && !activeHidden && (
        <button
          type='button'
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          style={{
            marginTop: 8,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--fx-accent)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          {expanded ? 'Hide all' : 'Show all'}
        </button>
      )}
    </div>
  );
}
