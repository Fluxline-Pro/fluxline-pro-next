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
import { TeamMemberModal } from './TeamMemberModal';
import { SocialLinks } from './SocialLinks';
import { useColorVisionFilter } from '@/theme';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    threads?: string;
    tiktok?: string;
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { filter } = useColorVisionFilter();

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1.25rem',
          borderRadius: theme.borderRadius.container.medium,
          border: `1px solid ${
            isHovered
              ? theme.palette.themePrimary
              : theme.palette.neutralTertiaryAlt
          }`,
          backgroundColor: isHovered
            ? theme.themeMode === 'dark' ||
              theme.themeMode === 'high-contrast' ||
              theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralLighter
              : theme.palette.neutralLighterAlt
            : 'transparent',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: isHovered ? theme.shadows.m : 'none',
          maxHeight: '600px',
          cursor: 'pointer',
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
                filter: filter,
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
              fontSize: '1.75rem',
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
        {member.socialLinks && (
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
            }}
          >
            <SocialLinks
              socialLinks={member.socialLinks}
              name={member.name}
              size='small'
            />
          </div>
        )}
      </div>

      <TeamMemberModal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        member={member}
      />
    </>
  );
};

export default TeamMemberCard;
