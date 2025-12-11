/**
 * Service Pricing Types
 * Type definitions for service pricing tables and program comparisons
 */

export interface ProgramTier {
  id: string;
  name: string;
  idealFor: string;
  monthlyRate: string;
  rateNote?: string;
}

export interface ProgramFeature {
  name: string;
  description?: string;
}

export interface ProgramComparison {
  [tierKey: string]: boolean | string;
}

export interface ServicePricingData {
  tiers: ProgramTier[];
  features: ProgramFeature[];
  comparison: {
    [featureKey: string]: ProgramComparison;
  };
}

export interface ServicePricing {
  [serviceId: string]: ServicePricingData;
}
