import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FxUserMenu from './FxUserMenu';

jest.mock('@/lib/auth', () => ({
  useAuth: jest.fn(),
  getInitials: jest.fn(),
}));

jest.mock('@/lib/environment', () => ({
  isProduction: jest.fn(),
}));

jest.mock('@/lib/integrations/config', () => ({
  getAccountPortalUrl: jest.fn(),
}));

const mockUseAuth = jest.requireMock('@/lib/auth')
  .useAuth as jest.MockedFunction<typeof import('@/lib/auth').useAuth>;
const mockGetInitials = jest.requireMock('@/lib/auth')
  .getInitials as jest.MockedFunction<typeof import('@/lib/auth').getInitials>;
const mockIsProduction = jest.requireMock('@/lib/environment')
  .isProduction as jest.MockedFunction<
  typeof import('@/lib/environment').isProduction
>;
const mockGetAccountPortalUrl = jest.requireMock('@/lib/integrations/config')
  .getAccountPortalUrl as jest.MockedFunction<
  typeof import('@/lib/integrations/config').getAccountPortalUrl
>;
const ACCOUNT_PORTAL_URL = 'https://account.fluxline.pro';

describe('FxUserMenu', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      getAccessToken: jest.fn().mockResolvedValue(null),
    });
    mockGetInitials.mockReturnValue('TU');
    mockIsProduction.mockReturnValue(false);
    mockGetAccountPortalUrl.mockReturnValue(ACCOUNT_PORTAL_URL);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign-in button when not in production', () => {
    render(<FxUserMenu />);

    expect(
      screen.getByRole('link', { name: 'Sign in to your Fluxline account' })
    ).toHaveAttribute('href', `${ACCOUNT_PORTAL_URL}/login`);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('hides the signed-out sign-in button in production', () => {
    mockIsProduction.mockReturnValue(true);

    render(<FxUserMenu />);

    expect(
      screen.queryByRole('link', { name: 'Sign in to your Fluxline account' })
    ).not.toBeInTheDocument();
  });

  it('hides the signed-out sign-in button in production', () => {
    mockIsProduction.mockReturnValue(true);

    render(<FxUserMenu />);

    expect(
      screen.queryByRole('link', { name: 'Sign in to your Fluxline account' })
    ).not.toBeInTheDocument();
  });

  it('still renders the authenticated account menu in production', () => {
    mockIsProduction.mockReturnValue(true);
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        userId: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
      },
      login: jest.fn(),
      logout: jest.fn(),
      getAccessToken: jest.fn().mockResolvedValue(null),
    });

    render(<FxUserMenu />);

    expect(
      screen.getByRole('button', { name: 'Account menu for Test User' })
    ).toHaveTextContent('TU');
  });
});
