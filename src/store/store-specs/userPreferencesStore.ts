import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ThemeMode, migrateLegacyThemeMode } from '../../theme/theme';

export interface UserPreferences {
  backgroundImage: string;
  fontScale: number;
  minFontScale: number;
  maxFontScale: number;
  fontScaleManuallySet: boolean;
  reducedMotion: boolean;
  reducedTransparency: boolean;
  highContrast: boolean;
  themeMode: ThemeMode;
  isOnboarded: boolean;
  layoutPreference: 'left-handed' | 'right-handed';
  readingDirection: 'ltr' | 'rtl';
  onboardingDoneOrSkipped: boolean;
  userFirstName: string;
  isAuthenticated: boolean;
}

export interface UserPreferencesState {
  preferences: UserPreferences;
  setBackgroundImage: (image: string) => void;
  resetPreferences: () => void;
  setPreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  toggleTheme: () => void;
  setOnboardingDoneOrSkipped: (doneOrSkipped: boolean) => void;
  setUserFirstName: (firstName: string) => void;
}

// Default preferences - Fluxline Pro defaults to dark mode
const defaultPreferences: UserPreferences = {
  backgroundImage: 'one',
  fontScale: 100,
  minFontScale: 85,
  maxFontScale: 130,
  fontScaleManuallySet: false,
  reducedMotion: false,
  reducedTransparency: false,
  highContrast: false,
  themeMode: 'dark',
  isOnboarded: true,
  layoutPreference: 'right-handed',
  readingDirection: 'ltr',
  onboardingDoneOrSkipped: true,
  userFirstName: '',
  isAuthenticated: false,
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      resetPreferences: () =>
        set({
          preferences: {
            ...defaultPreferences,
            onboardingDoneOrSkipped: true,
          },
        }),
      setPreference: (key, value) => {
        set((state) => {
          // If user is specifically setting fontScale, mark it as manually set
          if (key === 'fontScale') {
            return {
              preferences: {
                ...state.preferences,
                [key]: value,
                fontScaleManuallySet: true,
              },
            };
          }

          // For other preferences, just update normally
          return {
            preferences: { ...state.preferences, [key]: value },
          };
        });
      },
      setBackgroundImage: (image) => {
        set((state) => ({
          preferences: { ...state.preferences, backgroundImage: image },
        }));
      },
      toggleTheme: () => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            themeMode:
              state.preferences.themeMode === 'light' ? 'dark' : 'light',
          },
        }));
      },
      setOnboardingDoneOrSkipped: (doneOrSkipped: boolean) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            onboardingDoneOrSkipped: doneOrSkipped,
          },
        }));
      },
      setUserFirstName: (firstName: string) => {
        set((state) => ({
          preferences: { ...state.preferences, userFirstName: firstName },
        }));
      },
    }),
    {
      name: 'fluxline.preferences',
      skipHydration: typeof window === 'undefined',
      version: 1,
      migrate: (persisted: unknown, version: number) => {
        const state = persisted as UserPreferencesState;
        if (version === 0 || !version) {
          const prefs = state?.preferences ?? defaultPreferences;
          return {
            ...state,
            preferences: {
              ...prefs,
              themeMode: migrateLegacyThemeMode(prefs.themeMode),
              fontScale: prefs.fontScale < 10 ? Math.round(prefs.fontScale * 100) : prefs.fontScale,
              minFontScale: 85,
              maxFontScale: 130,
            },
          };
        }
        return state;
      },
    }
  )
);
