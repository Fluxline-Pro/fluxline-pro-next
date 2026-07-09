'use client';

/**
 * TeamMemberModal Component
 * Displays detailed team member information in a modal
 */

import React from 'react';
import Image from 'next/image';
import { Modal } from '@/components/Modal';
import { TeamMember } from './TeamMemberCard';
import { SocialLinks } from './SocialLinks';
import { useColorVisionFilter } from '@/theme';

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
  const { filter } = useColorVisionFilter();

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      ariaLabel={`${member.name} - Team Member Details`}
      maxWidth='900px'
      showCloseButton={true}
    >
      {/* Header with photo and info */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '20px',
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
            borderRadius: 'var(--fx-radius-card)',
            overflow: 'hidden',
            backgroundColor: 'var(--fx-surface-card)',
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
                filter: filter,
              }}
              sizes='200px'
            />
          ) : (
            <span
              style={{
                fontSize: '3rem',
                color: 'var(--fx-text-faint)',
              }}
              aria-hidden="true"
            >&#128100;</span>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3
            style={{
              fontSize: 'var(--fx-h3-size)',
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
              marginBottom: '8px',
              marginTop: 0,
            }}
          >
            {member.name}
          </h3>

          <p
            style={{
              color: 'var(--fx-accent)',
              fontWeight: 600,
              fontSize: '1.125rem',
              fontStyle: 'italic',
              marginBottom: '16px',
              marginTop: 0,
            }}
          >
            {member.role}
          </p>

          {/* Social Links */}
          {member.socialLinks && (
            <div style={{ marginTop: '16px' }}>
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
          padding: '16px',
          backgroundColor: 'var(--fx-surface-card)',
          borderLeft: '4px solid var(--fx-accent)',
          borderRadius: '4px',
        }}
      >
        <h4
          style={{
            fontSize: 'var(--fx-h4-size, 1.125rem)',
            fontWeight: 700,
            color: 'var(--fx-accent)',
            marginBottom: '4px',
            marginTop: 0,
          }}
        >
          About
        </h4>
        <p
          style={{
            color: 'var(--fx-text-heading)',
            lineHeight: 1.7,
            fontSize: 'var(--fx-body-size)',
            margin: 0,
          }}
        >
          {member.bio}
        </p>
      </div>
    </Modal>
  );
};

export default TeamMemberModal;
