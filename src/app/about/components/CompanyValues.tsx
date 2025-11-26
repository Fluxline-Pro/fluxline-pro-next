/**
 * CompanyValues Component
 * Displays company values with icons
 */

import React from 'react';

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CompanyValuesProps {
  values: CompanyValue[];
}

export const CompanyValues: React.FC<CompanyValuesProps> = ({ values }) => {
  // This component is currently unused as values are displayed using InteractiveCard
  // in the About page, but the type is exported for use in constants
  return null;
};
