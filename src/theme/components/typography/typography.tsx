import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant:
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'pre'
    | 'quote'
    | 'code'
    | 'blockquote'
    | 'label'
    | 'caption'
    | 'span';
  textAlign?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Typography Component
 * 
 * Semantic HTML element wrapper with optional styling.
 * Provides type-safe variant-based rendering without default theme styles.
 */
export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  textAlign,
  style,
  className,
}) => {
  // Merge inline styles with textAlign prop
  const mergedStyles: React.CSSProperties = {
    ...style,
    ...(textAlign ? { textAlign } : {}),
  };

  // List of allowed tags for safety
  const allowedTags = [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'pre',
    'blockquote',
    'code',
    'label',
    'caption',
    'span',
  ];

  // Fallback to 'p' if variant is not allowed
  const tag = allowedTags.includes(variant) ? variant : 'p';

  return React.createElement(
    tag,
    {
      style: mergedStyles,
      className: className,
    },
    children
  );
};

export default Typography;
