'use client';

import React from 'react';
import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';
import { BASE_FONT_SIZE } from '../theme';

interface FontScaleProviderProps {
  children: React.ReactNode;
}

/**
 * FontScaleProvider Component
 *
 * Provides global font scaling by adjusting the root element's font size.
 * This approach leverages the CSS rem unit behavior where all rem values
 * are relative to the root element's font size.
 *
 * When the fontScale changes, all rem-based typography automatically scales
 * throughout the entire application without complex theme manipulation.
 */
export const FontScaleProvider: React.FC<FontScaleProviderProps> = ({
  children,
}) => {
  const { preferences } = useUserPreferencesStore();

  React.useEffect(() => {
    // Ensure we have valid numbers
    const baseFontSize =
      typeof BASE_FONT_SIZE === 'number' ? BASE_FONT_SIZE : 16;
    const fontScale =
      typeof preferences.fontScale === 'number' ? preferences.fontScale : 1;

    // Validate the numbers are within reasonable bounds
    if (fontScale < 0.1 || fontScale > 10) {
      console.warn('Font scale is outside reasonable bounds:', fontScale);
      return;
    }

    // Calculate new font size
    const newFontSize = baseFontSize * fontScale;

    // Validate the result
    if (isNaN(newFontSize)) {
      console.error('Font size calculation resulted in NaN:', {
        baseFontSize,
        fontScale,
        preferences,
      });
      return;
    }

    // Apply the font size to the root element
    document.documentElement.style.fontSize = `${newFontSize}px`;

    return () => {
      // Reset font size on unmount
      document.documentElement.style.fontSize = `${baseFontSize}px`;
    };
  }, [preferences.fontScale]);

  return <>{children}</>;
};

export default FontScaleProvider;
