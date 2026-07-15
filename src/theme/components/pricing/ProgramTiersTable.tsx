'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form/FormButton';
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
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isTabletHook = useIsTablet();
  const isMobile = isMounted ? isMobileHook : false;
  const isTablet = isMounted ? isTabletHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const cellPad = isMobile ? '0.6rem 0.7rem' : '0.7rem 1.15rem';

  return (
    <div className='space-y-6'>
      <Typography
        variant='h2'
        style={{
          color: 'var(--fx-accent)',
          fontSize: '2rem',
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        PROGRAM TIERS OFFERED
      </Typography>

      <Typography
        variant='p'
        style={{
          color: 'var(--fx-text-muted)',
          fontSize: '1.125rem',
          fontStyle: 'italic',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        {subtitle}
      </Typography>

      {/* Pricing Table */}
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          border: '1px solid var(--fx-text-faint)',
          borderRadius: 'var(--fx-radius-card)',
          backgroundColor: 'var(--fx-border)',
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
                backgroundColor: 'var(--fx-surface-alt)',
              }}
            >
              <th
                style={{
                  padding: cellPad,
                  textAlign: 'left',
                  color: 'var(--fx-text-bright)',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  fontWeight: 600,
                  borderRight: '1px solid var(--fx-border)',
                }}
              >
                Program Tier
              </th>
              <th
                style={{
                  padding: cellPad,
                  textAlign: 'left',
                  color: 'var(--fx-text-bright)',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  fontWeight: 600,
                  borderRight: '1px solid var(--fx-border)',
                }}
              >
                Ideal For
              </th>
              <th
                style={{
                  padding: cellPad,
                  textAlign: 'left',
                  color: 'var(--fx-text-bright)',
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  fontWeight: 600,
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
                      ? '1px solid var(--fx-border)'
                      : 'none',
                }}
              >
                <td
                  style={{
                    padding: cellPad,
                    borderRight: '1px solid var(--fx-border)',
                  }}
                >
                  <Typography
                    variant='p'
                    style={{
                      color: 'var(--fx-accent)',
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {tier.name}
                  </Typography>
                </td>
                <td
                  style={{
                    padding: cellPad,
                    borderRight: '1px solid var(--fx-border)',
                  }}
                >
                  <Typography
                    variant='p'
                    style={{
                      color: 'var(--fx-text-muted)',
                      fontSize: isMobile ? '0.8125rem' : '0.9375rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {tier.idealFor}
                  </Typography>
                </td>
                <td style={{ padding: isMobile ? '0.75rem' : '1rem 1.5rem' }}>
                  <Typography
                    variant='p'
                    style={{
                      color: 'var(--fx-accent)',
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {tier.monthlyRate}
                  </Typography>
                  {tier.rateNote && (
                    <Typography
                      variant='p'
                      style={{
                        color: 'var(--fx-text-faint)',
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
            marginTop: '20px',
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
