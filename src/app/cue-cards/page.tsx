'use client';

/**
 * Cue Cards Archive Page
 * Hidden archive page accessible via LinkTree or direct link
 * Contains modular "cue cards" summarizing key archetypes, mantras, and actions
 */

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxButton from '@/theme/components/dsm/FxButton';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import { BookingsButton } from '@/theme/components/button/bookings-button';
import { CueCardsGrid } from './components/CueCardsGrid';
import { getAllCueCards, getFeaturedCueCards } from './cueCardsData';

export default function CueCardsPage() {
  const allCards = getAllCueCards();
  const featuredCards = getFeaturedCueCards();

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
        {/* Hero Section */}
        <div>
          <FxSectionHeading
            title="The Archetypes"
            subhead="Explore the mythic curriculum through these cue cards. Each archetype represents a pathway of transformation—a mantra to anchor your energy, an action to embody, and an emotional frame to guide your journey."
            as="h1"
          />
          <div style={{ marginTop: 32 }}>
            <FxCallout tone="gold" title="Portals to Transformation">
              <p
                style={{
                  color: 'var(--fx-text-body)',
                  fontSize: 'var(--fx-body-size)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Modular wisdom for your evolution—each card a stepping stone on the path.
              </p>
            </FxCallout>
          </div>
        </div>

        {/* Featured Archetypes Section */}
        {featuredCards.length > 0 && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2
              style={{
                color: 'var(--fx-accent)',
                fontSize: 'var(--fx-h2-size)',
                fontWeight: 700,
                margin: 0,
              }}
            >
              Featured Archetypes
            </h2>
            <p
              style={{
                color: 'var(--fx-text-body)',
                fontSize: '1.125rem',
                lineHeight: 1.7,
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Begin your exploration with these foundational archetypes—each one
              a doorway into deeper work.
            </p>
            <CueCardsGrid cards={featuredCards} />
          </section>
        )}

        {/* All Archetypes Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2
            style={{
              color: 'var(--fx-accent)',
              fontSize: 'var(--fx-h2-size)',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Complete Archive
          </h2>
          <p
            style={{
              color: 'var(--fx-text-body)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
              marginBottom: 20,
              marginTop: 0,
            }}
          >
            The full collection of archetypes—find the one that speaks to your
            current phase.
          </p>
          <CueCardsGrid cards={allCards} />
        </section>

        {/* Call to Action */}
        <section>
          <FxCTABand
            title="Ready to Embody Your Archetype?"
            body="Each archetype is a map, not a territory. Let Fluxline guide you in translating these mythic frames into practical transformation."
            primaryLabel="Explore Our Services"
            primaryHref="/services"
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <BookingsButton isHero />
          </div>
        </section>
      </div>
    </FxContainer>
  );
}
