/**
 * Loading State for Scrolls Pages
 */

export default function ScrollsLoading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 32,
        paddingBottom: 32,
      }}
    >
      {/* Header Skeleton */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          animation: 'pulse 2s infinite',
        }}
      >
        <div
          style={{
            height: 48,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 384,
            maxWidth: '100%',
          }}
        />
        <div
          style={{
            height: 24,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: '100%',
            maxWidth: 768,
          }}
        />
        <div
          style={{
            height: 24,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: '75%',
            maxWidth: 672,
          }}
        />
      </div>

      {/* Grid Skeleton */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              padding: 24,
              border: '1px solid var(--fx-border)',
              borderRadius: 12,
              animation: 'pulse 2s infinite',
            }}
          >
            <div
              style={{
                height: 32,
                background: 'var(--fx-surface-inset)',
                borderRadius: 8,
                width: '75%',
              }}
            />
            <div
              style={{
                height: 16,
                background: 'var(--fx-surface-inset)',
                borderRadius: 8,
                width: '100%',
              }}
            />
            <div
              style={{
                height: 16,
                background: 'var(--fx-surface-inset)',
                borderRadius: 8,
                width: '83%',
              }}
            />
            <div
              style={{
                height: 40,
                background: 'var(--fx-surface-inset)',
                borderRadius: 8,
                width: 128,
                marginTop: 16,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
