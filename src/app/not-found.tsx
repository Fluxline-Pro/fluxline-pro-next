'use client';

import React from 'react';
import Link from 'next/link';
import { FxButton } from '@/theme/components/dsm';

const navCards = [
  { title: 'Home', desc: 'Start at the top.', href: '/' },
  { title: 'Services', desc: 'Six modular offerings.', href: '/services' },
  { title: 'Content Hub', desc: 'Blog, podcast, portfolio.', href: '/blog' },
  { title: 'Contact', desc: 'Tell us what you needed.', href: '/contact' },
];

export default function NotFound() {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div
      style={{
        background: 'linear-gradient(160deg,#05070B 0%,#0B1019 55%,#0E1523 100%)',
        color: '#D5DAE3',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
        }}
        aria-hidden="true"
      >
        <g stroke="#5E81A8" strokeWidth="1" opacity=".3">
          <path d="M-40 700 L310 520 L520 720 L780 580 L1060 740 L1290 540 L1460 640" fill="none" />
          <path d="M180 -40 L420 180 L700 70 L960 240 L1240 100 L1440 220" fill="none" />
          <path d="M310 520 L420 180 M780 580 L700 70" fill="none" opacity=".5" strokeDasharray="6 8" />
          <path d="M1060 740 L1240 100" fill="none" opacity=".35" strokeDasharray="3 10" />
        </g>
        <g fill="#9FB6D4">
          <circle cx="310" cy="520" r="3.5">
            <animate attributeName="opacity" values=".2;.85;.2" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="700" cy="70" r="3">
            <animate attributeName="opacity" values=".2;.85;.2" dur="4s" begin="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="1240" cy="100" r="3.5">
            <animate attributeName="opacity" values=".2;.85;.2" dur="4s" begin="0.7s" repeatCount="indefinite" />
          </circle>
          <circle cx="1060" cy="740" r="2.5">
            <animate attributeName="opacity" values=".2;.85;.2" dur="4s" begin="2.2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 32px',
        }}
      >
        <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: '#8FA8CA',
              marginBottom: 14,
            }}
          >
            Error 404 &middot; Signal Lost
          </div>

          <h1
            style={{
              fontSize: 'clamp(80px, 14vw, 150px)',
              fontWeight: 800,
              letterSpacing: '.04em',
              color: '#FFFFFF',
              margin: '0 0 6px',
              lineHeight: 1,
            }}
          >
            4<span style={{ color: '#5E81A8' }}>0</span>4
          </h1>

          <div
            style={{
              height: 2,
              width: 220,
              margin: '0 auto 26px',
              background: 'linear-gradient(90deg,transparent,#5E81A8,#B8CDF5,#5E81A8,transparent)',
            }}
          />

          <p
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: '#4FD1C5',
              margin: '0 0 10px',
            }}
          >
            This page is out of resonance.
          </p>

          <p
            style={{
              fontSize: 15.5,
              lineHeight: 1.7,
              color: '#98A2B3',
              margin: '0 auto 36px',
              maxWidth: '48ch',
            }}
          >
            The path you followed doesn&apos;t exist here &mdash; it may have moved, or the link may be
            mistyped. Every obstacle becomes the path: here&apos;s where to go instead.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
              textAlign: 'left',
              marginBottom: 30,
            }}
          >
            {navCards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'block',
                  background: '#11161F',
                  border: `1px solid ${hovered === i ? '#5E81A8' : '#232C3D'}`,
                  borderRadius: 12,
                  padding: '16px 18px',
                  textDecoration: 'none',
                  transition: 'border-color .18s, transform .18s',
                  transform: hovered === i ? 'translateY(-2px)' : 'none',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14, color: '#AEC6EE', marginBottom: 3 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 12, color: '#98A2B3', lineHeight: 1.5 }}>{card.desc}</div>
              </Link>
            ))}
          </div>

          <FxButton size="lg" href="/">
            &larr; Take Me Home
          </FxButton>
        </div>
      </div>
    </div>
  );
}
