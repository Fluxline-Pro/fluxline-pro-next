import React from 'react';

interface DividerProps {
  top?: boolean; // If true, adds extra top margin for spacing when used at the top of a section
  bottom?: boolean; // If true, adds extra bottom margin for spacing when used at the bottom of a section
}

export const Divider: React.FC<DividerProps> = ({ top, bottom }) => {
  return (
    <div
      style={{
        borderTop: '1px solid var(--fx-text-heading)',
        marginTop: top ? 64 : 16,
        marginBottom: bottom ? 64 : 16,
      }}
    />
  );
};

export default Divider;
