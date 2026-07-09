'use client';

import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
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

  // Get unique user owners (exclude organizations for contributions graph)
  const userOwners = React.useMemo(() => {
    const users = new Set<string>();
    repos.forEach((repo) => {
      if (repo.owner?.login && repo.owner?.type === 'User') {
        users.add(repo.owner.login);
      }
    });
    return Array.from(users).sort();
  }, [repos]);

  // Filter repos by selected language
  const filteredRepos = React.useMemo(() => {
    if (!selectedLanguage) return repos;
    return repos.filter((repo) => repo.language === selectedLanguage);
  }, [repos, selectedLanguage]);

  // Transform repos to card format expected by ContentListingPage
  const cards = React.useMemo(() => {
    return filteredRepos.map((repo) => ({
      id: repo.full_name,
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
      date: repo.updated_at ? new Date(repo.updated_at) : undefined,
      category: repo.language ?? undefined,
    }));
  }, [filteredRepos]);

  // Build a lookup map so onCardClick can open the correct URL
  const repoUrlMap = React.useMemo(() => {
    const map = new Map<string, string>();
    repos.forEach((repo) => map.set(repo.full_name, repo.html_url));
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

  // Configure filters
  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Language',
      options: [
        { key: '', text: 'All' },
        ...allLanguages.map((lang) => ({ key: lang, text: lang })),
      ],
      value: selectedLanguage,
      onChange: setSelectedLanguage,
    },
  ];

  // GitHub contributions graph (only for user accounts, not organizations)
  const contributionsSection = React.useMemo(() => {
    if (userOwners.length === 0) return null;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: 20,
          backgroundColor: 'var(--fx-surface-card)',
          borderRadius: 8,
          border: '1px solid var(--fx-border)',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 'var(--fx-h3-size)',
            fontWeight: 600,
            color: 'var(--fx-text-heading)',
            fontFamily: 'var(--fx-font)',
          }}
        >
          GitHub Contributions
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {userOwners.map((owner) => (
            <div
              key={owner}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <p
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  color: 'var(--fx-accent)',
                  margin: 0,
                  fontFamily: 'var(--fx-font)',
                }}
              >
                {owner}
              </p>
              <Image
                src={`https://ghchart.rshah.org/${owner}`}
                alt={`${owner} GitHub contributions`}
                width={800}
                height={150}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    );
  }, [userOwners]);

  return (
    <ContentListingPage
      title="GitHub Repositories"
      kicker="Open Source"
      subhead="Code, tools, and contributions."
      description="Explore open-source projects, code samples, and technical resources from the Fluxline development team."
      basePath="/github"
      cards={cards}
      filters={filters}
      emptyStateTitle="No repositories found"
      emptyStateMessage={
        selectedLanguage
          ? 'Try adjusting your filters to see more repositories.'
          : 'Check back soon for new repositories.'
      }
      onCardClick={handleCardClick}
      customSection={contributionsSection}
      onClearFilters={() => setSelectedLanguage(undefined)}
    />
  );
}
