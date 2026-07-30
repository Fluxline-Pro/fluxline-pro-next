import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import RootLayout from './layout';

jest.mock('./providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('next/script', () => {
  return function MockNextScript(
    props: React.ScriptHTMLAttributes<HTMLScriptElement>
  ) {
    return <script {...props} />;
  };
});

describe('RootLayout', () => {
  it('includes the Google AdSense script in the shared head', () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <main>Test page</main>
      </RootLayout>
    );

    const adsenseScriptUrl =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7691902367885014';

    expect(html).toContain(adsenseScriptUrl);
    expect(html).toContain('crossorigin="anonymous"');
    expect(html.split(adsenseScriptUrl)).toHaveLength(2);
  });
});
