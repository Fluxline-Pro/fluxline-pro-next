'use client';

/**
 * ValueCard Component
 * Displays company values using the InteractiveCard component
 */

import React from 'react';
import { InteractiveCard } from '@/components';

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ValueCardProps {
  value: CompanyValue;
}

export const ValueCard: React.FC<ValueCardProps> = ({ value }) => {
  return (
    <InteractiveCard
      id={value.id}
      title={value.title}
      description={value.description}
      icon={value.icon}
      iconPosition='center'
    />
  );
};

export default ValueCard;
