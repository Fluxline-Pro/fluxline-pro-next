'use client';

/**
 * TeamMemberModal Component
 * Displays detailed team member information in a modal
 */

import React from 'react';
import Image from 'next/image';
import { Modal } from '@/components/Modal';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { TeamMember } from './TeamMemberCard';
import { SocialLinks } from './SocialLinks';

interface TeamMemberModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  member: TeamMember;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  isOpen,
  onDismiss,
  member,
}) => {
  const { theme } = useAppTheme();
  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      ariaLabel={`${member.name} - Team Member Details`}
      maxWidth='900px'
    >
      {/* Header with photo and info */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.l,
          marginBottom: theme.spacing.l,
          flexWrap: 'wrap',
        }}
      >
        {/* Photo */}
        <div
          style={{
            position: 'relative',
            flexShrink: 0,
            width: '200px',
            height: '200px',
            borderRadius: theme.borderRadius.container.medium,
            overflow: 'hidden',
            backgroundColor: theme.palette.neutralLighter,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
              sizes='200px'
            />
          ) : (
            <FluentIcon
              iconName='ContactCard'
              size='xLarge'
              color={theme.palette.neutralTertiary}
            />
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <Typography
            variant='h3'
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.s1,
            }}
          >
            {member.name}
          </Typography>

          <Typography
            variant='p'
            style={{
              color: theme.palette.themeSecondary,
              fontWeight: theme.typography.fontWeights.semiBold,
              fontSize: '1.125rem',
              fontStyle: 'italic',
              marginBottom: theme.spacing.m,
            }}
          >
            {member.role}
          </Typography>

          {/* Social Links */}
          {member.socialLinks && (
            <div style={{ marginTop: theme.spacing.m }}>
              <SocialLinks
                socialLinks={member.socialLinks}
                name={member.name}
                size='medium'
              />
            </div>
          )}
        </div>
      </div>

      {/* Bio section */}
      <div
        style={{
          padding: theme.spacing.m,
          backgroundColor: isDark
            ? theme.palette.neutralLighterAlt
            : theme.palette.neutralQuaternaryAlt,
          borderLeft: `4px solid ${theme.palette.themePrimary}`,
          borderRadius: theme.borderRadius.container.small,
          marginBottom: theme.spacing.l,
        }}
      >
        <Typography
          variant='h4'
          style={{
            color: theme.palette.themePrimary,
            marginBottom: theme.spacing.s2,
          }}
        >
          About
        </Typography>
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralPrimary,
            lineHeight: theme.typography.lineHeights.relaxed,
          }}
        >
          {member.bio}
        </Typography>
      </div>
    </Modal>
  );
};

export default TeamMemberModal;
