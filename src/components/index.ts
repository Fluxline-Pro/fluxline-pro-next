/**
 * Components Export
 * Central export for all reusable components
 */

export { UnifiedPageWrapper } from './UnifiedPageWrapper';
export { UnifiedContentDetail } from './UnifiedContentDetail';
export type { UnifiedContentDetailConfig } from './UnifiedContentDetail';
export { ContentNotFound } from './ContentNotFound';
export { InteractiveCard } from './InteractiveCard';
export type { InteractiveCardProps } from './InteractiveCard';
export { Modal } from './Modal';
export type { ModalProps } from './Modal';
export { ImageCarouselModal } from './ImageCarouselModal';
export type {
  ImageCarouselModalProps,
  CarouselImage,
} from './ImageCarouselModal';
export { ContentListingPage } from './ContentListingPage';
export type {
  ContentCard,
  SingleSelectFilter,
  MultiSelectFilter,
  FilterConfig,
  ContentListingPageProps,
} from './ContentListingPage';
export { AccessGate } from './AccessGate';
export { NewsletterCTA } from './NewsletterCTA';
export { NewsletterPopup } from './NewsletterPopup';
export { ConsultationStepper } from './ConsultationStepper';
export type {
  ConsultationStepperProps,
  LeadPayload,
  ServiceKey,
} from './ConsultationStepper';
// Old TRI components - deprecated, moved to page-specific components
// export {
//   TRILayout,
//   SectionHeader,
//   ContentSection,
//   LargeTileGrid,
//   FeaturedCard,
//   TagChip,
//   HeroSimple,
//   HeroWithFilters,
//   FilteredContentList,
// } from './tri';
// export type {
//   TRILayoutProps,
//   SectionHeaderProps,
//   ContentSectionProps,
//   LargeTileGridProps,
//   FeaturedCardProps,
//   TagChipProps,
//   HeroSimpleProps,
//   HeroWithFiltersProps,
//   FilteredContentListProps,
// } from './tri';
