'use client';

import React from 'react';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxCard from '@/theme/components/dsm/FxCard';
import { FadeUp } from '@/animations/fade-animations';
import Callout from '@/theme/components/callout/Callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { useRouter } from 'next/navigation';

export default function GlossaryLandingClient() {
  const router = useRouter();

  const glossarySections = [
    {
      id: 'core-mythic',
      title: 'Core Mythic Terms',
      description:
        "Archetypal terminology, emotional stewardship concepts, ritual language, and the foundational vocabulary of Fluxline's mythic architecture.",
      href: '/legal/glossary/core-mythic-terms',
    },
    {
      id: 'technical',
      title: 'Technical & Professional Terms',
      description:
        "Business, legal, and technical terminology used across Fluxline's professional services, development, and consulting work.",
      href: '/legal/glossary/technical-terms',
    },
  ];

  return (
    <FxContainer>
      <FadeUp duration={0.5} delay={0}>
        <div>
          {/* Hero Section */}
          <div
            style={{
              border: '1px solid var(--fx-border)',
              backgroundColor: 'var(--fx-surface-card)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              borderRadius: 'var(--fx-radius-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                href="/legal"
                style={{
                  color: 'var(--fx-accent)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
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
                  color: 'var(--fx-accent)',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  margin: 0,
                  fontFamily: 'var(--fx-font)',
                }}
              >
                Glossary of Terms
              </h1>
            </div>
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                margin: '1rem 0 0',
              }}
            >
              Comprehensive Terminology and Definitions
            </p>
          </div>

          {/* Introduction */}
          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: '1.125rem',
              lineHeight: 1.6,
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Fluxline operates across both mythic and technical domains. Our
            comprehensive glossary is divided into two specialized sections to
            serve different aspects of our work and communication.
          </p>

          {/* Glossary Sections Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            {glossarySections.map((section) => (
              <FxCard
                key={section.id}
                variant="standard"
                interactive
                href={section.href}
                padding="1.5rem"
              >
                <h3
                  style={{
                    color: 'var(--fx-accent)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    margin: '0 0 0.5rem 0',
                    fontFamily: 'var(--fx-font)',
                  }}
                >
                  {section.title}
                </h3>
                <p
                  style={{
                    color: 'var(--fx-text-muted)',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    margin: '0 0 1rem 0',
                  }}
                >
                  {section.description}
                </p>
                <span
                  style={{
                    color: 'var(--fx-accent)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Learn more &gt;
                </span>
              </FxCard>
            ))}
          </div>

          {/* Usage Note */}
          <Callout
            title="Need More Information?"
            variant="subtle"
            subtitle="If you encounter a term not defined in either glossary, please contact us for clarification."
          >
            <FormButton
              text="Contact Us"
              variant="primary"
              size="large"
              onClick={() => router.push('/contact')}
            />
          </Callout>
        </div>
      </FadeUp>
    </FxContainer>
  );
}
