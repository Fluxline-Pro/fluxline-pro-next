'use client';

import React from 'react';
import FxChip from './FxChip';

interface FxFilterChipsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

export default function FxFilterChips({
  options,
  value,
  onChange,
  style,
}: FxFilterChipsProps) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', ...style }}>
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
  );
}
