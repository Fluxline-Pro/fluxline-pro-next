'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form';
import { UnifiedMarkdownRenderer } from '@/utils/markdownRenderer';
import { content } from '../../../assets/legal/terms-of-use';
import { FadeUp } from '@/animations/fade-animations';

export default function TermsClientPage() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <FxContainer>
      <FadeUp duration={0.5} delay={0}>
        <div
          style={{
            padding: '2rem',
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Hero Section */}
          <div style={{
            border: '1px solid var(--fx-border)',
            backgroundColor: 'var(--fx-surface-card)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            borderRadius: 'var(--fx-radius-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href="/legal" style={{ color: 'var(--fx-accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 style={{
                color: 'var(--fx-accent)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: 0,
                fontFamily: 'var(--fx-font)',
              }}>
                Terms of Use
              </h1>
            </div>
            <p style={{ color: 'var(--fx-text-muted)', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>
              Effective: October 12, 2025 | Last Updated: October 12, 2025
            </p>
            <p style={{ color: 'var(--fx-text-muted)', fontSize: '1.125rem', lineHeight: 1.6, margin: '1rem 0 0' }}>
              Service Terms and User Agreements
            </p>
          </div>

          {/* Main Content */}
          <div
            style={{
              marginTop: '2rem',
              marginBottom: '2.5rem',
            }}
          >
            <UnifiedMarkdownRenderer content={content} />
          </div>

          {/* Contact CTA */}
          <Callout
            variant='subtle'
            title='Questions About Our Terms?'
            subtitle="We're here to help clarify any questions you may have."
            action={
              <FormButton
                text='Contact Us'
                variant='primary'
                size='large'
                onClick={() => router.push('/contact')}
              />
            }
          />

          {/* Copyright Footer */}
          <div
            style={{
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--fx-border)',
              textAlign: 'center',
              color: 'var(--fx-text-faint)',
              fontSize: '0.875rem',
            }}
          >
            <p>
              © {currentYear} Fluxline Resonance Group, LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </FadeUp>
    </FxContainer>
  );
}
