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
}

export default function FxFilterChips({
  options,
  value,
  onChange,
  style,
  maxMobileLines = 3,
}: FxFilterChipsProps) {
  const isMobile = useIsMobile();
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [collapsedHeight, setCollapsedHeight] = React.useState<number | null>(
    null
  );
  const [overflows, setOverflows] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const measure = () => {
      const firstChip = el.firstElementChild as HTMLElement | null;
      if (!firstChip) return;
      const chipHeight = firstChip.offsetHeight;
      const gap = parseFloat(getComputedStyle(el).rowGap || '0') || 0;
      const max = chipHeight * maxMobileLines + gap * (maxMobileLines - 1);
      setCollapsedHeight(max);
      setOverflows(el.scrollHeight > max + 1);
    };

    measure();

    if (typeof window === 'undefined' || !window.ResizeObserver) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [options, maxMobileLines]);

  const collapsed = isMobile && !expanded && overflows;

  return (
    <div style={style}>
      <div
        ref={rowRef}
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          overflow: collapsed ? 'hidden' : 'visible',
          maxHeight: collapsed ? (collapsedHeight ?? undefined) : undefined,
        }}
      >
        {options.map((option) => (
          <FxChip
            key={option}
            kind="filter"
            active={option === value}
            onClick={() => onChange(option)}
          >
            {option}
          </FxChip>
        ))}
      </div>
      {isMobile && overflows && (
        <button
          type="button"
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
