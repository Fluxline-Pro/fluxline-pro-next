'use client';

import { useEffect } from 'react';
import { usePressReleaseStore } from '../store/store';
import {
  getPressReleases,
  getPressReleaseById,
  getPressReleasesByCategory,
  getPressReleasesByYear,
} from '../store/mock-data/pressReleaseMock';

/**
 * Custom hook for Press Release API integration
 * Currently uses mock data, prepared for future backend integration
 *
 * Similar pattern to useBlogApi and usePortfolioApi
 */
export const usePressReleaseApi = () => {
  const {
    pressReleases,
    isLoading,
    error,
    setPressReleases,
    setLoading,
    setError,
    setSelectedPressRelease,
  } = usePressReleaseStore();

  /**
   * Fetch all press releases
   * Currently loads from mock data
   * TODO: Replace with actual API call when backend is ready
   */
  const fetchPressReleases = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay for realistic UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get press releases from mock data
      const releases = getPressReleases();
      setPressReleases(releases);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch press releases';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch a single press release by ID
   */
  const fetchPressReleaseById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const pressRelease = getPressReleaseById(id);
      if (pressRelease) {
        setSelectedPressRelease(pressRelease);
      } else {
        setError('Press release not found');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch press release';
      setError(errorMessage);
      console.error('Error fetching press release:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch press releases by category
   */
  const fetchPressReleasesByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const releases = getPressReleasesByCategory(category);
      setPressReleases(releases);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch press releases';
      setError(errorMessage);
      console.error('Error fetching press releases by category:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch press releases by year
   */
  const fetchPressReleasesByYear = async (year: number) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));

      const releases = getPressReleasesByYear(year);
      setPressReleases(releases);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch press releases';
      setError(errorMessage);
      console.error('Error fetching press releases by year:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Auto-fetch press releases on mount
   */
  useEffect(() => {
    fetchPressReleases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return {
    // State
    pressReleases,
    isLoading,
    error,

    // Actions
    fetchPressReleases,
    fetchPressReleaseById,
    fetchPressReleasesByCategory,
    fetchPressReleasesByYear,
  };
};
