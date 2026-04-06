import Script from 'next/script';

/**
 * Podcasts Section Layout
 * Loads the Spreaker widget script once for all podcast pages.
 * The widget script scans for .spreaker-player anchor elements and
 * replaces them with embedded audio player iframes.
 */
export default function PodcastsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Spreaker widget script - loads once for the podcasts section */}
      <Script
        src='https://widget.spreaker.com/widgets.js'
        strategy='lazyOnload'
      />
    </>
  );
}
