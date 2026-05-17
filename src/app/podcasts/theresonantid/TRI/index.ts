// TRI Scaffolding Components - Reusable components for all TRI pages
export { TRILayout } from './TRILayout';
export type { TRILayoutProps } from './TRILayout';

export { HeroSimple } from './HeroSimple';
export type { HeroSimpleProps } from './HeroSimple';

export { SectionHeader } from './SectionHeader';
export type { SectionHeaderProps } from './SectionHeader';

export { ContentSection } from './ContentSection';
export type { ContentSectionProps } from './ContentSection';

export { CardGrid } from './CardGrid';
export type { CardGridProps, CardGridItem } from './CardGrid';

export { FilteredContentList } from './FilteredContentList';
export type { FilteredContentListProps } from './FilteredContentList';

export { ChallengesFilteredView } from './ChallengesFilteredView';
export type { ChallengesFilteredViewProps } from './ChallengesFilteredView';

export { ArticlesFilteredView } from './ArticlesFilteredView';
export type { ArticlesFilteredViewProps } from './ArticlesFilteredView';

export { EpisodeModal } from './EpisodeModal';
export { useTRILatestEpisode } from './useTRILatestEpisode';

export { Divider } from './Divider';

// /blog is where the content is found under tag "Resonant Identity"
// setup has been placed so if a user hits back on this page, it auto sends them back to TRI library page
// remaining URLs and content lead to /podcasts/theresonantid structure depending on the page
