import React from 'react';
import { render, screen } from '@testing-library/react';
import { UnifiedContentDetail } from './UnifiedContentDetail';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('react-syntax-highlighter', () => ({
  Prism: () => null,
}));
jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  vscDarkPlus: {},
  vs: {},
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('UnifiedContentDetail', () => {
  it('limits the featured image to one-third of the viewport without cropping it', () => {
    render(
      <UnifiedContentDetail
        config={{
          title: 'Featured content',
          content: '',
          contentType: 'markdown',
          backLink: { url: '/', label: 'Back' },
          imageConfig: {
            source: '/featured-image.jpg',
            alt: 'Featured image',
          },
        }}
      />
    );

    expect(screen.getByAltText('Featured image')).toHaveStyle({
      maxHeight: '33vh',
      objectFit: 'contain',
    });
  });
});
