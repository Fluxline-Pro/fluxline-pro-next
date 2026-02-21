'use client';

import React from 'react';
import { format } from 'date-fns';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import { GitHubRepo } from './types';

interface GitHubClientWrapperProps {
  repos: GitHubRepo[];
  allLanguages: string[];
}

/**
 * GitHub Client Wrapper
 * Handles filtering logic and transforms GitHub repository data for the
 * unified ContentListingPage. Card clicks open the repository in a new tab.
 */
export function GitHubClientWrapper({
  repos,
  allLanguages,
}: GitHubClientWrapperProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState<
    string | undefined
  >();

  // Filter repos by selected language
  const filteredRepos = React.useMemo(() => {
    if (!selectedLanguage) return repos;
    return repos.filter((repo) => repo.language === selectedLanguage);
  }, [repos, selectedLanguage]);

  // Transform repos to card format expected by ContentListingPage
  const cards = React.useMemo(() => {
    return filteredRepos.map((repo) => ({
      id: repo.name,
      title: repo.name,
      description: repo.description ?? '',
      imageAlt: repo.name,
      imageText: [
        repo.language,
        repo.updated_at
          ? `Updated ${format(new Date(repo.updated_at), 'MMM d, yyyy')}`
          : null,
        repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    }));
  }, [filteredRepos]);

  // Build a lookup map so onCardClick can open the correct URL
  const repoUrlMap = React.useMemo(() => {
    const map = new Map<string, string>();
    repos.forEach((repo) => map.set(repo.name, repo.html_url));
    return map;
  }, [repos]);

  // Open the GitHub repository in a new tab
  const handleCardClick = React.useCallback(
    (id: string) => {
      const url = repoUrlMap.get(id);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    [repoUrlMap]
  );

  // Configure language filter
  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Language',
      options: [
        { key: '', text: 'All Languages' },
        ...allLanguages.map((lang) => ({ key: lang, text: lang })),
      ],
      value: selectedLanguage,
      onChange: setSelectedLanguage,
    },
  ];

  const resultsMessage = `Showing ${filteredRepos.length} ${filteredRepos.length === 1 ? 'repository' : 'repositories'}${selectedLanguage ? ` in ${selectedLanguage}` : ''}`;

  return (
    <ContentListingPage
      title='GitHub'
      iconName={getIconForPath('/github') || 'BranchMerge'}
      description='Explore open-source projects, code samples, and technical resources from the Fluxline development team. Click any repository to view it on GitHub.'
      basePath='/github'
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No repositories found'
      emptyStateMessage={
        selectedLanguage
          ? 'Try selecting a different language filter.'
          : 'Check back soon for new repositories.'
      }
      onCardClick={handleCardClick}
    />
  );
}
