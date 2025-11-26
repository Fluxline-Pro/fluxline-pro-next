import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

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
 * DSM-compliant typography component that automatically applies theme typography styles.
 * User-provided styles override theme defaults for maximum flexibility.
 */
export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  textAlign,
  style,
  className,
}) => {
  const { theme } = useAppTheme();

  // Get theme typography styles for the variant
  const getThemeStyles = React.useCallback((): React.CSSProperties => {
    const variantMap: Record<string, string> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      p: 'body',
      body: 'body',
      bodySmall: 'bodySmall',
      homeH3: 'homeH3',
      paragraph: 'paragraph',
      span: 'body',
      label: 'label',
      caption: 'bodySmall',
      quote: 'quote',
      blockquote: 'quote',
      pre: 'pre',
      code: 'code',
    };

    const themeKey = variantMap[variant];
    const themeTypography = themeKey
      ? theme.typography.fonts[themeKey as keyof typeof theme.typography.fonts]
      : null;

    if (!themeTypography) {
      return {};
    }

    // Build styles object with only properties that exist in the theme
    const styles: React.CSSProperties = {
      fontFamily: themeTypography.fontFamily,
      fontSize: themeTypography.fontSize,
      fontWeight: themeTypography.fontWeight,
      lineHeight: themeTypography.lineHeight,
    };

    // Add optional properties only if they exist
    if ('letterSpacing' in themeTypography && themeTypography.letterSpacing) {
      styles.letterSpacing = themeTypography.letterSpacing;
    }
    if ('textShadow' in themeTypography && themeTypography.textShadow) {
      styles.textShadow = themeTypography.textShadow;
    }
    if ('textTransform' in themeTypography && themeTypography.textTransform) {
      styles.textTransform = themeTypography.textTransform;
    }

    return styles;
  }, [variant, theme]);

  // Merge theme styles, textAlign prop, and user-provided styles (user styles take precedence)
  const mergedStyles: React.CSSProperties = React.useMemo(() => {
    const themeStyles = getThemeStyles();
    const alignStyles = textAlign ? { textAlign } : {};
    const userStyles = style || {};

    // Remove any undefined, null, or empty string values from user styles
    const cleanedUserStyles = Object.fromEntries(
      Object.entries(userStyles).filter(([key, value]) => {
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
