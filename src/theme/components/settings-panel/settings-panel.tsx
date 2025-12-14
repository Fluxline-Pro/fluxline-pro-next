'use client';

/**
 * SettingsPanel Component
 * Comprehensive settings panel for user preferences
 */

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useUserPreferencesStore } from '@/store';
import type { ThemeMode } from '@/theme/theme';
import {
  FormSelect,
  FormToggle,
  FormSlider,
  FormButton,
} from '@/theme/components/form';
import styles from './settings-panel.module.scss';

interface SettingsPanelProps {
  onClose?: () => void;
}

/**
 * SettingsPanel Component
 */
export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const {
    theme,
    themeMode,
    setThemeMode,
    layoutPreference,
    fontScale,
    setFontScale,
  } = useAppTheme();
  const { preferences, setPreference, resetPreferences } =
    useUserPreferencesStore();

  const handleThemeChange = (newTheme: string) => {
    setThemeMode(newTheme as ThemeMode);
  };

  const handleLayoutChange = (newLayout: string) => {
    setPreference(
      'layoutPreference',
      newLayout as 'left-handed' | 'right-handed'
    );
  };

  const handleFontScaleChange = (newScale: number) => {
    setFontScale(newScale);
  };

  const handleReducedMotionChange = (enabled: boolean) => {
    setPreference('reducedMotion', enabled);
  };

  const handleHighContrastChange = (enabled: boolean) => {
    if (enabled) {
      setThemeMode('high-contrast');
    } else {
      // Switch back to dark mode when high contrast is disabled
      setThemeMode('dark');
    }
    setPreference('highContrast', enabled);
  };

  const handleResetSettings = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all settings to defaults? This cannot be undone.'
      )
    ) {
      resetPreferences();
    }
  };

  const themeOptions = [
    { key: 'dark', text: 'Dark Mode' },
    { key: 'light', text: 'Light Mode' },
    { key: 'high-contrast', text: 'High Contrast' },
    { key: 'grayscale', text: 'Grayscale Light' },
    { key: 'grayscale-dark', text: 'Grayscale Dark' },
    { key: 'protanopia', text: 'Protanopia (Red-blind)' },
    { key: 'deuteranopia', text: 'Deuteranopia (Green-blind)' },
    { key: 'tritanopia', text: 'Tritanopia (Blue-blind)' },
  ];

  const layoutOptions = [
    { key: 'right-handed', text: 'Right-handed (Default)' },
    { key: 'left-handed', text: 'Left-handed' },
  ];

  return (
    <div className={styles.settingsPanel}>
      {/* Header */}
      <div
        className={styles.settingsHeader}
        style={{
          borderBottom: `1px solid ${theme.palette.neutralQuaternary}`,
        }}
      >
        <Typography
          variant='h2'
          style={{
            color: theme.palette.themePrimary,
            fontSize: `clamp(${1.5 * fontScale}rem, 3vw, ${2 * fontScale}rem)`,
            fontWeight: theme.typography.fontWeights.bold,
            marginBottom: '0.5rem',
          }}
        >
          Settings
        </Typography>
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: `${0.875 * fontScale}rem`,
            lineHeight: theme.typography.lineHeights.normal,
          }}
        >
          Customize your experience to match your preferences
        </Typography>
      </div>

      {/* Settings Content */}
      <div className={styles.settingsContent}>
        <div className={styles.spaceY6}>
          {/* Appearance Section */}
          <div className={styles.spaceY3}>
            <Typography
              variant='h3'
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: `${1.125 * fontScale}rem`,
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.75rem',
              }}
            >
              Appearance
            </Typography>

            <FormSelect
              label='Theme'
              description='Choose between dark and light mode'
              icon='Color'
              value={themeMode}
              options={themeOptions}
              onChange={handleThemeChange}
            />

            <FormSlider
              label='Font Size'
              description='Adjust text size for better readability'
              icon='FontSize'
              value={fontScale}
              min={0.8}
              max={1.5}
              step={0.05}
              onChange={handleFontScaleChange}
              formatValue={(val) => `${Math.round(val * 100)}%`}
            />

            <FormToggle
              label='High Contrast'
              description='Increase contrast for better visibility'
              icon='Contrast'
              checked={themeMode === 'high-contrast'}
              onChange={handleHighContrastChange}
            />
          </div>

          {/* Layout Section */}
          <div className={styles.spaceY3}>
            <Typography
              variant='h3'
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: `${1.125 * fontScale}rem`,
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.75rem',
              }}
            >
              Layout
            </Typography>

            <FormSelect
              label='Layout Preference'
              description='Choose navigation position based on your dominant hand'
              icon='SidePanel'
              value={layoutPreference}
              options={layoutOptions}
              onChange={handleLayoutChange}
            />
          </div>

          {/* Accessibility Section */}
          <div className={styles.spaceY3}>
            <Typography
              variant='h3'
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: `${1.125 * fontScale}rem`,
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.75rem',
              }}
            >
              Accessibility
            </Typography>

            <FormToggle
              label='Reduced Motion'
              description='Minimize animations and transitions'
              icon='Motion'
              checked={preferences.reducedMotion}
              onChange={handleReducedMotionChange}
            />
          </div>
        </div>
      </div>

      {/* Footer with Reset Button */}
      <div
        className={styles.settingsFooter}
        style={{
          borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
        }}
      >
        <FormButton
          variant='danger'
          icon='RevToggleKey'
          fullWidth
          onClick={handleResetSettings}
        >
          Reset to Defaults
        </FormButton>
      </div>
    </div>
  );
};

export default SettingsPanel;
