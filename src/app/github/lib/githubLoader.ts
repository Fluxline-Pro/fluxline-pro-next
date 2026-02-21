import { GitHubRepo } from '../types';

const GITHUB_ORG = 'fluxline-pro';
const GITHUB_API_URL = `https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&sort=updated`;

/**
 * Fetch all public repositories for the Fluxline GitHub organization.
 * Runs at build time for static export; returns empty array on failure.
 */
export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      // Cache for 15 minutes where supported (ISR-compatible environments)
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      console.warn(
        `GitHub API returned ${response.status}: ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();
    return data as GitHubRepo[];
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
    return [];
  }
}

/**
 * Extract all unique languages from a list of repositories.
 */
export function getAllLanguages(repos: GitHubRepo[]): string[] {
  const langs = new Set<string>();
  repos.forEach((repo) => {
    if (repo.language) langs.add(repo.language);
  });
  return Array.from(langs).sort();
}
