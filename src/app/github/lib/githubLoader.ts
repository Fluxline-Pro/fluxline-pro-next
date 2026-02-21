import { GitHubRepo } from '../types';

const GITHUB_ORGS = ['fluxline-pro'];
const GITHUB_USERS = ['aplusandminus'];

/**
 * Parse GitHub Link header to extract next page URL.
 */
function parseLinkHeader(linkHeader: string | null): string | null {
  if (!linkHeader) return null;

  const links = linkHeader.split(',');
  for (const link of links) {
    const match = link.match(/<([^>]+)>;\s*rel="next"/);
    if (match) return match[1];
  }
  return null;
}

/**
 * Fetch all pages of repositories from a given URL.
 */
async function fetchAllPages(
  initialUrl: string,
  prefix: string
): Promise<GitHubRepo[]> {
  const allRepos: GitHubRepo[] = [];
  let nextUrl: string | null = initialUrl;
  let pageCount = 0;
  const MAX_PAGES = 10; // Safety limit to prevent infinite loops

  try {
    while (nextUrl && pageCount < MAX_PAGES) {
      const response = await fetch(nextUrl, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        // Cache for 15 minutes where supported (ISR-compatible environments)
        next: { revalidate: 900 },
      });

      if (!response.ok) {
        console.warn(
          `GitHub API returned ${response.status} for ${prefix}: ${response.statusText}`
        );
        break;
      }

      const data = await response.json();
      allRepos.push(...(data as GitHubRepo[]));

      // Check for next page in Link header
      const linkHeader = response.headers.get('Link');
      nextUrl = parseLinkHeader(linkHeader);
      pageCount++;
    }

    if (pageCount >= MAX_PAGES) {
      console.warn(`${prefix}: Reached maximum page limit (${MAX_PAGES})`);
    }
  } catch (error) {
    console.error(`Failed to fetch repositories for ${prefix}:`, error);
  }

  return allRepos;
}

/**
 * Fetch repositories from a single GitHub organization.
 * Automatically handles pagination to retrieve all repositories.
 */
async function fetchOrgRepos(orgName: string): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/orgs/${orgName}/repos?per_page=100&sort=updated`;
  return fetchAllPages(url, `org ${orgName}`);
}

/**
 * Fetch repositories from a single GitHub user.
 * Automatically handles pagination to retrieve all repositories.
 */
async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  return fetchAllPages(url, `user ${username}`);
}

/**
 * Fetch all public repositories from multiple GitHub organizations and users.
 * Fetches from fluxline-pro org and aplusandminus user in parallel.
 * Automatically handles pagination to retrieve all repositories (up to 1000 per source).
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
