import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticlesOfConversionClient from './ArticlesOfConversionClient';

describe('ArticlesOfConversionClient', () => {
  it('previews and provides downloads for both conversion documents', () => {
    const { container } = render(<ArticlesOfConversionClient />);

    const documents = [
      {
        title: 'Articles of Conversion',
        url: '/assets/legal/articles-of-conversion.pdf',
        fileName: 'Fluxline-Articles-of-Conversion.pdf',
      },
      {
        title: 'Statement of Conversion',
        url: '/assets/legal/state-conversion.pdf',
        fileName: 'Fluxline-Statement-of-Conversion.pdf',
      },
    ];

    documents.forEach(({ title, url, fileName }) => {
      expect(
        screen.getByRole('heading', { name: title, level: 5 })
      ).toBeInTheDocument();

      const preview = container.querySelector(
        `object[data="${url}"]`
      );
      expect(preview).toHaveAttribute('type', 'application/pdf');

      expect(
        screen.getByRole('link', { name: `Download ${title} PDF` })
      ).toHaveAttribute('href', url);
      expect(
        screen.getByRole('link', { name: `Download ${title} PDF` })
      ).toHaveAttribute('download', fileName);
    });
  });
});
