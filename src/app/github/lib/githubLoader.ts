import { GitHubRepo } from '../types';

const GITHUB_ORGS = ['fluxline-pro'];
const GITHUB_USERS = ['aplusandminus'];

/**
 * Fetch repositories from a single GitHub organization.
 */
async function fetchOrgRepos(orgName: string): Promise<GitHubRepo[]> {
  try {
    const url = `https://api.github.com/orgs/${orgName}/repos?per_page=100&sort=updated`;
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      // Cache for 15 minutes where supported (ISR-compatible environments)
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      console.warn(
        `GitHub API returned ${response.status} for org ${orgName}: ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();
    return data as GitHubRepo[];
  } catch (error) {
    console.error(
      `Failed to fetch GitHub repositories for org ${orgName}:`,
      error
    );
    return [];
  }
}

/**
 * Fetch repositories from a single GitHub user.
 */
async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      // Cache for 15 minutes where supported (ISR-compatible environments)
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      console.warn(
        `GitHub API returned ${response.status} for user ${username}: ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();
    return data as GitHubRepo[];
  } catch (error) {
    console.error(
      `Failed to fetch GitHub repositories for user ${username}:`,
      error
    );
    return [];
  }
}

/**
 * Fetch all public repositories from multiple GitHub organizations and users.
 * Fetches from fluxline-pro org and aplusandminus user in parallel.
 * Runs at build time for static export; returns empty array on failure.
 */
export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    // Fetch from all organizations and users in parallel
    const orgRepoPromises = GITHUB_ORGS.map((org) => fetchOrgRepos(org));
    const userRepoPromises = GITHUB_USERS.map((user) => fetchUserRepos(user));

    const repoArrays = await Promise.all([
      ...orgRepoPromises,
      ...userRepoPromises,
    ]);

    // Flatten and merge all repos
    const allRepos = repoArrays.flat();

    // Sort by updated_at descending (most recently updated first)
    return allRepos.sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime();
      const dateB = new Date(b.updated_at).getTime();
      return dateB - dateA;
    });
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
