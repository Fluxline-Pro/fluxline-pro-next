import React from 'react';
import { render, screen } from '@testing-library/react';
import { getFilteredBlogPosts } from '@/app/blog/lib/blogLoader';
import ResonantIdentityDemosPage from './page';

jest.mock('@/app/blog/lib/blogLoader', () => ({
  getFilteredBlogPosts: jest.fn(),
}));

jest.mock('./DemosPageClient', () => ({
  DemosPageClient: ({ posts }: { posts: unknown[] }) => (
    <div data-testid='demos-page-client'>{JSON.stringify(posts)}</div>
  ),
}));

describe('/podcasts/theresonantid/demos page', () => {
  it('loads Resonant Identity interactive demos and passes serialized posts to client', () => {
    (getFilteredBlogPosts as jest.Mock).mockReturnValue([
      {
        slug: 'tri-interactive-resonance-assessment',
        title: 'TRI Interactive Resonance Assessment',
        excerpt: 'Measure identity coherence through a guided assessment.',
        imageUrl: '/blog/posts/tri-interactive-resonance-assessment/images/cover.png',
        imageAlt: 'TRI Interactive Resonance Assessment',
        tags: ['Interactive Demo', 'Identity Coherence'],
        publishedDate: new Date('2026-01-12T00:00:00.000Z'),
        featured: true,
      },
    ]);

    render(ResonantIdentityDemosPage());

    expect(getFilteredBlogPosts).toHaveBeenCalledWith({
      category: 'Resonant Identity',
      tag: 'Interactive Demo',
    });

    expect(screen.getByTestId('demos-page-client')).toHaveTextContent(
      JSON.stringify([
        {
          slug: 'tri-interactive-resonance-assessment',
          title: 'TRI Interactive Resonance Assessment',
          excerpt: 'Measure identity coherence through a guided assessment.',
          imageUrl:
            '/blog/posts/tri-interactive-resonance-assessment/images/cover.png',
          imageAlt: 'TRI Interactive Resonance Assessment',
          tags: ['Interactive Demo', 'Identity Coherence'],
          publishedDate: '2026-01-12T00:00:00.000Z',
          featured: true,
        },
      ])
    );
  });
});
