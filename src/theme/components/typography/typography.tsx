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
    | 'span'
    | 'body'
    | 'bodySmall'
    | 'homeH3'
    | 'paragraph';
  textAlign?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Typography Component
 *
 * DSM-compliant typography component using CSS custom properties.
 * User-provided styles override defaults for maximum flexibility.
 */
export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  textAlign,
  style,
  className,
}) => {
  // Map variant to DSM font size vars and weights
  const getThemeStyles = React.useCallback((): React.CSSProperties => {
    const variantStyles: Record<string, React.CSSProperties> = {
      h1: {
        fontFamily: 'var(--fx-font-heading)',
        fontSize: 'var(--fx-h1-size)',
        fontWeight: 800,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: 'var(--fx-font-heading)',
        fontSize: 'var(--fx-h2-size)',
        fontWeight: 700,
        lineHeight: 1.25,
      },
      h3: {
        fontFamily: 'var(--fx-font-heading)',
        fontSize: 'var(--fx-h3-size)',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: 'var(--fx-font-heading)',
        fontSize: 'var(--fx-subhead-size)',
        fontWeight: 600,
        lineHeight: 1.35,
      },
      h5: {
        fontFamily: 'var(--fx-font-heading)',
        fontSize: '13px',
        fontWeight: 700,
        lineHeight: 1.4,
      },
      h6: {
        fontFamily: 'var(--fx-font-heading)',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body: {
        fontFamily: 'var(--fx-font-body)',
        fontSize: 'var(--fx-body-size)',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      bodySmall: {
        fontFamily: 'var(--fx-font-body)',
        fontSize: 'var(--fx-body-sm-size)',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      homeH3: {
        fontFamily: 'var(--fx-font-heading)',
        fontSize: 'var(--fx-h3-size)',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      paragraph: {
        fontFamily: 'var(--fx-font-body)',
        fontSize: 'var(--fx-body-size)',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      label: {
        fontFamily: 'var(--fx-font-body)',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      caption: {
        fontFamily: 'var(--fx-font-body)',
        fontSize: 'var(--fx-body-sm-size)',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      quote: {
        fontFamily: 'var(--fx-font-body)',
        fontSize: 'var(--fx-body-size)',
        fontWeight: 400,
        fontStyle: 'italic',
        lineHeight: 1.6,
      },
      pre: {
        fontFamily: 'var(--fx-font-mono, monospace)',
        fontSize: 'var(--fx-body-sm-size)',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      code: {
        fontFamily: 'var(--fx-font-mono, monospace)',
        fontSize: 'var(--fx-body-sm-size)',
        fontWeight: 400,
        lineHeight: 1.5,
      },
    };

    // Map variant aliases
    const aliasMap: Record<string, string> = {
      p: 'body',
      span: 'body',
      blockquote: 'quote',
    };

    const resolvedVariant = aliasMap[variant] || variant;
    return variantStyles[resolvedVariant] || {};
  }, [variant]);

  // Merge theme styles, textAlign prop, and user-provided styles (user styles take precedence)
  const mergedStyles: React.CSSProperties = React.useMemo(() => {
    const themeStyles = getThemeStyles();
    const alignStyles = textAlign ? { textAlign } : {};
    const userStyles = style || {};

    // Remove any undefined, null, or empty string values from user styles
    const cleanedUserStyles = Object.fromEntries(
      Object.entries(userStyles).filter(([, value]) => {
        return value !== undefined && value !== null && value !== '';
      })
    );

    return {
      ...themeStyles,
      ...alignStyles,
      ...cleanedUserStyles,
    };
  }, [getThemeStyles, style, textAlign]);

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
