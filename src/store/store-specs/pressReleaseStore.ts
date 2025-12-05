'use client';

import { create } from 'zustand';
import { PressRelease } from '@/app/press-release/types';

/**
 * Press Release Store State Interface
 * Manages press release content and filtering state
 */
interface PressReleaseState {
  // Data state
  pressReleases: PressRelease[];
  selectedPressRelease: PressRelease | null;
  isLoading: boolean;
  error: string | null;

  // Filter state
  selectedCategory: string | null;
  selectedYear: number | null;

  // Actions
  setPressReleases: (pressReleases: PressRelease[]) => void;
  setSelectedPressRelease: (pressRelease: PressRelease | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedYear: (year: number | null) => void;
  clearFilters: () => void;

  // Computed getters
  getFilteredPressReleases: () => PressRelease[];
  getCategories: () => string[];
  getYears: () => number[];
}

/**
 * Press Release Zustand Store
 * Manages state for press release content, filtering, and selection
 * Follows pattern from contentFilterStore
 */
export const usePressReleaseStore = create<PressReleaseState>((set, get) => ({
  // Initial state
  pressReleases: [],
  selectedPressRelease: null,
  isLoading: false,
  error: null,
  selectedCategory: null,
  selectedYear: null,

  // Actions
  setPressReleases: (pressReleases) => set({ pressReleases, error: null }),

  setSelectedPressRelease: (pressRelease) =>
    set({ selectedPressRelease: pressRelease }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSelectedYear: (year) => set({ selectedYear: year }),

  clearFilters: () => set({ selectedCategory: null, selectedYear: null }),

  // Computed getters
  getFilteredPressReleases: () => {
    const { pressReleases, selectedCategory, selectedYear } = get();
    let filtered = [...pressReleases];

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter((pr) => pr.category === selectedCategory);
    }

    // Filter by year if selected
    if (selectedYear) {
      filtered = filtered.filter(
        (pr) => new Date(pr.publishedDate).getFullYear() === selectedYear
      );
    }

    // Always sort by date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    );
  },

  getCategories: () => {
    const { pressReleases } = get();
    const categories = pressReleases
      .map((pr) => pr.category)
      .filter((cat): cat is string => cat !== undefined);
    return Array.from(new Set(categories)).sort();
  },

  getYears: () => {
    const { pressReleases } = get();
    const years = pressReleases.map((pr) =>
      new Date(pr.publishedDate).getFullYear()
    );
    return Array.from(new Set(years)).sort((a, b) => b - a); // Newest first
  },
}));
