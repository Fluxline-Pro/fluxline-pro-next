'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form/FormButton';
import type { ProgramTier } from '@/app/services/types';

interface ProgramTiersTableProps {
  tiers: ProgramTier[];
  onViewComparison?: () => void;
  showComparisonButton?: boolean;
  subtitle?: string;
  firstColumnWidth?: string;
}

const headerCell: React.CSSProperties = {
  padding: 'var(--fx-space-s) var(--fx-space-m)',
  textAlign: 'left',
  color: 'var(--fx-text-bright)',
  fontSize: 'var(--fx-body-size)',
  fontWeight: 600,
};

const bodyCell: React.CSSProperties = {
  padding: 'var(--fx-space-s) var(--fx-space-m)',
  verticalAlign: 'top',
};

const tierName: React.CSSProperties = {
  color: 'var(--fx-accent)',
  fontSize: 'var(--fx-body-size)',
  fontWeight: 600,
  margin: 0,
};

/** A price stays on one line; the note (if any) sits under it. */
const price: React.CSSProperties = {
  color: 'var(--fx-accent)',
  fontSize: 'var(--fx-body-size)',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  margin: 0,
};

const rateNote: React.CSSProperties = {
  color: 'var(--fx-text-faint)',
  fontSize: 'var(--fx-meta-size)',
  fontStyle: 'italic',
  margin: 'var(--fx-space-xxs) 0 0',
};

const idealFor: React.CSSProperties = {
  color: 'var(--fx-text-muted)',
  fontSize: 'var(--fx-body-sm-size)',
  lineHeight: 'var(--fx-body-sm-leading)',
  margin: 0,
};

/**
 * ProgramTiersTable Component
 *
 * Pricing tiers as a table on tablet and desktop, and as stacked cards on
 * phones (the swap is CSS-only, at the DSM's 767px mobile breakpoint, so the
 * server render already matches the device). Prices never wrap mid-amount.
 */
export const ProgramTiersTable: React.FC<ProgramTiersTableProps> = ({
  tiers,
  onViewComparison,
  showComparisonButton = true,
  subtitle = 'Choose your path based on your archetype assessment and personal goals.',
  firstColumnWidth,
}) => {
  return (
    <div className='space-y-6'>
      <Typography
        variant='h2'
        style={{
          color: 'var(--fx-accent)',
          fontSize: 'var(--fx-h2-size)',
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
          fontSize: 'var(--fx-subhead-size)',
          fontStyle: 'italic',
          textAlign: 'center',
          marginBottom: 'var(--fx-space-l)',
        }}
      >
        {subtitle}
      </Typography>

      {/* Tablet / desktop: table */}
      <div
        className='fx-pricing-table'
        style={{
          overflowX: 'auto',
          border: '1px solid var(--fx-text-faint)',
          borderRadius: 'var(--fx-radius-card)',
          backgroundColor: 'var(--fx-border)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--fx-surface-alt)' }}>
              <th
                scope='col'
                style={{
                  ...headerCell,
                  width: firstColumnWidth,
                  borderRight: '1px solid var(--fx-border)',
                }}
              >
                Program Tier
              </th>
              <th
                scope='col'
                style={{
                  ...headerCell,
                  borderRight: '1px solid var(--fx-border)',
                }}
              >
                Ideal For
              </th>
              <th scope='col' style={{ ...headerCell, whiteSpace: 'nowrap' }}>
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
                <th
                  scope='row'
                  style={{
                    ...bodyCell,
                    textAlign: 'left',
                    width: firstColumnWidth,
                    borderRight: '1px solid var(--fx-border)',
                  }}
                >
                  <p style={tierName}>{tier.name}</p>
                </th>
                <td
                  style={{
                    ...bodyCell,
                    borderRight: '1px solid var(--fx-border)',
                  }}
                >
                  <p style={idealFor}>{tier.idealFor}</p>
                </td>
                <td style={{ ...bodyCell, width: '1%' }}>
                  <p style={price}>{tier.monthlyRate}</p>
                  {tier.rateNote && <p style={rateNote}>{tier.rateNote}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phone: stacked cards */}
      <ul
        className='fx-pricing-cards'
        aria-label='Program tiers'
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: 'var(--fx-space-s)',
        }}
      >
        {tiers.map((tier) => (
          <li
            key={tier.id}
            style={{
              background: 'var(--fx-surface-card)',
              border: '1px solid var(--fx-border)',
              borderRadius: 'var(--fx-radius-card-sm)',
              padding: 'var(--fx-space-m)',
            }}
          >
            <h3 style={{ ...tierName, fontSize: 'var(--fx-article-h3)' }}>
              {tier.name}
            </h3>
            <p style={{ ...price, marginTop: 'var(--fx-space-xxs)' }}>
              {tier.monthlyRate}
            </p>
            {tier.rateNote && <p style={rateNote}>{tier.rateNote}</p>}
            <p
              style={{
                ...idealFor,
                marginTop: 'var(--fx-space-s)',
                paddingTop: 'var(--fx-space-s)',
                borderTop: '1px solid var(--fx-border-subtle)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 'var(--fx-kicker-size)',
                  fontWeight: 700,
                  letterSpacing: 'var(--fx-kicker-tracking)',
                  textTransform: 'uppercase',
                  color: 'var(--fx-text-faint)',
                  marginBottom: 'var(--fx-space-xxs)',
                }}
              >
                Ideal for
              </span>
              {tier.idealFor}
            </p>
          </li>
        ))}
      </ul>

      {/* Comparison Button */}
      {showComparisonButton && onViewComparison && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'var(--fx-space-l)',
          }}
        >
          <FormButton
            text="View Full Comparison - What's Included in Each Tier?"
            variant='secondary'
            size='large'
            onClick={onViewComparison}
            className='fx-pricing-compare-btn'
          />
        </div>
      )}
    </div>
  );
};
