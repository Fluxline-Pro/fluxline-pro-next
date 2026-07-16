/**
 * Podcasts Section Layout
 * Episode playback uses the shared <audio> element owned by
 * PodcastPlayerContext, so no third-party player script is needed here.
 */
export default function PodcastsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
