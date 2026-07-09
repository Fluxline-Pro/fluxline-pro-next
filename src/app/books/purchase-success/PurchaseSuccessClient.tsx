'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getApiEndpoint } from '@/lib/getApiUrl';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxButton from '@/theme/components/dsm/FxButton';
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
  const stripeSessionPattern = /^cs_[a-zA-Z0-9_]+$/;
  return stripeSessionPattern.test(sessionId);
}

/**
 * Purchase Success page shown after a successful Stripe checkout.
 * Informs the customer that their personalized PDF will arrive by email.
 */
export function PurchaseSuccessClient() {
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

    if (!isValidStripeSessionId(sessionId)) {
      console.warn('Invalid Stripe session ID format:', sessionId);
      setOrderLoading(false);
      return;
    }

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
    <FxContainer
      as='main'
      style={{
        padding: isMobile ? '32px 12px' : '64px 32px 88px',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 150px)',
        display: isMobile ? 'block' : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: isMobile ? 32 : 75,
      }}
    >
      <FxSectionHeading
        title='Purchase Successful!'
        subhead='Your personalized PDF is on its way'
        lede='Thank you for your purchase. Your watermarked PDF is being prepared and will be emailed to you within the next few minutes.'
        as='h1'
      />

      {/* Order Details Section */}
      {orderDetails && !orderLoading && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            backgroundColor: 'var(--fx-surface-card)',
            borderRadius: 8,
            border: '2px solid var(--fx-accent)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <h4
              style={{
                color: 'var(--fx-accent)',
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                fontFamily: 'var(--fx-font)',
              }}
            >
              Order Details
            </h4>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
              gap: 4,
              rowGap: 4,
            }}
          >
            <span
              style={{
                color: 'var(--fx-text-body)',
                fontWeight: 600,
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              Order ID:
            </span>
            <span
              style={{
                color: 'var(--fx-text-heading)',
                fontFamily: 'monospace',
                fontSize: 'var(--fx-body-size)',
              }}
            >
              {orderDetails.orderId}
            </span>

            <span
              style={{
                color: 'var(--fx-text-body)',
                fontWeight: 600,
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              Product:
            </span>
            <span
              style={{
                color: 'var(--fx-text-heading)',
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              {getProductName(orderDetails.productType)}
            </span>

            <span
              style={{
                color: 'var(--fx-text-body)',
                fontWeight: 600,
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              Customer:
            </span>
            <span
              style={{
                color: 'var(--fx-text-heading)',
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              {orderDetails.customerName}
            </span>

            <span
              style={{
                color: 'var(--fx-text-body)',
                fontWeight: 600,
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              Email:
            </span>
            <span
              style={{
                color: 'var(--fx-text-heading)',
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              {orderDetails.customerEmail}
            </span>

            <span
              style={{
                color: 'var(--fx-text-body)',
                fontWeight: 600,
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              Status:
            </span>
            <span
              style={{
                color:
                  orderDetails.status === 'completed'
                    ? 'var(--fx-success, #107c10)'
                    : orderDetails.status === 'processing'
                      ? 'var(--fx-accent)'
                      : 'var(--fx-error, #a4262c)',
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              {orderDetails.status}
            </span>

            <span
              style={{
                color: 'var(--fx-text-body)',
                fontWeight: 600,
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              Date:
            </span>
            <span
              style={{
                color: 'var(--fx-text-heading)',
                fontSize: 'var(--fx-body-size)',
                fontFamily: 'var(--fx-font)',
              }}
            >
              {new Date(orderDetails.timestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </span>
          </div>
        </div>
      )}

      {/* Next Steps Section */}
      <div
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 12,
        }}
      >
        {/* What to Expect */}
        <div
          style={{
            padding: 12,
            backgroundColor: 'var(--fx-surface-card)',
            borderRadius: 8,
            border: '1px solid var(--fx-text-muted)',
          }}
        >
          <h4
            style={{
              color: 'var(--fx-accent)',
              margin: '0 0 4px',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'var(--fx-font)',
            }}
          >
            What to Expect
          </h4>
          <ul
            style={{
              listStyle: 'disc',
              paddingLeft: 20,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <li>
              <p
                style={{
                  color: 'var(--fx-text-heading)',
                  margin: 0,
                  fontSize: 'var(--fx-body-size)',
                  lineHeight: 'var(--fx-body-leading)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                Check your email inbox within the next 5-10 minutes
              </p>
            </li>
            <li>
              <p
                style={{
                  color: 'var(--fx-text-heading)',
                  margin: 0,
                  fontSize: 'var(--fx-body-size)',
                  lineHeight: 'var(--fx-body-leading)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                Your PDF has been watermarked with your name and email for
                security
              </p>
            </li>
            <li>
              <p
                style={{
                  color: 'var(--fx-text-heading)',
                  margin: 0,
                  fontSize: 'var(--fx-body-size)',
                  lineHeight: 'var(--fx-body-leading)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                If you don&apos;t see it, check your spam or junk folder
              </p>
            </li>
          </ul>
        </div>

        {/* Important: 7-Day Window */}
        <div
          style={{
            padding: 12,
            backgroundColor: 'var(--fx-surface-card)',
            borderRadius: 8,
            border: '3px solid var(--fx-warning, #fce100)',
          }}
        >
          <h4
            style={{
              color: 'var(--fx-warning, var(--fx-accent))',
              margin: '0 0 4px',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'var(--fx-font)',
            }}
          >
            Important: Download Window
          </h4>
          <p
            style={{
              color: 'var(--fx-text-heading)',
              marginBottom: 4,
              fontWeight: 600,
              fontSize: 'var(--fx-body-size)',
              fontFamily: 'var(--fx-font)',
            }}
          >
            Your download link is valid for 7 days only.
          </p>
          <p
            style={{
              color: 'var(--fx-text-body)',
              marginBottom: 4,
              fontSize: 14,
              fontFamily: 'var(--fx-font)',
            }}
          >
            After 7 days, the secure download link in your email will expire for
            security reasons. Make sure to download your PDF within this
            timeframe.
          </p>
          <div
            style={{
              padding: 4,
              backgroundColor: 'var(--fx-surface-card)',
              borderRadius: 4,
              border: '1px solid var(--fx-text-muted)',
            }}
          >
            <p
              style={{
                color: 'var(--fx-text-body)',
                margin: 0,
                fontSize: 14,
                fontFamily: 'var(--fx-font)',
              }}
            >
              <strong>Need help?</strong> Contact us at{' '}
              <a
                href='mailto:support@fluxline.pro'
                style={{
                  color: 'var(--fx-accent)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                support@fluxline.pro
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <FxButton
          variant='primary'
          size='lg'
          onClick={() => router.push('/books')}
        >
          Back to Books
        </FxButton>
        <FxButton
          variant='outline'
          size='lg'
          onClick={() => router.push('/services')}
        >
          Explore Services
        </FxButton>
        <FxButton
          variant='outline'
          size='lg'
          onClick={() => router.push('/contact')}
        >
          Contact Support
        </FxButton>
      </div>
    </FxContainer>
  );
}
