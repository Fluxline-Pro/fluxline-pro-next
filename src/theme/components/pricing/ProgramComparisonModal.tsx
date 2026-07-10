'use client';

import React from 'react';
import { Modal } from '@/components/Modal';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form/FormButton';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import type { ServicePricingData } from '@/app/services/types';

interface ProgramComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingData: ServicePricingData;
}

/**
 * ProgramComparisonModal Component
 * Displays a detailed comparison table of features across all program tiers
 */
export const ProgramComparisonModal: React.FC<ProgramComparisonModalProps> = ({
  isOpen,
  onClose,
  pricingData,
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isMobile = isMounted ? isMobileHook : false;

  const { tiers, features, comparison } = pricingData;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Convert feature names to keys for comparison lookup
  const featureToKey = (featureName: string): string => {
    return featureName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  return (
    <Modal isOpen={isOpen} onDismiss={onClose} maxWidth='1200px'>
      <div className='space-y-6'>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <Typography
              variant='h2'
              style={{
                color: 'var(--fx-accent)',
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: 700,
              }}
            >
              What&apos;s Included - Program Comparison
            </Typography>
          </div>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            overflowX: 'auto',
            border: '1px solid var(--fx-text-faint)',
            borderRadius: 'var(--fx-radius-card)',
            overflow: 'hidden',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: isMobile ? '800px' : 'auto',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--fx-accent)',
                }}
              >
                <th
                  style={{
                    padding: isMobile ? '0.75rem' : '1rem',
                    textAlign: 'center',
                    color: 'var(--fx-text-bright)',
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    fontWeight: 600,
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'var(--fx-accent)',
                    zIndex: 1,
                    minWidth: isMobile ? '150px' : '200px',
                  }}
                >
                  Feature
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.id}
                    style={{
                      padding: isMobile ? '0.75rem' : '1rem',
                      color: 'var(--fx-text-bright)',
                      textAlign: 'center',
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      fontWeight: 600,
                      minWidth: isMobile ? '100px' : '140px',
                    }}
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => {
                const featureKey = featureToKey(feature.name);
                const featureComparison = comparison[featureKey];
                const rowBg =
                  index % 2 === 0
                    ? 'var(--fx-surface-card)'
                    : 'var(--fx-border)';

                return (
                  <tr
                    key={featureKey}
                    style={{
                      backgroundColor: rowBg,
                      borderBottom: '1px solid var(--fx-border)',
                    }}
                  >
                    <td
                      style={{
                        padding: isMobile ? '0.75rem' : '1rem',
                        position: 'sticky',
                        left: 0,
                        backgroundColor: rowBg,
                        zIndex: 1,
                        borderRight: '1px solid var(--fx-border)',
                      }}
                    >
                      <Typography
                        variant='p'
                        style={{
                          color: 'var(--fx-text)',
                          fontSize: isMobile ? '0.875rem' : '1rem',
                          fontWeight: 400,
                          textAlign: 'center',
                          display: 'block',
                        }}
                      >
                        {feature.name}
                      </Typography>
                    </td>
                    {tiers.map((tier) => {
                      const featureValue = featureComparison
                        ? featureComparison[tier.id]
                        : false;

                      const isPartial = typeof featureValue === 'string';
                      const isAddOn =
                        typeof featureValue === 'string' &&
                        (featureValue as string)
                          .toLowerCase()
                          .includes('available as add-on');
                      const hasFeature = featureValue === true;

                      return (
                        <td
                          key={tier.id}
                          style={{
                            padding: isMobile ? '0.75rem' : '1rem',
                            textAlign: 'center',
                          }}
                          title={
                            isPartial ? (featureValue as string) : undefined
                          }
                        >
                          {isPartial ? (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.25rem',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '1.25rem',
                                  color: isAddOn
                                    ? 'var(--fx-status-error)'
                                    : 'var(--fx-status-warning)',
                                  lineHeight: 1,
                                }}
                                aria-hidden='true'
                              >
                                {isAddOn ? '✕' : '⚠'}
                              </span>
                              {!isMobile && (
                                <Typography
                                  variant='p'
                                  style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--fx-text-muted)',
                                    textAlign: 'center',
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {featureValue}
                                </Typography>
                              )}
                            </div>
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '1.25rem',
                                  color: hasFeature
                                    ? 'var(--fx-status-success)'
                                    : 'var(--fx-status-error)',
                                  lineHeight: 1,
                                }}
                                aria-hidden='true'
                              >
                                {hasFeature ? '✓' : '✕'}
                              </span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Close Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
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
