'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Typography } from '@/theme/components/typography';
import { PageWrapper } from '@/components/PageWrapper';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import type { PressRelease } from '@/store/mock-data/pressReleaseMock';

interface PressReleaseDetailClientProps {
  pressRelease: PressRelease | undefined;
}

/**
 * Press Release Detail Client Component
 * Handles all client-side interactions and theming
 */
export function PressReleaseDetailClient({
  pressRelease,
}: PressReleaseDetailClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  // Determine if we should use mobile layout
  const isMobileLayout =
    orientation === 'portrait' || orientation === 'tablet-portrait';

  if (!pressRelease) {
    return (
      <PageWrapper>
        <div
          style={{
            padding: theme.spacing.xl,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h2'
            style={{ color: theme.palette.red, marginBottom: theme.spacing.m }}
          >
            Press Release Not Found
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l,
            }}
          >
            The requested press release could not be found.
          </Typography>
          <Link
            href='/press-release'
            style={{
              color: theme.palette.themePrimary,
              textDecoration: 'none',
              padding: `${theme.spacing.s} ${theme.spacing.m}`,
              border: `1px solid ${theme.palette.themePrimary}`,
              borderRadius: theme.effects.roundedCorner4,
              display: 'inline-block',
              transition: 'all 0.2s ease',
            }}
          >
            ← Back to Press Releases
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div
        style={{
          padding: isMobileLayout ? theme.spacing.m : theme.spacing.xl,
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Main Content Layout */}
        <div
          style={{
            display: isMobileLayout ? 'block' : 'grid',
            gridTemplateColumns: isMobileLayout ? '1fr' : '1fr 2fr',
            gap: theme.spacing.xl,
            alignItems: 'start',
          }}
        >
          {/* Left Side - Image */}
          <div
            style={{
              position: isMobileLayout ? 'relative' : 'sticky',
              top: isMobileLayout ? 'auto' : theme.spacing.l,
              marginBottom: isMobileLayout ? theme.spacing.l : 0,
            }}
          >
            <Image
              src={
                pressRelease.imageUrl || '/images/press-release-placeholder.jpg'
              }
              alt={pressRelease.imageAlt || pressRelease.title}
              width={800}
              height={isMobileLayout ? 450 : 600}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: theme.borderRadius.l,
                objectFit: 'cover',
                aspectRatio: isMobileLayout ? '16/9' : '4/3',
              }}
            />
          </div>

          {/* Right Side - Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.m,
            }}
          >
            {/* Header */}
            <header>
              <Typography
                variant='h1'
                style={{
                  color: theme.palette.neutralPrimary,
                  marginBottom: theme.spacing.s,
                  fontSize: isMobileLayout ? '2rem' : '3rem',
                  lineHeight: 1.2,
                }}
              >
                {pressRelease.title}
              </Typography>

              {/* Metadata */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: theme.spacing.s,
                  marginBottom: theme.spacing.l,
                  color: theme.palette.neutralSecondary,
                }}
              >
                <span>{format(pressRelease.date, 'MMMM d, yyyy')}</span>
                {pressRelease.author && (
                  <>
                    <span>•</span>
                    <span>{pressRelease.author}</span>
                  </>
                )}
              </div>

              {/* Subtitle/Description */}
              {(pressRelease.subtitle || pressRelease.description) && (
                <Typography
                  variant='h3'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontWeight: 400,
                    marginBottom: theme.spacing.l,
                    fontSize: '1.2rem',
                  }}
                >
                  {pressRelease.subtitle || pressRelease.description}
                </Typography>
              )}
            </header>

            {/* Content */}
            <div
              style={{
                color: theme.palette.neutralPrimary,
                lineHeight: 1.6,
                fontSize: '1rem',
              }}
            >
              {pressRelease.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: pressRelease.content,
                  }}
                />
              ) : (
                <>
                  <Typography
                    variant='p'
                    style={{ marginBottom: theme.spacing.m }}
                  >
                    This is the full content of the press release.
                  </Typography>
                  <Typography
                    variant='p'
                    style={{ marginBottom: theme.spacing.m }}
                  >
                    Press release content would typically include detailed
                    information about announcements, partnerships, product
                    launches, company news, or other significant developments.
                  </Typography>
                  <Typography variant='p'>
                    The content can contain HTML formatting, images, and other
                    media references to provide a comprehensive view of the news
                    being shared.
                  </Typography>
                </>
              )}
            </div>

            {/* Navigation */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: theme.spacing.xl,
                paddingTop: theme.spacing.l,
                borderTop: `1px solid ${theme.palette.neutralLight}`,
                flexWrap: 'wrap',
                gap: theme.spacing.m,
              }}
            >
              <button
                onClick={() => router.back()}
                style={{
                  backgroundColor: theme.palette.themePrimary,
                  color: theme.palette.white,
                  border: 'none',
                  padding: `${theme.spacing.s} ${theme.spacing.m}`,
                  borderRadius: theme.effects.roundedCorner4,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme.palette.themeDark;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme.palette.themePrimary;
                }}
              >
                ← Go Back
              </button>

              <Link
                href='/press-release'
                style={{
                  color: theme.palette.themePrimary,
                  textDecoration: 'none',
                  padding: `${theme.spacing.s} ${theme.spacing.m}`,
                  border: `1px solid ${theme.palette.themePrimary}`,
                  borderRadius: theme.effects.roundedCorner4,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'transparent',
                }}
              >
                Full Press Release List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
