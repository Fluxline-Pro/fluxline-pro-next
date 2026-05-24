import React from 'react';
import { render, screen } from '@testing-library/react';
import { getAllGroundingDemos } from './lib/groundingDemosLoader';
import GroundingDemosPage from './page';

jest.mock('./lib/groundingDemosLoader', () => ({
  getAllGroundingDemos: jest.fn(),
}));

jest.mock('./GroundingDemosPageClient', () => ({
  GroundingDemosPageClient: ({ posts }: { posts: unknown[] }) => (
    <div data-testid='grounding-demos-page-client'>{JSON.stringify(posts)}</div>
  ),
}));

describe('/blog/resonant-identity/demos page', () => {
  it('loads grounding demos and passes serialized posts to the client wrapper', () => {
    (getAllGroundingDemos as jest.Mock).mockReturnValue([
      {
        slug: 'box-breathing-4-4-4-4',
        title: 'Box Breathing (4–4–4–4)',
        description: 'A guided breathing practice.',
        tags: ['Interactive Demo', 'Grounding'],
        publishedDate: new Date('2026-05-24T00:00:00.000Z'),
        isFeatured: true,
      },
    ]);

    render(GroundingDemosPage());

    expect(getAllGroundingDemos).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('grounding-demos-page-client')).toHaveTextContent(
      JSON.stringify([
        {
          slug: 'box-breathing-4-4-4-4',
          title: 'Box Breathing (4–4–4–4)',
          excerpt: 'A guided breathing practice.',
          tags: ['Interactive Demo', 'Grounding'],
          publishedDate: '2026-05-24T00:00:00.000Z',
          featured: true,
        },
      ])
    );
  });
});
