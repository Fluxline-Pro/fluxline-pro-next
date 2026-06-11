/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

require('ts-node/register/transpile-only');

const { buildSlugMap } = require('../src/utils/slug.ts');

const REPO_ROOT = path.resolve(__dirname, '..');
const BLOG_POSTS_DIRECTORY = path.join(REPO_ROOT, 'public', 'blog', 'posts');
const PORTFOLIO_POSTS_DIRECTORY = path.join(
  REPO_ROOT,
  'public',
  'portfolio',
  'posts'
);

function readFrontmatter(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .map((slug) => path.join(directory, slug, 'markdown', 'post.md'))
    .filter((markdownPath) => fs.existsSync(markdownPath))
    .map((markdownPath) => matter(fs.readFileSync(markdownPath, 'utf8')).data);
}

function uniqueSorted(values) {
  return Array.from(
    new Set(
      values.filter(
        (value) => typeof value === 'string' && value.trim().length > 0
      )
    )
  ).sort();
}

function collectAllTaxonomy() {
  const blogFrontmatter = readFrontmatter(BLOG_POSTS_DIRECTORY);
  const portfolioFrontmatter = readFrontmatter(PORTFOLIO_POSTS_DIRECTORY);

  return [
    {
      section: 'blog/tag',
      names: uniqueSorted(blogFrontmatter.flatMap((entry) => entry.tags ?? [])),
    },
    {
      section: 'blog/category',
      names: uniqueSorted(blogFrontmatter.map((entry) => entry.category)),
    },
    {
      section: 'portfolio/tag',
      names: uniqueSorted(
        portfolioFrontmatter.flatMap((entry) => entry.tags ?? [])
      ),
    },
    {
      section: 'portfolio/technology',
      names: uniqueSorted(
        portfolioFrontmatter.flatMap((entry) => entry.technologies ?? [])
      ),
    },
  ];
}

function main() {
  const baseConfig = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, 'staticwebapp.config.json'), 'utf8')
  );

  const legacyRoutes = collectAllTaxonomy().flatMap(({ section, names }) =>
    Array.from(buildSlugMap(names).entries()).flatMap(([slug, name]) =>
      slug === name
        ? []
        : [
            {
              route: `/${section}/${name}/`,
              redirect: `/${section}/${slug}/`,
              statusCode: 301,
            },
          ]
    )
  );

  const mergedConfig = {
    ...baseConfig,
    routes: [...legacyRoutes, ...(baseConfig.routes ?? [])],
  };

  fs.writeFileSync(
    path.join(REPO_ROOT, 'out', 'staticwebapp.config.json'),
    JSON.stringify(mergedConfig, null, 2)
  );

  console.log(
    `Wrote ${legacyRoutes.length} legacy taxonomy redirects to out/staticwebapp.config.json`
  );
}

main();
