'use client';

import React from 'react';
import Link from 'next/link';
import { UnifiedMarkdownRenderer } from '../utils/markdownRenderer';
import { ProtectedEmail } from './ProtectedEmail';

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  content: string;
}

/**
 * Legal Page Layout Component
 *
 * Provides consistent layout and styling for all legal/reference pages
 * - Displays title and optional subtitle
 * - Renders markdown content with theme-aware styling
 * - Shows last updated date
 * - Includes copyright footer
 */
export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  subtitle,
  content,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
        color: 'var(--fx-text-body)',
      }}
    >
      {/* Back Navigation and Page Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: subtitle ? '0.75rem' : '1.5rem',
        }}
      >
        <Link
          href="/legal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem',
            borderRadius: '8px',
            color: 'var(--fx-accent)',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <h1
          style={{
            color: 'var(--fx-text-body)',
            fontSize: '2rem',
            fontWeight: 600,
            margin: 0,
            fontFamily: 'var(--fx-font)',
          }}
        >
          {title}
        </h1>
      </div>

      {/* Subtitle (if provided) */}
      {subtitle && (
        <h3
          style={{
            color: 'var(--fx-text-muted)',
            fontSize: '1.25rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
            fontFamily: 'var(--fx-font)',
          }}
        >
          {subtitle}
        </h3>
      )}

      {/* Main Content */}
      <div
        className="legal-content"
        style={{
          marginTop: '2rem',
          marginBottom: '2.5rem',
        }}
      >
        <UnifiedMarkdownRenderer content={content} />
        <style jsx>{`
          :global(.legal-content h1:first-child) {
            display: none;
          }
          :global(.legal-content h2) {
            font-size: 2rem !important;
            font-weight: 600 !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
          }
        `}</style>
      </div>

      {/* Copyright Footer */}
      <footer
        style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--fx-border)',
        }}
      >
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--fx-text-faint)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          &copy; {currentYear} Fluxline Resonance Group, LLC. All rights reserved.
        </p>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--fx-text-faint)',
            textAlign: 'center',
            marginTop: '0.75rem',
          }}
        >
          Questions? Contact us at{' '}
          <ProtectedEmail
            username="support"
            domain="fluxline.pro"
            style={{
              color: 'var(--fx-accent)',
              textDecoration: 'underline',
            }}
          >
            support [at] fluxline.pro
          </ProtectedEmail>
        </p>
      </footer>
    </div>
  );
};

export default LegalPageLayout;
