'use client';

/**
 * TeamMemberCard Component
 * Displays individual team member information
 */

import React from 'react';
import Image from 'next/image';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import Link from 'next/link';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { theme } = useAppTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? theme.shadows.m : 'none',
        maxHeight: '600px',
      }}
    >
      {/* Photo Placeholder */}
      <div
        style={{
          width: '100%',
          maxWidth: '350px',
          aspectRatio: '1',
          margin: '0 auto',
          borderRadius: theme.borderRadius.container.small,
          backgroundColor: theme.palette.neutralLighter,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name} - ${member.role}`}
            fill
            style={{
              objectFit: 'cover',
              transform: 'scale(2)',
              translate: '0 30%',
            }}
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          />
        ) : (
          <FluentIcon
            iconName='ContactCard'
            size='xLarge'
            color={theme.palette.neutralTertiary}
          />
        )}
      </div>

      {/* Name and Role */}
      <div className='space-y-2 flex-1'>
        <Typography
          variant='h3'
          style={{
            color: theme.palette.themePrimary,
            fontSize: '1.25rem',
            fontWeight: theme.typography.fontWeights.semiBold,
          }}
        >
          {member.name}
        </Typography>

        <Typography
          variant='p'
          style={{
            color: theme.palette.themeSecondary,
            fontSize: '0.875rem',
            fontWeight: theme.typography.fontWeights.medium,
            fontStyle: 'italic',
          }}
        >
          {member.role}
        </Typography>

        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '0.875rem',
            lineHeight: theme.typography.lineHeights.relaxed,
          }}
        >
          {member.bio}
        </Typography>
      </div>

      {/* Social Links */}
      {member.socialLinks && Object.keys(member.socialLinks).length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
          }}
        >
          {member.socialLinks.linkedin && (
            <Link
              href={member.socialLinks.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: theme.palette.neutralLighter,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.themeLighter;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.neutralLighter;
              }}
              aria-label={`${member.name} on LinkedIn`}
            >
              <FluentIcon
                iconName='LinkedInLogo'
                size='small'
                color={theme.palette.themePrimary}
              />
            </Link>
          )}

          {member.socialLinks.twitter && (
            <Link
              href={member.socialLinks.twitter}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: theme.palette.neutralLighter,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.themeLighter;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.neutralLighter;
              }}
              aria-label={`${member.name} on Twitter`}
            >
              <FluentIcon
                iconName='TwitterLogo'
                size='small'
                color={theme.palette.themePrimary}
              />
            </Link>
          )}

          {member.socialLinks.github && (
            <Link
              href={member.socialLinks.github}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: theme.palette.neutralLighter,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.themeLighter;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.neutralLighter;
              }}
              aria-label={`${member.name} on GitHub`}
            >
              <FluentIcon
                iconName='GitGraph'
                size='small'
                color={theme.palette.themePrimary}
              />
            </Link>
          )}

          {member.socialLinks.email && (
            <Link
              href={`mailto:${member.socialLinks.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: theme.palette.neutralLighter,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.themeLighter;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.neutralLighter;
              }}
              aria-label={`Email ${member.name}`}
            >
              <FluentIcon
                iconName='Mail'
                size='small'
                color={theme.palette.themePrimary}
              />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberCard;
