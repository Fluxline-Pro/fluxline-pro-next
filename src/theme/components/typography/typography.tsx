import React from 'react';

export interface TypographyProps {
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
  // Merge inline styles with textAlign prop, removing undefined, null, and empty string values
  const mergedStyles: React.CSSProperties = React.useMemo(() => {
    const baseStyles = style || {};
    const alignStyles = textAlign ? { textAlign } : {};

    // Remove any undefined, null, or empty string values from the style object
    const cleanedStyles = Object.fromEntries(
      Object.entries(baseStyles).filter(([key, value]) => {
        // Remove undefined, null, or empty string values
        return value !== undefined && value !== null && value !== '';
      })
    );

    return {
      ...cleanedStyles,
      ...alignStyles,
    };
  }, [style, textAlign]);

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
  // Note: 'quote' variant maps to 'blockquote' HTML element
  const tag =
    variant === 'quote'
      ? 'blockquote'
      : allowedTags.includes(variant)
        ? variant
        : 'p';

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
