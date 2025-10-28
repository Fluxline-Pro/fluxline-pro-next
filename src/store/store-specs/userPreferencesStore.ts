import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ThemeMode } from '../../theme/theme';

export interface UserPreferences {
  backgroundImage: string;
  fontScale: number;
  minFontScale: number;
  maxFontScale: number;
  fontScaleManuallySet: boolean;
  reducedMotion: boolean;
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
  setPreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  toggleTheme: () => void;
  setOnboardingDoneOrSkipped: (doneOrSkipped: boolean) => void;
  setUserFirstName: (firstName: string) => void;
}

// Default preferences - Fluxline Pro defaults to dark mode
const defaultPreferences: UserPreferences = {
  backgroundImage: 'one',
  fontScale: 0.9,
  minFontScale: 0.8,
  maxFontScale: 1.5,
  fontScaleManuallySet: false,
  reducedMotion: false,
  highContrast: false,
  themeMode: 'dark', // Fluxline Pro default: dark mode for focused aesthetic
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
      name: 'fluxline-user-preferences',
    }
  )
);
