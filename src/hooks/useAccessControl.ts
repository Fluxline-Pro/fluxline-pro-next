'use client';

/**
 * Access Control Hook
 * 
 * Manages token-based access control for DEV and TEST environments.
 * Uses browser localStorage to persist the access token.
 */

import { useState, useEffect } from 'react';
import { getEnvironment, requiresAuthentication, getApiBaseUrl } from '@/lib/environment';

const STORAGE_KEY = 'fluxline_access_token';

interface ValidationResponse {
  valid: boolean;
  environment?: string;
  message?: string;
  error?: string;
}

export function useAccessControl() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const environment = getEnvironment();
  const authRequired = requiresAuthentication();

  // Check for stored token on mount
  useEffect(() => {
    if (!authRequired) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (storedToken) {
      validateToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, [authRequired]);

  /**
   * Validates a token against the server
   */
  const validateToken = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    setError('');

    try {
      const apiUrl = `${getApiBaseUrl()}/auth/validate-token`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data: ValidationResponse = await response.json();

      if (data.valid) {
        localStorage.setItem(STORAGE_KEY, token);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        setError(data.error || 'Invalid token');
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.error('Token validation error:', err);
      setError('Failed to validate token. Please check your connection.');
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
  };

  /**
   * Submits a token for validation
   */
  const submitToken = async (token: string): Promise<boolean> => {
    return validateToken(token);
  };

  /**
   * Clears the stored token and logs out
   */
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setError('');
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    environment,
    authRequired,
    submitToken,
    logout,
  };
}
