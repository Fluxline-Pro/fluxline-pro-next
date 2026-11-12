'use client';

/**
 * Scrolls Overview Page
 * Main listing page for all strategic insights and white papers
 */

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxButton from '@/theme/components/dsm/FxButton';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import { ScrollsGrid } from './components/ScrollsGrid';
import { getAllScrolls } from './scrollsData';

export default function ScrollsPage() {
  const scrolls = getAllScrolls();

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
        {/* Hero Section */}
        <div>
          <FxSectionHeading
            title="Explore the Scrolls"
            subhead="Access our comprehensive collection of strategic insights and frameworks. Each scroll offers deep-dive guidance on transforming your business, craft, or personal practice with intentionality and resonance."
            as="h1"
          />
          <div style={{ marginTop: 32 }}>
            <FxCallout tone="gold" title="Gates to Transformation">
              <p
                style={{
                  color: 'var(--fx-text-body)',
                  fontSize: 'var(--fx-body-size)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Curricula for your evolution—frameworks designed for sustainable growth.
              </p>
            </FxCallout>
          </div>
        </div>

        {/* Scrolls Grid Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2
            style={{
              color: 'var(--fx-accent)',
              fontSize: 'var(--fx-h2-size)',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Strategic Insights Library
          </h2>
          <ScrollsGrid scrolls={scrolls} />
        </section>

        {/* Call to Action */}
        <FxCTABand
          title="Ready to Transform?"
          body="Explore the insights that resonate with your current phase and discover how our services can support your transformational journey."
          primaryLabel="Explore Our Services"
          primaryHref="/services"
        />
      </div>
    </FxContainer>
  );
}
