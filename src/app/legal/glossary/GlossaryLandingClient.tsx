'use client';

import React from 'react';
import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Typography } from '../../../theme/components/typography';
import { InteractiveCard } from '../../../components/InteractiveCard';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import { FadeUp } from '@/animations/fade-animations';
import Callout from '@/theme/components/callout/Callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { useRouter } from 'next/navigation';

export default function GlossaryLandingClient() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const glossarySections = [
    {
      id: 'core-mythic',
      title: 'Core Mythic Terms',
      description:
        "Archetypal terminology, emotional stewardship concepts, ritual language, and the foundational vocabulary of Fluxline's mythic architecture.",
      icon: 'Lightbulb',
      href: '/legal/glossary/core-mythic-terms',
    },
    {
      id: 'technical',
      title: 'Technical & Professional Terms',
      description:
        "Business, legal, and technical terminology used across Fluxline's professional services, development, and consulting work.",
      icon: 'BookAnswers',
      href: '/legal/glossary/technical-terms',
    },
  ];

  return (
    <UnifiedPageWrapper layoutType='responsive-grid' showImageTitle={false}>
      <FadeUp duration={0.5} delay={0}>
        <div>
          {/* Hero Section */}
          <Hero
            title='Glossary of Terms'
            description='Comprehensive Terminology and Definitions'
            backArrow={true}
            backArrowPath='/legal'
          />

          {/* Introduction */}
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
              marginTop: theme.spacing.xl,
              marginBottom: theme.spacing.xl,
            }}
          >
            Fluxline operates across both mythic and technical domains. Our
            comprehensive glossary is divided into two specialized sections to
            serve different aspects of our work and communication.
          </Typography>

          {/* Glossary Sections Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: theme.spacing.l,
              marginBottom: theme.spacing.xxl,
            }}
          >
            {glossarySections.map((section) => (
              <InteractiveCard
                key={section.id}
                id={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
                href={section.href}
                iconPosition='center'
                showLearnMore={true}
              />
            ))}
          </div>

          {/* Usage Note */}
          <Callout
            title='Need More Information?'
            variant='subtle'
            subtitle='If you encounter a term not defined in either glossary, please contact us for clarification.'
          >
            <FormButton
              text='Contact Us'
              variant='primary'
              size='large'
              onClick={() => router.push('/contact')}
            />
          </Callout>
        </div>
      </FadeUp>
    </UnifiedPageWrapper>
  );
}
