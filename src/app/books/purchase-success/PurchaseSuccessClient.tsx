'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { getApiEndpoint } from '@/lib/getApiUrl';
import { Typography } from '@/theme/components/typography/';
import { FormButton } from '@/theme/components/form/FormButton';
import { Hero } from '@/theme/components/hero';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  productType: 'book' | 'workbook' | 'bundle';
  timestamp: string;
  status: string;
}

/**
 * Validates that a session ID matches the expected Stripe checkout session format.
 * Stripe checkout session IDs start with "cs_" followed by alphanumeric characters and underscores.
 * @param sessionId - The session ID to validate
 * @returns true if valid, false otherwise
 */
function isValidStripeSessionId(sessionId: string): boolean {
  // Stripe checkout session IDs start with "cs_" and contain alphanumeric + underscore chars
  const stripeSessionPattern = /^cs_[a-zA-Z0-9_]+$/;
  return stripeSessionPattern.test(sessionId);
}

/**
 * Purchase Success page shown after a successful Stripe checkout.
 * Informs the customer that their personalized PDF will arrive by email.
 */
export function PurchaseSuccessClient() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const isMobileHook = useIsMobile();
  const isMobile = isMounted ? isMobileHook : false;
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderLoading, setOrderLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setOrderLoading(false);
      return;
    }

    // Validate session ID format before making API call
    if (!isValidStripeSessionId(sessionId)) {
      console.warn('Invalid Stripe session ID format:', sessionId);
      setOrderLoading(false);
      return;
    }

    // Fetch order details from backend
    const fetchOrder = async () => {
      try {
        const apiUrl = getApiEndpoint(`/api/get-order?session_id=${sessionId}`);
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
        }
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setOrderLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams]);

  const getProductName = (productType: string) => {
    switch (productType) {
      case 'book':
        return 'Resonance Core Framework eBook';
      case 'workbook':
        return 'Resonance Core Framework Workbook';
      case 'bundle':
        return 'Resonance Core Framework Bundle (eBook + Workbook)';
      default:
        return 'PDF Product';
    }
  };

  return (
    <main
      style={{
        padding: isMobile
          ? theme.spacing.m
          : `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.l}`,
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 150px)',
        display: isMobile ? 'block' : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: isMobile ? theme.spacing.xl : '75px',
      }}
    >
      <Hero
        title='Purchase Successful!'
        subtitle='Your personalized PDF is on its way'
        description='Thank you for your purchase. Your watermarked PDF is being prepared and will be emailed to you within the next few minutes.'
        iconName='CheckMark'
        showBorder={true}
        showShadow={false}
      />

      {/* Order Details Section */}
      {orderDetails && !orderLoading && (
        <div
          style={{
            marginTop: theme.spacing.l,
            padding: theme.spacing.m,
            backgroundColor: theme.palette.neutralLighter,
            borderRadius: theme.effects.roundedCorner6,
            border: `2px solid ${theme.palette.themePrimary}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.m,
              marginBottom: theme.spacing.m,
            }}
          >
            <FluentIcon
              iconName='BoxCheckmarkSolid'
              size='large'
              color={theme.palette.themePrimary}
            />
            <Typography
              variant='h4'
              style={{ color: theme.palette.themePrimary, margin: 0 }}
            >
              Order Details
            </Typography>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
              gap: theme.spacing.s,
              rowGap: theme.spacing.s,
            }}
          >
            <Typography
              variant='body'
              style={{
                color: theme.palette.neutralSecondary,
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Order ID:
            </Typography>
            <Typography
              variant='body'
              style={{
                color: theme.palette.neutralPrimary,
                fontFamily: 'monospace',
              }}
            >
              {orderDetails.orderId}
            </Typography>

            <Typography
              variant='body'
              style={{
                color: theme.palette.neutralSecondary,
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Product:
            </Typography>
            <Typography
              variant='body'
              style={{ color: theme.palette.neutralPrimary }}
            >
              {getProductName(orderDetails.productType)}
            </Typography>

            <Typography
              variant='body'
              style={{
                color: theme.palette.neutralSecondary,
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Customer:
            </Typography>
            <Typography
              variant='body'
              style={{ color: theme.palette.neutralPrimary }}
            >
              {orderDetails.customerName}
            </Typography>

            <Typography
              variant='body'
              style={{
                color: theme.palette.neutralSecondary,
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Email:
            </Typography>
            <Typography
              variant='body'
              style={{ color: theme.palette.neutralPrimary }}
            >
              {orderDetails.customerEmail}
            </Typography>

            <Typography
              variant='body'
              style={{
                color: theme.palette.neutralSecondary,
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Status:
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.s,
              }}
            >
              <FluentIcon
                iconName={
                  orderDetails.status === 'completed'
                    ? 'CompletedSolid'
                    : orderDetails.status === 'processing'
                      ? 'ProgressRingDots'
                      : 'ErrorBadge'
                }
                size='small'
                color={
                  orderDetails.status === 'completed'
                    ? theme.semanticColors.successIcon || theme.palette.green
                    : orderDetails.status === 'processing'
                      ? theme.palette.themePrimary
                      : theme.semanticColors.errorIcon
                }
              />
              <Typography
                variant='body'
                style={{
                  color:
                    orderDetails.status === 'completed'
                      ? theme.semanticColors.successIcon || theme.palette.green
                      : orderDetails.status === 'processing'
                        ? theme.palette.themePrimary
                        : theme.semanticColors.errorIcon,
                  fontWeight: theme.typography.fontWeights.semiBold,
                  textTransform: 'capitalize',
                }}
              >
                {orderDetails.status}
              </Typography>
            </div>

            <Typography
              variant='body'
              style={{
                color: theme.palette.neutralSecondary,
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Date:
            </Typography>
            <Typography
              variant='body'
              style={{ color: theme.palette.neutralPrimary }}
            >
              {new Date(orderDetails.timestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </Typography>
          </div>
        </div>
      )}

      {/* Next Steps Section */}
      <div
        style={{
          marginTop: theme.spacing.l,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: theme.spacing.m,
        }}
      >
        {/* What to Expect */}
        <div
          style={{
            padding: theme.spacing.m,
            backgroundColor: theme.palette.neutralLighter,
            borderRadius: theme.effects.roundedCorner6,
            border: `1px solid ${theme.palette.neutralTertiary}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.s,
              marginBottom: theme.spacing.s,
            }}
          >
            <FluentIcon
              iconName='Mail'
              size='large'
              color={theme.palette.themePrimary}
            />
            <Typography
              variant='h4'
              style={{ color: theme.palette.themePrimary, margin: 0 }}
            >
              What to Expect
            </Typography>
          </div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.s,
            }}
          >
            <li
              style={{
                display: 'flex',
                gap: theme.spacing.s,
                alignItems: 'flex-start',
              }}
            >
              <FluentIcon
                iconName='CircleFill'
                size='small'
                color={theme.palette.themePrimary}
                style={{ marginTop: '0.25rem', flexShrink: 0 }}
              />
              <Typography
                variant='body'
                style={{ color: theme.palette.neutralPrimary, margin: 0 }}
              >
                Check your email inbox within the next 5-10 minutes
              </Typography>
            </li>
            <li
              style={{
                display: 'flex',
                gap: theme.spacing.s,
                alignItems: 'flex-start',
              }}
            >
              <FluentIcon
                iconName='CircleFill'
                size='small'
                color={theme.palette.themePrimary}
                style={{ marginTop: '0.25rem', flexShrink: 0 }}
              />
              <Typography
                variant='body'
                style={{ color: theme.palette.neutralPrimary, margin: 0 }}
              >
                Your PDF has been watermarked with your name and email for
                security
              </Typography>
            </li>
            <li
              style={{
                display: 'flex',
                gap: theme.spacing.s,
                alignItems: 'flex-start',
              }}
            >
              <FluentIcon
                iconName='CircleFill'
                size='small'
                color={theme.palette.themePrimary}
                style={{ marginTop: '0.25rem', flexShrink: 0 }}
              />
              <Typography
                variant='body'
                style={{ color: theme.palette.neutralPrimary, margin: 0 }}
              >
                If you don&apos;t see it, check your spam or junk folder
              </Typography>
            </li>
          </ul>
        </div>

        {/* Important: 7-Day Window */}
        <div
          style={{
            padding: theme.spacing.m,
            backgroundColor: theme.palette.redDark || theme.palette.yellowLight,
            borderRadius: theme.effects.roundedCorner6,
            border: `3px solid ${theme.palette.redDark || theme.palette.yellow}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.s,
              marginBottom: theme.spacing.s,
            }}
          >
            <FluentIcon
              iconName='Clock'
              size='large'
              color={theme.semanticColors.warningIcon || theme.palette.yellow}
            />
            <Typography
              variant='h4'
              style={{
                color:
                  theme.semanticColors.warningIcon ||
                  theme.palette.themePrimary,
                margin: 0,
              }}
            >
              Important: Download Window
            </Typography>
          </div>
          <Typography
            variant='body'
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.s,
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            Your download link is valid for 7 days only.
          </Typography>
          <Typography
            variant='bodySmall'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.s,
            }}
          >
            After 7 days, the secure download link in your email will expire for
            security reasons. Make sure to download your PDF within this
            timeframe.
          </Typography>
          <div
            style={{
              padding: theme.spacing.s,
              backgroundColor: theme.palette.neutralLighter,
              borderRadius: theme.effects.roundedCorner4,
              border: `1px solid ${theme.palette.neutralTertiary}`,
            }}
          >
            <Typography
              variant='bodySmall'
              style={{ color: theme.palette.neutralSecondary, margin: 0 }}
            >
              <strong>Need help?</strong> Contact us at{' '}
              <a
                href='mailto:support@fluxline.pro'
                style={{
                  color: theme.palette.themePrimary,
                  textDecoration: 'none',
                  fontWeight: theme.typography.fontWeights.semiBold,
                }}
              >
                support@fluxline.pro
              </a>
            </Typography>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          marginTop: theme.spacing.l,
          display: 'flex',
          gap: theme.spacing.m,
          flexWrap: 'wrap',
        }}
      >
        <FormButton
          variant='primary'
          text='Back to Books'
          icon='BookAnswers'
          size='large'
          onClick={() => router.push('/books')}
        />
        <FormButton
          variant='secondary'
          text='Explore Services'
          icon='Rocket'
          size='large'
          onClick={() => router.push('/services')}
        />
        <FormButton
          variant='outline'
          text='Contact Support'
          icon='Mail'
          size='large'
          onClick={() => router.push('/contact')}
        />
      </div>
    </main>
  );
}
