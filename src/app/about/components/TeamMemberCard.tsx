'use client';

/**
 * TeamMemberCard Component
 * Displays individual team member information
 */

import React from 'react';
import Image from 'next/image';
import { FluentIcon } from '@/theme/components/fluent-icon';
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
          borderRadius: 12,
          border: `1px solid ${
            isHovered
              ? 'var(--fx-accent)'
              : 'var(--fx-border)'
          }`,
          backgroundColor: isHovered
            ? 'var(--fx-surface-card)'
            : 'transparent',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
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
            borderRadius: 8,
            backgroundColor: 'var(--fx-surface-card)',
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
              color='var(--fx-text-muted)'
            />
          )}
        </div>

        {/* Name and Role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <h3
            style={{
              color: 'var(--fx-accent)',
              fontSize: '1.75rem',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {member.name}
          </h3>

          <p
            style={{
              color: 'var(--fx-accent)',
              fontSize: '0.875rem',
              fontWeight: 500,
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {member.role}
          </p>

          <p
            style={{
              color: 'var(--fx-text-body)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {member.bio}
          </p>
        </div>

        {/* Social Links */}
        {member.socialLinks && (
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--fx-border)',
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
