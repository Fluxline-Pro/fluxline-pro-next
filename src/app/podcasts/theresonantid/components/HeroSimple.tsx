'use client';

import React from 'react';
import { Hero } from '@/theme/components/hero/Hero';
import { FadeUp } from '@/animations/fade-animations';

export interface HeroSimpleProps {
  title: string;
  subtitle?: string;
  backArrow?: boolean;
  backArrowPath?: string;
  animationDelay?: number;
}

/**
 * HeroSimple - Hero component wrapper for TRI pages
 * Provides consistent hero styling with optional back arrow navigation
 */
export function HeroSimple({
  title,
  subtitle,
  backArrow,
  backArrowPath,
  animationDelay = 0,
}: HeroSimpleProps) {
  return (
    <FadeUp delay={animationDelay}>
      <Hero
        title={title}
        subtitle={subtitle}
        backArrow={backArrow}
        backArrowPath={backArrowPath}
      />
    </FadeUp>
  );
}
