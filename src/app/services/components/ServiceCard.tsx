'use client';

/**
 * ServiceCard Component
 * Displays a service offering with icon, title, and description
 */

import React from 'react';
import Link from 'next/link';
import type { ServiceCategory } from '../constants';

interface ServiceCardProps {
  service: ServiceCategory;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      href={service.path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        borderRadius: 'var(--fx-radius-card)',
        border: '1px solid var(--fx-border)',
        backgroundColor: 'transparent',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 4px 16px rgba(0, 0, 0, 0.12)'
          : 'none',
        opacity: isHovered ? 1 : 0.9,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <h3
          style={{
            color: 'var(--fx-accent)',
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            fontWeight: 600,
          }}
        >
          {service.title}
        </h3>
      </div>

      <p
        style={{
          color: 'var(--fx-text-muted)',
          fontSize: '1rem',
          lineHeight: 1.65,
        }}
      >
        {service.description}
      </p>

      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            color: 'var(--fx-text-soft)',
            fontSize: '0.875rem',
            fontWeight: 500,
            opacity: isHovered ? 1 : 0.7,
            transition: 'opacity 0.2s ease',
          }}
        >
          Learn more
        </span>
        <span
          style={{
            color: 'var(--fx-text-soft)',
            opacity: isHovered ? 1 : 0.7,
            transition: 'all 0.2s ease',
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            display: 'inline-block',
          }}
        >
          &#8250;
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
