'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form/FormButton';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import type { ProgramTier } from '@/app/services/types';

interface ProgramTiersTableProps {
  tiers: ProgramTier[];
  onViewComparison?: () => void;
  showComparisonButton?: boolean;
  subtitle?: string;
}

/**
 * ProgramTiersTable Component
 * Displays pricing tiers in a responsive table format
 */
export const ProgramTiersTable: React.FC<ProgramTiersTableProps> = ({
  tiers,
  onViewComparison,
  showComparisonButton = true,
  subtitle = 'Choose your path based on your archetype assessment and personal goals.',
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  return (
    <div className='space-y-6'>
      <Typography
        variant='h2'
        style={{
          color: theme.palette.themePrimary,
          fontSize: '2rem',
          fontWeight: theme.typography.fontWeights.bold,
          textAlign: 'center',
        }}
      >
        PROGRAM TIERS OFFERED
      </Typography>

      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '1.125rem',
          fontStyle: 'italic',
          textAlign: 'center',
          marginBottom: theme.spacing.l,
        }}
      >
        {subtitle}
      </Typography>

      {/* Pricing Table */}
      <div
        style={{
          overflowX: isMobile || isTablet ? 'auto' : 'visible',
          border: `1px solid ${theme.palette.neutralTertiary}`,
          borderRadius: theme.borderRadius.container.medium,
          backgroundColor: theme.palette.neutralLight,
          overflow: 'hidden',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: isMobile ? '600px' : 'auto',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: isDark
                  ? theme.palette.themeDarkAlt
                  : theme.palette.themePrimary,
              }}
            >
              <th
                style={{
                  padding: isMobile ? '0.75rem' : '1rem 1.5rem',
                  textAlign: 'left',
                  color: theme.palette.white,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                  borderRight: `1px solid ${theme.palette.neutralTertiaryAlt}`,
                }}
              >
                Program Tier
              </th>
              <th
                style={{
                  padding: isMobile ? '0.75rem' : '1rem 1.5rem',
                  textAlign: 'left',
                  color: theme.palette.white,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                  borderRight: `1px solid ${theme.palette.neutralTertiaryAlt}`,
                }}
              >
                Ideal For
              </th>
              <th
                style={{
                  padding: isMobile ? '0.75rem' : '1rem 1.5rem',
                  textAlign: 'left',
                  color: theme.palette.white,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                }}
              >
                Monthly Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, index) => (
              <tr
                key={tier.id}
                style={{
                  borderBottom:
                    index < tiers.length - 1
                      ? `1px solid ${theme.palette.neutralQuaternary}`
                      : 'none',
                }}
              >
                <td
                  style={{
                    padding: isMobile ? '0.75rem' : '1rem 1.5rem',
                    borderRight: `1px solid ${theme.palette.neutralQuaternary}`,
                  }}
                >
                  <Typography
                    variant='p'
                    style={{
                      color: theme.palette.themePrimary,
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      fontWeight: theme.typography.fontWeights.semiBold,
                    }}
                  >
                    {tier.name}
                  </Typography>
                </td>
                <td
                  style={{
                    padding: isMobile ? '0.75rem' : '1rem 1.5rem',
                    borderRight: `1px solid ${theme.palette.neutralQuaternary}`,
                  }}
                >
                  <Typography
                    variant='p'
                    style={{
                      color: theme.palette.neutralSecondary,
                      fontSize: isMobile ? '0.8125rem' : '0.9375rem',
                      lineHeight: theme.typography.lineHeights.relaxed,
                    }}
                  >
                    {tier.idealFor}
                  </Typography>
                </td>
                <td style={{ padding: isMobile ? '0.75rem' : '1rem 1.5rem' }}>
                  <Typography
                    variant='p'
                    style={{
                      color: theme.palette.themePrimary,
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      fontWeight: theme.typography.fontWeights.semiBold,
                    }}
                  >
                    {tier.monthlyRate}
                  </Typography>
                  {tier.rateNote && (
                    <Typography
                      variant='p'
                      style={{
                        color: theme.palette.neutralTertiary,
                        fontSize: isMobile ? '0.75rem' : '0.8125rem',
                        fontStyle: 'italic',
                        display: 'block',
                        marginTop: '0.25rem',
                      }}
                    >
                      {tier.rateNote}
                    </Typography>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparison Button */}
      {showComparisonButton && onViewComparison && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: theme.spacing.l,
          }}
        >
          <FormButton
            text="View Full Comparison - What's Included in Each Tier?"
            variant='secondary'
            size='large'
            onClick={onViewComparison}
          />
        </div>
      )}
    </div>
  );
};
