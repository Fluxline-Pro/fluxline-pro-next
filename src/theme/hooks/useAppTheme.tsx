'use client';

import { useEffect } from 'react';
import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';
import {
  themeMap,
  ThemeMode,
  ReadingDirection,
  LayoutPreference,
  IExtendedTheme,
} from '../theme';
import { useThemeOverride } from '../contexts/ThemeOverrideContext';

export const useAppTheme = () => {
  const { preferences, setPreference, toggleTheme } = useUserPreferencesStore();
  const { overrideThemeMode } = useThemeOverride();

  const themeMode = overrideThemeMode ?? preferences.themeMode;
  const fontScale = preferences.fontScale;
  const theme = themeMap[themeMode] as IExtendedTheme;
  const layoutPreference = preferences.layoutPreference;
  const readingDirection = preferences.readingDirection;
  const reducedMotion = preferences.reducedMotion;
  const reducedTransparency = preferences.reducedTransparency;

  useEffect(() => {
    document.documentElement.setAttribute('data-fx-theme', themeMode);

    // Keep the Safari status/toolbar colour (theme-color meta) in sync with the
    // selected theme's page background so the top/bottom bars are never white.
    const pageBg = getComputedStyle(document.documentElement)
      .getPropertyValue('--fx-bg-page')
      .trim();
    if (pageBg) {
      let meta = document.querySelector<HTMLMetaElement>(
        'meta[name="theme-color"]'
      );
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', pageBg);
    }
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-fx-motion',
      reducedMotion ? 'reduce' : 'full'
    );
  }, [reducedMotion]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-fx-transparency',
      reducedTransparency ? 'reduce' : 'full'
    );
  }, [reducedTransparency]);

  useEffect(() => {
    // Root font-size scales any rem/em typography...
    document.documentElement.style.fontSize = `${fontScale}%`;
    // ...and --fx-font-scale multiplies the px-based DSM type tokens so the
    // slider actually changes text size across the site.
    document.documentElement.style.setProperty(
      '--fx-font-scale',
      String(fontScale / 100)
    );
  }, [fontScale]);

  return {
    theme,
    themeMode,
    fontScale,
    reducedMotion,
    reducedTransparency,
    setThemeMode: (mode: ThemeMode) => setPreference('themeMode', mode),
    toggleTheme,
    readingDirection,
    layoutPreference,
    setReadingDirection: (dir: ReadingDirection) =>
      setPreference('readingDirection', dir),
    setLayoutPreference: (pref: LayoutPreference) =>
      setPreference('layoutPreference', pref),
    setFontScale: (scale: number) => setPreference('fontScale', scale),
    setReducedMotion: (val: boolean) => setPreference('reducedMotion', val),
    setReducedTransparency: (val: boolean) =>
      setPreference('reducedTransparency', val),
    toggleReadingDirection: () =>
      setPreference(
        'readingDirection',
        readingDirection === 'rtl' ? 'ltr' : 'rtl'
      ),
    toggleLayoutPreference: () =>
      setPreference(
        'layoutPreference',
        layoutPreference === 'left-handed' ? 'right-handed' : 'left-handed'
      ),
  };
};
