'use client';

import React from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useUserPreferencesStore } from '../../../store/store-specs/userPreferencesStore';
import FxSelect from './FxSelect';
import FxSwitch from './FxSwitch';
import FxButton from './FxButton';

interface FxPreferencesDrawerProps {
  open: boolean;
  onClose: () => void;
}

const cardStyle: React.CSSProperties = {
  background: 'var(--fx-surface-card)',
  border: '1px solid var(--fx-border)',
  borderRadius: 12,
  padding: '16px 18px',
};

const groupLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--fx-text-soft)',
  marginBottom: 14,
};

const themeOptions = [
  { value: 'dark', label: 'Dark Mode (default)' },
  { value: 'light', label: 'Light Mode' },
  { value: 'grayscale-dark', label: 'Grayscale — Dark' },
  { value: 'grayscale-light', label: 'Grayscale — Light' },
  { value: 'high-contrast', label: 'High Contrast' },
  { value: 'colorblind', label: 'Colorblind-Safe' },
];

export default function FxPreferencesDrawer({
  open,
  onClose,
}: FxPreferencesDrawerProps) {
  const {
    themeMode,
    fontScale,
    reducedMotion,
    reducedTransparency,
    setThemeMode,
    setFontScale,
    setReducedMotion,
    setReducedTransparency,
  } = useAppTheme();

  const resetPreferences = useUserPreferencesStore((s) => s.resetPreferences);
  const [resetHovered, setResetHovered] = React.useState(false);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(0,0,0,0.4)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.2s',
        }}
      />
      <aside
        role="dialog"
        aria-label="Preferences"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 380,
          zIndex: 1000,
          background: 'var(--fx-bg-deep)',
          borderLeft: '1px solid var(--fx-border)',
          padding: '34px 30px 26px',
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s cubic-bezier(0.2,0,0,1)',
          boxShadow: '-24px 0 60px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: 'var(--fx-text-heading-display)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Preferences
            </h2>
            <p style={{ fontSize: 14, color: 'var(--fx-text-muted)', margin: '6px 0 0' }}>
              Customize your experience to match your needs.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              color: 'var(--fx-error)',
              fontSize: 22,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &#10005;
          </button>
        </div>

        <div
          style={{
            height: 1,
            background: 'var(--fx-border-subtle)',
            margin: '22px 0',
          }}
        />

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={groupLabel}>Appearance</div>

          <div style={{ ...cardStyle, marginBottom: 12 }}>
            <FxSelect
              label="Theme"
              value={themeMode}
              onChange={(e) => setThemeMode(e.target.value as any)}
              options={themeOptions}
            />
          </div>

          <div style={{ ...cardStyle, marginBottom: 24 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12.5,
                fontWeight: 600,
                color: 'var(--fx-text-soft)',
                marginBottom: 10,
                fontFamily: 'var(--fx-font)',
              }}
            >
              Font Size &mdash; {fontScale}%
            </label>
            <input
              type="range"
              min={85}
              max={130}
              step={5}
              value={fontScale}
              onChange={(e) => setFontScale(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--fx-accent)' }}
            />
          </div>

          <div style={groupLabel}>Accessibility</div>

          <div
            style={{
              ...cardStyle,
              marginBottom: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 14, color: 'var(--fx-text-body)' }}>Reduced Motion</span>
            <FxSwitch checked={reducedMotion} onChange={setReducedMotion} />
          </div>

          <div
            style={{
              ...cardStyle,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 14, color: 'var(--fx-text-body)' }}>
              Reduce Transparency
            </span>
            <FxSwitch checked={reducedTransparency} onChange={setReducedTransparency} />
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <button
            type="button"
            onClick={resetPreferences}
            onMouseEnter={() => setResetHovered(true)}
            onMouseLeave={() => setResetHovered(false)}
            style={{
              width: '100%',
              background: 'none',
              border: '1px solid var(--fx-line)',
              color: 'var(--fx-error)',
              fontWeight: 700,
              fontSize: 14,
              padding: 12,
              borderRadius: 8,
              cursor: 'pointer',
              fontFamily: 'var(--fx-font)',
              transition: 'border-color var(--fx-color-duration)',
              borderColor: resetHovered ? 'var(--fx-error)' : undefined,
            }}
          >
            &#8634; Reset to Defaults
          </button>
        </div>
      </aside>
    </>
  );
}
