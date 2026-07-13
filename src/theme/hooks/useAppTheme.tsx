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
    document.documentElement.style.fontSize = `${fontScale}%`;
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
