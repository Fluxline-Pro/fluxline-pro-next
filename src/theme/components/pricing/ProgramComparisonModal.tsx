'use client';

import React from 'react';
import { Modal } from '@/components/Modal';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { FormButton } from '@/theme/components/form/FormButton';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
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
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  const { tiers, features, comparison } = pricingData;

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
            <FluentIcon
              iconName='ComplianceAudit'
              size='large'
              color={theme.palette.themePrimary}
            />
            <Typography
              variant='h2'
              style={{
                color: theme.palette.themePrimary,
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: theme.typography.fontWeights.bold,
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
            border: `1px solid ${theme.palette.neutralTertiary}`,
            borderRadius: theme.borderRadius.container.medium,
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
                  backgroundColor: isDark
                    ? theme.palette.themeDarkAlt
                    : theme.palette.themePrimary,
                }}
              >
                <th
                  style={{
                    padding: isMobile ? '0.75rem' : '1rem',
                    textAlign: 'center',
                    color: theme.palette.white,
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    fontWeight: theme.typography.fontWeights.semiBold,
                    position: 'sticky',
                    left: 0,
                    backgroundColor: isDark
                      ? theme.palette.themeDarkAlt
                      : theme.palette.themePrimary,
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
                      color: theme.palette.white,
                      textAlign: 'center',
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      fontWeight: theme.typography.fontWeights.semiBold,
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

                return (
                  <tr
                    key={featureKey}
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? theme.palette.neutralLighterAlt
                          : theme.palette.neutralLight,
                      borderBottom: `1px solid ${theme.palette.neutralQuaternary}`,
                    }}
                  >
                    <td
                      style={{
                        padding: isMobile ? '0.75rem' : '1rem',
                        position: 'sticky',
                        left: 0,
                        backgroundColor:
                          index % 2 === 0
                            ? theme.palette.neutralLighterAlt
                            : theme.palette.neutralLight,
                        zIndex: 1,
                        borderRight: `1px solid ${theme.palette.neutralQuaternary}`,
                      }}
                    >
                      <Typography
                        variant='p'
                        style={{
                          color: theme.palette.neutralPrimary,
                          fontSize: isMobile ? '0.8125rem' : '0.9375rem',
                          fontWeight: theme.typography.fontWeights.regular,
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
                      const hasFeature = featureValue === true;
                      const noFeature = featureValue === false;

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
                              <FluentIcon
                                iconName='WarningSolid'
                                size='medium'
                                color={theme.palette.yellow}
                              />
                              {!isMobile && (
                                <Typography
                                  variant='p'
                                  style={{
                                    fontSize: '0.8125rem',
                                    color: theme.palette.neutralSecondary,
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
                              <FluentIcon
                                iconName={hasFeature ? 'CheckMark' : 'Cancel'}
                                size='medium'
                                color={
                                  hasFeature
                                    ? theme.palette.green
                                    : theme.palette.red
                                }
                              />
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
            marginTop: theme.spacing.l,
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
