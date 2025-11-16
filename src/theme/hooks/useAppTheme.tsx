'use client';

import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';
import {
  themeMap,
  ThemeMode,
  ReadingDirection,
  LayoutPreference,
  IExtendedTheme,
} from '../theme';

export const useAppTheme = () => {
  const { preferences, setPreference, toggleTheme } = useUserPreferencesStore();
  const themeMode = preferences.themeMode;
  const fontScale = preferences.fontScale;
  const theme = themeMap[themeMode] as IExtendedTheme;
  const layoutPreference = preferences.layoutPreference;
  const readingDirection = preferences.readingDirection;

  return {
    theme,
    themeMode,
    fontScale,
    setThemeMode: (mode: ThemeMode) => setPreference('themeMode', mode),
    toggleTheme,
    readingDirection,
    layoutPreference,
    setReadingDirection: (dir: ReadingDirection) =>
      setPreference('readingDirection', dir),
    setLayoutPreference: (pref: LayoutPreference) =>
      setPreference('layoutPreference', pref),
    setFontScale: (scale: number) => setPreference('fontScale', scale),
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
