'use client';

/**
 * Fluxline Ethos Page
 * Presents the Fluxline philosophy, mission, and service framework
 */

import React from 'react';
import Link from 'next/link';
import { SimplePageWrapper } from '@/components/SimplePageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import {
  ethosHero,
  ethosAbout,
  ethosServices,
  ethosCTA,
} from '@/lib/ethos/ethosContent';

export default function FluxlineEthosPage() {
  const { theme } = useAppTheme();

  return (
    <SimplePageWrapper>
      <div className='space-y-16'>
        {/* Hero Section */}
        <section className='space-y-6'>
          <Typography
            variant='h1'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: theme.typography.fontWeights.bold,
              lineHeight: theme.typography.lineHeights.tight,
            }}
          >
            {ethosHero.title}
          </Typography>

          <Typography
            variant='h2'
            style={{
              color: theme.palette.themeSecondary,
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: theme.typography.fontWeights.light,
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            }}
          >
            {ethosHero.subtitle}
          </Typography>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            {ethosHero.description}
          </Typography>
        </section>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: theme.palette.neutralQuaternary,
          }}
        />

        {/* About Fluxline Section */}
        <section className='space-y-6'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: theme.typography.fontWeights.semiBold,
              marginBottom: '1.5rem',
            }}
          >
            {ethosAbout.sectionTitle}
          </Typography>

          {ethosAbout.paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </section>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: theme.palette.neutralQuaternary,
          }}
        />

        {/* Services Overview Section */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            {ethosServices.sectionTitle}
          </Typography>

          <div
            className='grid gap-6'
            style={{
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            }}
          >
            {ethosServices.services.map((service) => (
              <Link
                key={service.id}
                href={service.link}
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  borderRadius: theme.borderRadius.container.medium,
                  border: `1px solid ${theme.palette.neutralLight}`,
                  backgroundColor: theme.palette.white,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.palette.themePrimary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    theme.shadows?.m || '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    theme.palette.neutralLight;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Typography
                  variant='h3'
                  style={{
                    color: theme.palette.themePrimary,
                    fontSize: '1.25rem',
                    fontWeight: theme.typography.fontWeights.semiBold,
                    marginBottom: '0.75rem',
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '1rem',
                    lineHeight: theme.typography.lineHeights.relaxed,
                  }}
                >
                  {service.description}
                </Typography>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link
              href='/services'
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                borderRadius: theme.borderRadius.container.small,
                border: `2px solid ${theme.palette.themePrimary}`,
                color: theme.palette.themePrimary,
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.themePrimary;
                e.currentTarget.style.color = theme.palette.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = theme.palette.themePrimary;
              }}
            >
              View All Services
            </Link>
          </div>
        </section>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: theme.palette.neutralQuaternary,
          }}
        />

        {/* CTA Section */}
        <section
          style={{
            padding: '2.5rem',
            borderRadius: theme.borderRadius.container.medium,
            border: `2px solid ${theme.palette.themeTertiary}`,
            backgroundColor: 'transparent',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: theme.typography.fontWeights.semiBold,
              marginBottom: '1rem',
            }}
          >
            {ethosCTA.title}
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
              marginBottom: '2rem',
            }}
          >
            {ethosCTA.description}
          </Typography>
          <Link
            href={ethosCTA.buttonLink}
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              borderRadius: theme.borderRadius.container.small,
              backgroundColor: theme.palette.themePrimary,
              color: theme.palette.white,
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: theme.typography.fontWeights.semiBold,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.palette.themeSecondary;
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.palette.themePrimary;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {ethosCTA.buttonText}
          </Link>
        </section>

        {/* Additional Links Section */}
        <section
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1rem',
              marginBottom: '1rem',
            }}
          >
            Explore more about Fluxline
          </Typography>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/about'
              style={{
                color: theme.palette.themeTertiary,
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: theme.typography.fontWeights.medium,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.palette.themePrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.palette.themeTertiary;
              }}
            >
              → About Us
            </Link>
            <span style={{ color: theme.palette.neutralTertiary }}>|</span>
            <Link
              href='/services'
              style={{
                color: theme.palette.themeTertiary,
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: theme.typography.fontWeights.medium,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.palette.themePrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.palette.themeTertiary;
              }}
            >
              → Services
            </Link>
            <span style={{ color: theme.palette.neutralTertiary }}>|</span>
            <Link
              href='/services/scrolls'
              style={{
                color: theme.palette.themeTertiary,
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: theme.typography.fontWeights.medium,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.palette.themePrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.palette.themeTertiary;
              }}
            >
              → Explore the Scrolls
            </Link>
          </div>
        </section>
      </div>
    </SimplePageWrapper>
  );
}
