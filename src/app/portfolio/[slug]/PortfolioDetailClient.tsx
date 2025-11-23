'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { PortfolioProject } from '../types';
import { IconButton } from '@fluentui/react';

interface PortfolioDetailClientProps {
  project: PortfolioProject;
}

/**
 * Portfolio Detail Client Component
 * Renders the full portfolio project page with MDX content
 */
export default function PortfolioDetailClient({
  project,
}: PortfolioDetailClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  if (!project) {
    return (
      <UnifiedPageWrapper layoutType='responsive-grid'>
        <div
          style={{
            padding: theme.spacing.xl,
            textAlign: 'center',
          }}
        >
          <Typography variant='h1' style={{ color: theme.palette.themePrimary }}>
            Project Not Found
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginTop: theme.spacing.m,
            }}
          >
            The portfolio project you&apos;re looking for doesn&apos;t exist.
          </Typography>
          <button
            onClick={() => router.push('/portfolio')}
            style={{
              marginTop: theme.spacing.l,
              padding: `${theme.spacing.s1} ${theme.spacing.l}`,
              backgroundColor: theme.palette.themePrimary,
              color: theme.palette.white,
              border: 'none',
              borderRadius: theme.effects.roundedCorner4,
              fontSize: theme.fonts.medium.fontSize,
              fontWeight: theme.typography.fontWeights.semiBold,
              cursor: 'pointer',
            }}
          >
            Back to Portfolio
          </button>
        </div>
      </UnifiedPageWrapper>
    );
  }

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding:
            orientation === 'portrait' ? theme.spacing.m : theme.spacing.xl,
          width: '100%',
        }}
      >
        {/* Back Button */}
        <div style={{ marginBottom: theme.spacing.m }}>
          <IconButton
            iconProps={{ iconName: 'Back' }}
            title='Back to Portfolio'
            ariaLabel='Back to Portfolio'
            onClick={() => router.push('/portfolio')}
            styles={{
              root: {
                color: theme.palette.themePrimary,
                fontSize: theme.fonts.medium.fontSize,
              },
              rootHovered: {
                color: theme.palette.themeDark,
                backgroundColor: theme.palette.themeLighterAlt,
              },
            }}
          />
          <button
            onClick={() => router.push('/portfolio')}
            style={{
              marginLeft: theme.spacing.s2,
              padding: `${theme.spacing.s2} ${theme.spacing.m}`,
              backgroundColor: 'transparent',
              color: theme.palette.themePrimary,
              border: 'none',
              fontSize: theme.fonts.medium.fontSize,
              fontWeight: theme.typography.fontWeights.regular,
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.palette.themeDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.palette.themePrimary;
            }}
          >
            Back to Portfolio
          </button>
        </div>

        {/* Project Header */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <Typography
            variant='h1'
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.m,
            }}
          >
            {project.title}
          </Typography>

          <div
            style={{
              display: 'flex',
              flexDirection: orientation === 'portrait' ? 'column' : 'row',
              gap: theme.spacing.m,
              marginBottom: theme.spacing.m,
              color: theme.palette.neutralSecondary,
              fontSize: theme.fonts.medium.fontSize,
            }}
          >
            <div>
              <strong>Role:</strong> {project.role}
            </div>
            {project.client && (
              <div>
                <strong>Client:</strong> {project.client}
              </div>
            )}
            {project.projectDate && (
              <div>
                <strong>Timeline:</strong> {project.projectDate}
              </div>
            )}
          </div>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: theme.fonts.large.fontSize,
              marginBottom: theme.spacing.l,
            }}
          >
            {project.longDescription || project.shortDescription}
          </Typography>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing.s2,
                marginBottom: theme.spacing.m,
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: `${theme.spacing.s2} ${theme.spacing.m}`,
                    backgroundColor: theme.palette.themeLighter,
                    color: theme.palette.themePrimary,
                    borderRadius: theme.effects.roundedCorner4,
                    fontSize: theme.fonts.small.fontSize,
                    fontWeight: theme.typography.fontWeights.semiBold,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing.s2,
              }}
            >
              <strong style={{ marginRight: theme.spacing.s1 }}>
                Technologies:
              </strong>
              {project.technologies.map((tech, index) => (
                <span key={tech} style={{ color: theme.palette.neutralSecondary }}>
                  {tech}
                  {index < project.technologies.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Project Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div
            style={{
              display: 'flex',
              gap: theme.spacing.m,
              marginBottom: theme.spacing.xl,
            }}
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  padding: `${theme.spacing.s1} ${theme.spacing.l}`,
                  backgroundColor: theme.palette.neutralLighter,
                  color: theme.palette.neutralPrimary,
                  textDecoration: 'none',
                  borderRadius: theme.effects.roundedCorner4,
                  fontSize: theme.fonts.medium.fontSize,
                  fontWeight: theme.typography.fontWeights.semiBold,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme.palette.neutralLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme.palette.neutralLighter;
                }}
              >
                View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  padding: `${theme.spacing.s1} ${theme.spacing.l}`,
                  backgroundColor: theme.palette.themePrimary,
                  color: theme.palette.white,
                  textDecoration: 'none',
                  borderRadius: theme.effects.roundedCorner4,
                  fontSize: theme.fonts.medium.fontSize,
                  fontWeight: theme.typography.fontWeights.semiBold,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme.palette.themeDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme.palette.themePrimary;
                }}
              >
                View Live Project
              </a>
            )}
          </div>
        )}

        {/* Project Content (MDX) */}
        <div
          style={{
            color: theme.palette.neutralPrimary,
            lineHeight: 1.6,
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <Typography
                  variant='h1'
                  style={{
                    color: theme.palette.themePrimary,
                    marginTop: theme.spacing.xl,
                    marginBottom: theme.spacing.m,
                  }}
                >
                  {children}
                </Typography>
              ),
              h2: ({ children }) => (
                <Typography
                  variant='h2'
                  style={{
                    color: theme.palette.themePrimary,
                    marginTop: theme.spacing.l,
                    marginBottom: theme.spacing.m,
                  }}
                >
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography
                  variant='h3'
                  style={{
                    color: theme.palette.neutralPrimary,
                    marginTop: theme.spacing.m,
                    marginBottom: theme.spacing.s1,
                  }}
                >
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    marginBottom: theme.spacing.m,
                  }}
                >
                  {children}
                </Typography>
              ),
              ul: ({ children }) => (
                <ul
                  style={{
                    marginBottom: theme.spacing.m,
                    paddingLeft: theme.spacing.l,
                    color: theme.palette.neutralSecondary,
                  }}
                >
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol
                  style={{
                    marginBottom: theme.spacing.m,
                    paddingLeft: theme.spacing.l,
                    color: theme.palette.neutralSecondary,
                  }}
                >
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: `4px solid ${theme.palette.themePrimary}`,
                    paddingLeft: theme.spacing.l,
                    marginLeft: 0,
                    marginBottom: theme.spacing.m,
                    fontStyle: 'italic',
                    color: theme.palette.neutralSecondary,
                  }}
                >
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code
                  style={{
                    backgroundColor: theme.palette.neutralLighter,
                    padding: `2px ${theme.spacing.s2}`,
                    borderRadius: theme.effects.roundedCorner2,
                    fontSize: theme.fonts.small.fontSize,
                    fontFamily: 'monospace',
                    color: theme.palette.neutralPrimary,
                  }}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre
                  style={{
                    backgroundColor: theme.palette.neutralLighter,
                    padding: theme.spacing.m,
                    borderRadius: theme.effects.roundedCorner4,
                    overflow: 'auto',
                    marginBottom: theme.spacing.m,
                  }}
                >
                  {children}
                </pre>
              ),
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ marginTop: theme.spacing.xxl }}>
            <Typography
              variant='h2'
              style={{
                color: theme.palette.themePrimary,
                marginBottom: theme.spacing.l,
              }}
            >
              Project Gallery
            </Typography>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  orientation === 'portrait'
                    ? '1fr'
                    : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: theme.spacing.l,
              }}
            >
              {project.gallery.map((image, index) => (
                <div key={index}>
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      backgroundColor: theme.palette.neutralLight,
                      borderRadius: theme.effects.roundedCorner4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: theme.spacing.s1,
                    }}
                  >
                    {/* 
                      NOTE: Placeholder for gallery images
                      In production, replace with Next.js Image component:
                      <Image src={image.url} alt={image.alt} fill style={{objectFit: 'cover'}} />
                      Images should be added to /public/images/portfolio/ directory
                    */}
                    <Typography
                      variant='p'
                      style={{ color: theme.palette.neutralTertiary }}
                    >
                      {image.alt}
                    </Typography>
                  </div>
                  {image.caption && (
                    <Typography
                      variant='p'
                      style={{
                        color: theme.palette.neutralSecondary,
                        fontSize: theme.fonts.small.fontSize,
                        fontStyle: 'italic',
                      }}
                    >
                      {image.caption}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div
          style={{
            marginTop: theme.spacing.xxl,
            padding: theme.spacing.xl,
            backgroundColor: theme.palette.neutralLighterAlt,
            borderRadius: theme.effects.roundedCorner6,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h3'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.m,
            }}
          >
            Interested in Working Together?
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l,
            }}
          >
            Let&apos;s discuss how we can help bring your project to life.
          </Typography>
          <button
            onClick={() => router.push('/contact')}
            style={{
              padding: `${theme.spacing.s1} ${theme.spacing.l}`,
              backgroundColor: theme.palette.themePrimary,
              color: theme.palette.white,
              border: 'none',
              borderRadius: theme.effects.roundedCorner4,
              fontSize: theme.fonts.mediumPlus.fontSize,
              fontWeight: theme.typography.fontWeights.semiBold,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.palette.themeDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.palette.themePrimary;
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
