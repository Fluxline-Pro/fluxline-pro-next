'use client';

import React from 'react';
import { Modal } from '@/components/Modal';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form/FormButton';
import type { ServicePricingData } from '@/app/services/types';

interface ProgramComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingData: ServicePricingData;
}

type FeatureValue = boolean | string | undefined;

type FeatureStatus = {
  kind: 'included' | 'excluded' | 'partial' | 'addon';
  /** Short label for assistive tech and the phone list. */
  label: string;
  /** Detail text for partial / add-on values. */
  note?: string;
};

/** Convert a feature name to its key in the comparison map. */
const featureToKey = (featureName: string): string =>
  featureName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function getStatus(value: FeatureValue): FeatureStatus {
  if (typeof value === 'string') {
    if (value.toLowerCase().includes('available as add-on')) {
      return { kind: 'addon', label: 'Available as add-on' };
    }
    return { kind: 'partial', label: 'Partly included', note: value };
  }
  return value === true
    ? { kind: 'included', label: 'Included' }
    : { kind: 'excluded', label: 'Not included' };
}

const ICONS: Record<FeatureStatus['kind'], { glyph: string; color: string }> =
  {
    included: { glyph: '✓', color: 'var(--fx-success)' },
    excluded: { glyph: '✕', color: 'var(--fx-error)' },
    addon: { glyph: '✕', color: 'var(--fx-error)' },
    partial: { glyph: '⚠', color: 'var(--fx-warning)' },
  };

const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

function StatusIcon({ status }: { status: FeatureStatus }) {
  const icon = ICONS[status.kind];
  return (
    <>
      <span
        aria-hidden='true'
        style={{
          fontSize: 'var(--fx-article-h3)',
          color: icon.color,
          lineHeight: 1,
        }}
      >
        {icon.glyph}
      </span>
      <span style={srOnly}>{status.label}</span>
    </>
  );
}

/**
 * ProgramComparisonModal Component
 *
 * What each tier includes. Tablet and desktop get the full feature-by-tier
 * table; phones get a tier picker and that tier's feature list (with any
 * partial-inclusion notes spelled out), since a five-column table cannot be
 * read at phone width. The swap is CSS-only at the DSM's 767px breakpoint.
 */
export const ProgramComparisonModal: React.FC<ProgramComparisonModalProps> = ({
  isOpen,
  onClose,
  pricingData,
}) => {
  const { tiers, features, comparison } = pricingData;
  const [activeTierId, setActiveTierId] = React.useState(tiers[0]?.id);
  const activeTier = tiers.find((t) => t.id === activeTierId) ?? tiers[0];

  const valueFor = (featureName: string, tierId: string): FeatureValue =>
    comparison[featureToKey(featureName)]?.[tierId];

  const cellPad = 'var(--fx-space-s)';

  return (
    <Modal isOpen={isOpen} onDismiss={onClose} maxWidth='1200px'>
      <div className='space-y-6'>
        {/* Header */}
        <Typography
          variant='h2'
          style={{
            color: 'var(--fx-accent)',
            fontSize:
              'clamp(var(--fx-article-h2), 4vw, var(--fx-h2-size))',
            fontWeight: 700,
            textAlign: 'center',
            paddingInline: 'var(--fx-space-xl)',
          }}
        >
          What&apos;s Included - Program Comparison
        </Typography>

        {/* Tablet / desktop: comparison table */}
        <div
          className='fx-compare-table'
          style={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            border: '1px solid var(--fx-text-faint)',
            borderRadius: 'var(--fx-radius-card)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--fx-surface-alt)' }}>
                <th
                  scope='col'
                  style={{
                    padding: cellPad,
                    textAlign: 'left',
                    color: 'var(--fx-text-bright)',
                    fontSize: 'var(--fx-body-size)',
                    fontWeight: 600,
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'var(--fx-surface-alt)',
                    zIndex: 1,
                    minWidth: '12.5rem',
                  }}
                >
                  Feature
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.id}
                    scope='col'
                    style={{
                      padding: cellPad,
                      color: 'var(--fx-text-bright)',
                      textAlign: 'center',
                      fontSize: 'var(--fx-body-sm-size)',
                      fontWeight: 600,
                      minWidth: '8.75rem',
                    }}
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => {
                const rowBg =
                  index % 2 === 0
                    ? 'var(--fx-surface-card)'
                    : 'var(--fx-surface-inset)';

                return (
                  <tr
                    key={feature.name}
                    style={{
                      backgroundColor: rowBg,
                      borderBottom: '1px solid var(--fx-border)',
                    }}
                  >
                    <th
                      scope='row'
                      style={{
                        padding: cellPad,
                        position: 'sticky',
                        left: 0,
                        backgroundColor: rowBg,
                        zIndex: 1,
                        borderRight: '1px solid var(--fx-border)',
                        textAlign: 'left',
                        color: 'var(--fx-text-body)',
                        fontSize: 'var(--fx-body-sm-size)',
                        fontWeight: 400,
                      }}
                    >
                      {feature.name}
                    </th>
                    {tiers.map((tier) => {
                      const status = getStatus(valueFor(feature.name, tier.id));
                      return (
                        <td
                          key={tier.id}
                          style={{ padding: cellPad, textAlign: 'center' }}
                          title={status.note}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 'var(--fx-space-xxs)',
                            }}
                          >
                            <StatusIcon status={status} />
                            {status.note && (
                              <span
                                style={{
                                  fontSize: 'var(--fx-meta-size)',
                                  color: 'var(--fx-text-muted)',
                                  lineHeight: 1.3,
                                }}
                              >
                                {status.note}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Phone: pick a tier, then read its list */}
        <div className='fx-compare-mobile'>
          <div
            role='group'
            aria-label='Choose a program tier'
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--fx-space-xs)',
              marginBottom: 'var(--fx-space-m)',
            }}
          >
            {tiers.map((tier) => {
              const active = tier.id === activeTier?.id;
              return (
                <button
                  key={tier.id}
                  type='button'
                  aria-pressed={active}
                  onClick={() => setActiveTierId(tier.id)}
                  style={{
                    fontFamily: 'var(--fx-font)',
                    fontSize: 'var(--fx-body-sm-size)',
                    fontWeight: 600,
                    padding: 'var(--fx-space-xs) var(--fx-space-s)',
                    borderRadius: 'var(--fx-radius-control)',
                    border: `1px solid ${active ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
                    background: active
                      ? 'var(--fx-accent)'
                      : 'var(--fx-surface-card)',
                    color: active
                      ? 'var(--fx-accent-ink)'
                      : 'var(--fx-text-body)',
                    cursor: 'pointer',
                  }}
                >
                  {tier.name}
                </button>
              );
            })}
          </div>

          {activeTier && (
            <div
              style={{
                border: '1px solid var(--fx-border)',
                borderRadius: 'var(--fx-radius-card-sm)',
                background: 'var(--fx-surface-card)',
              }}
            >
              <div
                style={{
                  padding: 'var(--fx-space-s) var(--fx-space-m)',
                  borderBottom: '1px solid var(--fx-border)',
                  background: 'var(--fx-surface-alt)',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: 'var(--fx-accent)',
                    fontSize: 'var(--fx-article-h3)',
                    fontWeight: 700,
                  }}
                >
                  {activeTier.name}
                </h3>
                <p
                  style={{
                    margin: 'var(--fx-space-xxs) 0 0',
                    color: 'var(--fx-text-bright)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {activeTier.monthlyRate}
                </p>
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {features.map((feature, index) => {
                  const status = getStatus(
                    valueFor(feature.name, activeTier.id)
                  );
                  return (
                    <li
                      key={feature.name}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1.5rem 1fr',
                        alignItems: 'start',
                        gap: 'var(--fx-space-xs)',
                        padding: 'var(--fx-space-xs) var(--fx-space-m)',
                        borderTop:
                          index === 0
                            ? 'none'
                            : '1px solid var(--fx-border-subtle)',
                      }}
                    >
                      <StatusIcon status={status} />
                      <div>
                        <div
                          style={{
                            color:
                              status.kind === 'excluded'
                                ? 'var(--fx-text-faint)'
                                : 'var(--fx-text-body)',
                            fontSize: 'var(--fx-body-sm-size)',
                          }}
                        >
                          {feature.name}
                        </div>
                        {(status.note || status.kind === 'addon') && (
                          <div
                            style={{
                              color: 'var(--fx-text-muted)',
                              fontSize: 'var(--fx-meta-size)',
                              lineHeight: 1.4,
                              marginTop: 'var(--fx-space-xxs)',
                            }}
                          >
                            {status.note ?? status.label}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'var(--fx-space-l)',
          }}
        >
          <FormButton
            text='Close'
            variant='secondary'
            size='large'
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
};
