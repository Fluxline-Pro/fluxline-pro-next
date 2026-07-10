'use client';

/**
 * useThemeColor – DSM-native version
 *
 * All colour resolution now happens via CSS custom properties that
 * automatically adapt to the active data-fx-theme.  The functions
 * return DSM token references (var(--fx-…)) so callers can use them
 * in inline styles or CSS-in-JS without needing the Fluent theme object.
 */

export const useThemeColor = () => {
  const getThemedColor = (
    colorType: 'primary' | 'secondary' | 'tertiary' = 'primary'
  ): string => {
    switch (colorType) {
      case 'primary':
        return 'var(--fx-accent)';
      case 'secondary':
        return 'var(--fx-text-muted)';
      case 'tertiary':
        return 'var(--fx-text-faint)';
      default:
        return 'var(--fx-accent)';
    }
  };

  const getThemedBackgroundColor = (): string => {
    return 'var(--fx-accent)';
  };

  const getThemedTextColor = (): string => {
    return 'var(--fx-accent)';
  };

  return {
    getThemedColor,
    getThemedBackgroundColor,
    getThemedTextColor,
  };
};
