'use client';

/**
 * About Page
 * Information about Fluxline and the company mission
 */

import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import FxStatCard from '@/theme/components/dsm/FxStatCard';
import FxCard from '@/theme/components/dsm/FxCard';
import { TeamMemberCard } from './components/TeamMemberCard';
import { CompanyTimeline } from './components/CompanyTimeline';
import {
  TEAM_MEMBERS,
  COMPANY_STATISTICS,
  COMPANY_TIMELINE,
  COMPANY_VALUES,
} from './constants';

export default function AboutPage() {
  return (
    <FxContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--fx-section-gap)',
        }}
      >
        {/* Hero Section */}
        <section>
          <FxSectionHeading
            as='h1'
            kicker='About'
            title='About Fluxline'
            subhead='Systems that work. Brands that connect. Practices that last.'
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--fx-text-gap)',
              marginTop: 'var(--fx-block-gap)',
            }}
          >
            <p
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                lineHeight: 1.45,
                color: 'var(--fx-text-body)',
                margin: 0,
              }}
            >
              Fluxline exists to create alignment where it matters most: within
              individuals, across organizations, and between brands and their
              audiences. We believe that congruence—the alignment of intention,
              action, and structure—creates momentum that compounds over time.
            </p>
            <p
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                lineHeight: 1.6,
                color: 'var(--fx-text-body)',
                margin: 0,
              }}
            >
              Our work integrates somatic awareness, strategic clarity, and
              technical precision. We partner with visionary leaders and
              forward-thinking organizations who understand that transformation
              is structural—it requires changes to how bodies move, how brands
              communicate, and how systems operate.
            </p>
            <p
              style={{
                fontSize: 'var(--fx-body-size)',
                lineHeight: 'var(--fx-body-leading)',
                color: 'var(--fx-text-body)',
                margin: 0,
              }}
            >
              We help individuals and businesses build with clarity and purpose.
              Our work spans development, design, coaching, and strategy —
              blending technical precision with emotional intelligence to create
              systems, brands, and practices that truly work.
            </p>
            <p
              style={{
                fontSize: 'var(--fx-body-size)',
                lineHeight: 'var(--fx-body-leading)',
                color: 'var(--fx-text-body)',
                margin: 0,
              }}
            >
              We build systems that integrate emotional intelligence, financial
              clarity, and physical discipline — empowering individuals and
              brands to work with purpose and precision.
            </p>
          </div>
        </section>

        {/* Company Statistics */}
        <section>
          <FxSectionHeading title='Our Impact' />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
              marginTop: 'var(--fx-block-gap)',
            }}
          >
            {COMPANY_STATISTICS.map((stat) => (
              <FxStatCard key={stat.id} value={stat.value} label={stat.label} />
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section>
          <FxSectionHeading title='Our Mission & Vision' />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--fx-text-gap)',
              marginTop: 'var(--fx-block-gap)',
            }}
          >
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: 1.45,
                color: 'var(--fx-text-body)',
                margin: 0,
              }}
            >
              Fluxline envisions a world where individuals and businesses become
              intentional stewards of their growth — where identity is clarified
              through practice, reflection, and continuous improvement.
            </p>
          </div>
        </section>

        {/* Company Values */}
        <section>
          <FxSectionHeading title='Our Values' />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
              marginTop: 'var(--fx-block-gap)',
            }}
          >
            {COMPANY_VALUES.map((value) => (
              <FxCard key={value.id} interactive>
                <h3
                  style={{
                    fontSize: 'var(--fx-h3-size)',
                    fontWeight: 'var(--fx-h3-weight)' as unknown as number,
                    color: 'var(--fx-text-heading)',
                    margin: '0 0 8px',
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--fx-body-size)',
                    lineHeight: 'var(--fx-body-leading)',
                    color: 'var(--fx-text-muted)',
                    margin: 0,
                  }}
                >
                  {value.description}
                </p>
              </FxCard>
            ))}
          </div>
        </section>

        {/* Journey & Team */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--fx-section-gap)',
            flexWrap: 'wrap',
          }}
        >
          {/* Company Timeline */}
          <section style={{ flex: '1 1 400px', minWidth: 0 }}>
            <FxSectionHeading title='Our Journey' />
            <div style={{ marginTop: 'var(--fx-block-gap)' }}>
              <CompanyTimeline events={COMPANY_TIMELINE} />
            </div>
          </section>

          {/* Team Section */}
          <section style={{ flex: '1 1 400px', minWidth: 0 }}>
            <FxSectionHeading title='Our Team' />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: 400,
                marginTop: 'var(--fx-block-gap)',
              }}
            >
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} style={{ maxWidth: 400, width: '100%' }}>
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Fluxline Ethos Callout */}
        <FxCallout tone='gold' title='Discover the Fluxline Ethos'>
          Modular by design. Resonant by nature. Learn more about our
          philosophy, mission, and the service framework that guides everything
          we do at Fluxline.
        </FxCallout>

        {/* Content Navigation Callout -- move back under "Our Values" once testimonials is added back -TW */}
        <FxCallout tone='info' title="See what we've been working on!">
          Review case studies, client work, and upcoming announcements.
        </FxCallout>

        {/* CTA Band */}
        <FxCTABand
          title='Ready to Build Something Extraordinary?'
          body='Explore our philosophy or get in touch to start your journey with Fluxline.'
          primaryLabel='Explore Our Philosophy'
          primaryHref='/fluxline-ethos'
          secondaryLabel='Explore Our Content'
          secondaryHref='/content'
        />
      </div>
    </FxContainer>
  );
}
