'use client';

/**
 * Contact Page - Let's Connect
 * Contact form and information for reaching out to Fluxline
 */

import React from 'react';
import { SimplePageWrapper } from '@/components/SimplePageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { ContactForm } from './components/ContactForm';

export default function ContactPage() {
  const { theme } = useAppTheme();

  return (
    <SimplePageWrapper>
      <div className='space-y-8'>
        {/* Header Section with Hire Me Button */}
        <div className='flex justify-between items-start flex-wrap gap-4'>
          <div className='flex-1'>
            <Typography
              variant='h1'
              style={{
                color: theme.palette.themePrimary,
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: theme.typography.fontWeights.bold,
                marginBottom: theme.spacing.s,
              }}
            >
              contact
            </Typography>
          </div>
        </div>

        {/* Intro Text */}
        <div className='space-y-4'>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            Feel free to contact me via social media or the form below.
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            I can also offer estimates for your design projects and tutoring
            sessions. Simply enquire below!
          </Typography>
        </div>

        {/* Contact Form */}
        <div
          style={{
            maxWidth: '600px',
          }}
        >
          <ContactForm />
        </div>

        {/* Business Cards / CTA Section */}
        <div className='space-y-6 mt-12'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '1.75rem',
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            Let&apos;s Build Something Extraordinary
          </Typography>

          <div className='grid gap-6 md:grid-cols-2'>
            {/* Design Services Card */}
            <div
              style={{
                padding: theme.spacing.l,
                backgroundColor: theme.palette.neutralLighterAlt,
                borderRadius: theme.borderRadius.m,
                border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
              }}
            >
              <Typography
                variant='h3'
                style={{
                  color: theme.palette.themePrimary,
                  fontSize: '1.25rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                  marginBottom: theme.spacing.m,
                }}
              >
                Design & Branding
              </Typography>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  lineHeight: theme.typography.lineHeights.relaxed,
                }}
              >
                From logo design to complete brand identities, I create visual
                systems that resonate with your audience and stand the test of
                time.
              </Typography>
            </div>

            {/* Development Services Card */}
            <div
              style={{
                padding: theme.spacing.l,
                backgroundColor: theme.palette.neutralLighterAlt,
                borderRadius: theme.borderRadius.m,
                border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
              }}
            >
              <Typography
                variant='h3'
                style={{
                  color: theme.palette.themePrimary,
                  fontSize: '1.25rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                  marginBottom: theme.spacing.m,
                }}
              >
                Web Development
              </Typography>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  lineHeight: theme.typography.lineHeights.relaxed,
                }}
              >
                Building modern, scalable web applications with cutting-edge
                technologies. From concept to deployment, I deliver solutions
                that drive results.
              </Typography>
            </div>

            {/* Consulting Services Card */}
            <div
              style={{
                padding: theme.spacing.l,
                backgroundColor: theme.palette.neutralLighterAlt,
                borderRadius: theme.borderRadius.m,
                border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
              }}
            >
              <Typography
                variant='h3'
                style={{
                  color: theme.palette.themePrimary,
                  fontSize: '1.25rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                  marginBottom: theme.spacing.m,
                }}
              >
                Strategic Consulting
              </Typography>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  lineHeight: theme.typography.lineHeights.relaxed,
                }}
              >
                Expert guidance on digital transformation, technology strategy,
                and business innovation. Let&apos;s align your vision with
                actionable solutions.
              </Typography>
            </div>

            {/* Tutoring Services Card */}
            <div
              style={{
                padding: theme.spacing.l,
                backgroundColor: theme.palette.neutralLighterAlt,
                borderRadius: theme.borderRadius.m,
                border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
              }}
            >
              <Typography
                variant='h3'
                style={{
                  color: theme.palette.themePrimary,
                  fontSize: '1.25rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                  marginBottom: theme.spacing.m,
                }}
              >
                Training & Mentorship
              </Typography>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  lineHeight: theme.typography.lineHeights.relaxed,
                }}
              >
                One-on-one tutoring and mentorship in design, development, and
                creative technologies. Empowering the next generation of
                creators.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </SimplePageWrapper>
  );
}
