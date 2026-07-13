'use client';

import React from 'react';
import type { ServiceCategory } from '../../constants';

/**
 * ServiceFeatures Component
 * Key features and benefits section
 */
export const ServiceFeatures: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  // Define features based on service type
  const getFeatures = (serviceId: string): string[] => {
    const featuresMap: Record<string, string[]> = {
      consulting: [
        'Strategic systems design and operational optimization',
        'Modular frameworks for scalable growth',
        'Tech integration and infrastructure planning',
        'Business soul alignment and values-driven strategy',
      ],
      development: [
        'Custom web applications and digital platforms',
        'Intuitive UX and resilient infrastructure',
        'CI/CD pipelines and cloud architecture',
        'Full-stack development with long-term maintainability',
      ],
      design: [
        'Visual identity and brand architecture',
        'Digital experience design',
        'Modular design systems',
        'Symbolic and emotionally resonant design',
      ],
      'personal-training': [
        'Personalized fitness and wellness coaching',
        'Adaptive training systems for all bodies',
        'Movement patterns and chronic pain management',
        'Emotional intelligence in physical transformation',
        'Mindset support and behavioral change strategies',
        'Flexible scheduling and remote coaching options',
      ],
      'education-training': [
        'Experiential learning and leadership workshops',
        'Emotional intelligence development',
        'Strategic embodiment coaching',
        'Team leadership and influence cultivation',
      ],
      'resonance-core': [
        'Understand the signals your body and emotions send',
        "Reveal the stories you've been living inside",
        'Name the outdated identities shaping your choices',
        'Update your internal predictions and interpretations',
        "Choose the identity that supports who you're becoming",
        'Take aligned action from your chosen identity',
      ],
    };

    return featuresMap[serviceId] || [];
  };

  const features = getFeatures(service.id);

  if (features.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2
        style={{
          color: 'var(--fx-accent)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 600,
        }}
      >
        What We Offer
      </h2>

      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              borderRadius: 8,
              backgroundColor: 'transparent',
              border: '1px solid var(--fx-border)',
            }}
          >
            <span
              style={{
                color: 'var(--fx-accent)',
                fontSize: '1.25rem',
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              &#10003;
            </span>
            <p
              style={{
                color: 'var(--fx-text-body)',
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
