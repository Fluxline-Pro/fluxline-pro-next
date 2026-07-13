'use client';

import React from 'react';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import { FadeUp } from '@/animations/fade-animations';

export default function ArticlesOfConversionClient() {
  const currentYear = new Date().getFullYear();

  // In a real implementation, you would have the actual PDF file
  // For now, we'll provide a placeholder and download link
  const pdfUrl = '/assets/legal/articles-of-conversion.pdf';

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
              }}>Articles of Conversion</h1>
            </div>
            <p style={{ color: 'var(--fx-text-muted)', fontSize: '1.125rem', lineHeight: 1.6, margin: '1rem 0 0' }}>Legal Entity Conversion Documentation</p>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--fx-font)',
              fontSize: 'var(--fx-body-size)',
              lineHeight: 'var(--fx-body-leading)',
              color: 'var(--fx-text-body)',
              marginBottom: '1.5rem',
              marginTop: '2rem',
            }}
          >
            The Articles of Conversion document the legal transformation of
            Fluxline Resonance Group business entity structure. This official
            filing records the conversion process and regulatory compliance.
          </p>

          {/* PDF Viewer Container */}
          <div
            style={{
              marginTop: '2rem',
              marginBottom: '2rem',
              border: '1px solid var(--fx-border)',
              borderRadius: 'var(--fx-radius-card)',
              padding: '1.5rem',
              backgroundColor: 'var(--fx-surface-inset)',
              textAlign: 'center',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--fx-font)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--fx-text-body)',
                marginBottom: '1rem',
              }}
            >
              PDF Document
            </h4>

            {/* PDF Embed or Download Link */}
            <div
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              {/* For browsers that support PDF embedding */}
              <object
                data={pdfUrl}
                type='application/pdf'
                width='100%'
                style={{
                  minHeight: '600px',
                  border: '1px solid var(--fx-text-faint)',
                  borderRadius: '4px',
                }}
              >
                {/* Fallback for browsers that don't support PDF embedding */}
                <div
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--fx-font)',
                      fontSize: 'var(--fx-body-size)',
                      lineHeight: 'var(--fx-body-leading)',
                      color: 'var(--fx-text-body)',
                      marginBottom: '1rem',
                    }}
                  >
                    Your browser does not support embedded PDF viewing.
                  </p>
                  <a
                    href={pdfUrl}
                    download='Fluxline-Articles-of-Conversion.pdf'
                    style={{
                      display: 'inline-block',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'var(--fx-accent)',
                      color: 'var(--fx-text-bright)',
                      borderRadius: 'var(--fx-radius-card)',
                      textDecoration: 'none',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Download PDF
                  </a>
                </div>
              </object>
            </div>

            {/* Download Button */}
            <a
              href={pdfUrl}
              download='Fluxline-Articles-of-Conversion.pdf'
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--fx-accent)',
                color: 'var(--fx-text-bright)',
                borderRadius: 'var(--fx-radius-card)',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              Download PDF
            </a>
          </div>

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
              &copy; {currentYear} Fluxline Resonance Group, LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </FadeUp>
    </FxContainer>
  );
}
