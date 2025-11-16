'use client';

/**
 * SettingsPanel Component
 * Comprehensive settings panel for user preferences
 */

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useUserPreferencesStore } from '@/store';
import type { ThemeMode } from '@/theme/theme';

interface SettingsPanelProps {
  onClose?: () => void;
}

/**
 * SettingToggle Component
 * Reusable toggle switch for boolean settings
 */
const SettingToggle: React.FC<{
  label: string;
  description?: string;
  icon: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, description, icon, checked, onChange }) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem',
        borderRadius: theme.borderRadius.container.small,
        backgroundColor: theme.palette.neutralLighterAlt,
        border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
      }}
    >
      <FluentIcon
        iconName={icon}
        size="medium"
        color={theme.palette.themePrimary}
      />
      <div style={{ flex: 1 }}>
        <Typography
          variant="p"
          style={{
            color: theme.palette.neutralPrimary,
            fontSize: '1rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            marginBottom: description ? '0.25rem' : 0,
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="p"
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '0.875rem',
              lineHeight: theme.typography.lineHeights.normal,
            }}
          >
            {description}
          </Typography>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: '48px',
          height: '28px',
          borderRadius: '14px',
          backgroundColor: checked
            ? theme.palette.themePrimary
            : theme.palette.neutralQuaternary,
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          flexShrink: 0,
        }}
        aria-label={`Toggle ${label}`}
        role="switch"
        aria-checked={checked}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: theme.palette.white,
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            transition: 'left 0.2s ease',
            boxShadow: theme.shadows.s,
          }}
        />
      </button>
    </div>
  );
};

/**
 * SettingSelect Component
 * Dropdown selector for settings with multiple options
 */
const SettingSelect: React.FC<{
  label: string;
  description?: string;
  icon: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}> = ({ label, description, icon, value, options, onChange }) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem',
        borderRadius: theme.borderRadius.container.small,
        backgroundColor: theme.palette.neutralLighterAlt,
        border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
      }}
    >
      <FluentIcon
        iconName={icon}
        size="medium"
        color={theme.palette.themePrimary}
      />
      <div style={{ flex: 1 }}>
        <Typography
          variant="p"
          style={{
            color: theme.palette.neutralPrimary,
            fontSize: '1rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            marginBottom: description ? '0.25rem' : '0.5rem',
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="p"
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '0.875rem',
              lineHeight: theme.typography.lineHeights.normal,
              marginBottom: '0.5rem',
            }}
          >
            {description}
          </Typography>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: theme.borderRadius.container.small,
            backgroundColor: theme.palette.white,
            border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
            color: theme.palette.neutralPrimary,
            fontSize: '0.875rem',
            cursor: 'pointer',
            fontFamily: theme.typography.fonts.body.fontFamily,
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

/**
 * SettingSlider Component
 * Slider for numeric settings
 */
const SettingSlider: React.FC<{
  label: string;
  description?: string;
  icon: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}> = ({
  label,
  description,
  icon,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
}) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem',
        borderRadius: theme.borderRadius.container.small,
        backgroundColor: theme.palette.neutralLighterAlt,
        border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
      }}
    >
      <FluentIcon
        iconName={icon}
        size="medium"
        color={theme.palette.themePrimary}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: description ? '0.25rem' : '0.5rem',
          }}
        >
          <Typography
            variant="p"
            style={{
              color: theme.palette.neutralPrimary,
              fontSize: '1rem',
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="p"
            style={{
              color: theme.palette.themePrimary,
              fontSize: '0.875rem',
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            {formatValue ? formatValue(value) : value}
          </Typography>
        </div>
        {description && (
          <Typography
            variant="p"
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '0.875rem',
              lineHeight: theme.typography.lineHeights.normal,
              marginBottom: '0.5rem',
            }}
          >
            {description}
          </Typography>
        )}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{
            width: '100%',
            height: '4px',
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer',
          }}
          aria-label={label}
        />
      </div>
    </div>
  );
};

/**
 * SettingsPanel Component
 */
export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { theme, themeMode, setThemeMode, layoutPreference } = useAppTheme();
  const { preferences, setPreference, resetPreferences } =
    useUserPreferencesStore();

  const handleThemeChange = (newTheme: string) => {
    setThemeMode(newTheme as ThemeMode);
  };

  const handleLayoutChange = (newLayout: string) => {
    setPreference('layoutPreference', newLayout as 'left-handed' | 'right-handed');
  };

  const handleFontScaleChange = (newScale: number) => {
    setPreference('fontScale', newScale);
  };

  const handleReducedMotionChange = (enabled: boolean) => {
    setPreference('reducedMotion', enabled);
  };

  const handleHighContrastChange = (enabled: boolean) => {
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
    { value: 'dark', label: 'Dark Mode' },
    { value: 'light', label: 'Light Mode' },
  ];

  const layoutOptions = [
    { value: 'right-handed', label: 'Right-handed (Default)' },
    { value: 'left-handed', label: 'Left-handed' },
  ];

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '5rem 2rem 1.5rem 2rem',
          borderBottom: `1px solid ${theme.palette.neutralQuaternary}`,
        }}
      >
        <Typography
          variant="h2"
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: theme.typography.fontWeights.bold,
            marginBottom: '0.5rem',
          }}
        >
          Settings
        </Typography>
        <Typography
          variant="p"
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '0.875rem',
            lineHeight: theme.typography.lineHeights.normal,
          }}
        >
          Customize your experience to match your preferences
        </Typography>
      </div>

      {/* Settings Content */}
      <div
        style={{
          padding: '2rem',
          flex: 1,
        }}
      >
        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="space-y-3">
            <Typography
              variant="h3"
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: '1.125rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.75rem',
              }}
            >
              Appearance
            </Typography>

            <SettingSelect
              label="Theme"
              description="Choose between dark and light mode"
              icon="Color"
              value={themeMode}
              options={themeOptions}
              onChange={handleThemeChange}
            />

            <SettingSlider
              label="Font Size"
              description="Adjust text size for better readability"
              icon="FontSize"
              value={preferences.fontScale}
              min={0.8}
              max={1.5}
              step={0.05}
              onChange={handleFontScaleChange}
              formatValue={(val) => `${Math.round(val * 100)}%`}
            />

            <SettingToggle
              label="High Contrast"
              description="Increase contrast for better visibility"
              icon="Contrast"
              checked={preferences.highContrast}
              onChange={handleHighContrastChange}
            />
          </div>

          {/* Layout Section */}
          <div className="space-y-3">
            <Typography
              variant="h3"
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: '1.125rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.75rem',
              }}
            >
              Layout
            </Typography>

            <SettingSelect
              label="Layout Preference"
              description="Choose navigation position based on your dominant hand"
              icon="SidePanel"
              value={layoutPreference}
              options={layoutOptions}
              onChange={handleLayoutChange}
            />
          </div>

          {/* Accessibility Section */}
          <div className="space-y-3">
            <Typography
              variant="h3"
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: '1.125rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.75rem',
              }}
            >
              Accessibility
            </Typography>

            <SettingToggle
              label="Reduced Motion"
              description="Minimize animations and transitions"
              icon="Motion"
              checked={preferences.reducedMotion}
              onChange={handleReducedMotionChange}
            />
          </div>
        </div>
      </div>

      {/* Footer with Reset Button */}
      <div
        style={{
          padding: '1.5rem 2rem',
          borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
        }}
      >
        <button
          onClick={handleResetSettings}
          style={{
            width: '100%',
            padding: '0.75rem 1.5rem',
            borderRadius: theme.borderRadius.container.small,
            backgroundColor: 'transparent',
            color: theme.semanticColors.errorIcon,
            border: `1px solid ${theme.semanticColors.errorIcon}`,
            fontSize: '1rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.semanticColors.errorBackground;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <FluentIcon
            iconName="Reset"
            size="small"
            color={theme.semanticColors.errorIcon}
          />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
