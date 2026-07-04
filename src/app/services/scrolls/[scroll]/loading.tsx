/**
 * Loading State for Individual Scroll Detail Page
 */

export default function ScrollDetailLoading() {
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
        maxWidth: 896,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {/* Breadcrumbs Skeleton */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          animation: 'pulse 2s infinite',
        }}
      >
        <div
          style={{
            height: 16,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 80,
          }}
        />
        <div
          style={{
            height: 16,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 80,
          }}
        />
        <div
          style={{
            height: 16,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 128,
          }}
        />
      </div>

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
            height: 24,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 128,
          }}
        />
        <div
          style={{
            height: 48,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: '100%',
            maxWidth: 672,
          }}
        />
        <div
          style={{
            height: 24,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: '100%',
          }}
        />
        <div
          style={{
            height: 24,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: '75%',
          }}
        />
      </div>

      {/* Metadata Skeleton */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          animation: 'pulse 2s infinite',
        }}
      >
        <div
          style={{
            height: 16,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 160,
          }}
        />
        <div
          style={{
            height: 16,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 160,
          }}
        />
      </div>

      {/* Tags Skeleton */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          animation: 'pulse 2s infinite',
        }}
      >
        <div
          style={{
            height: 32,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 96,
          }}
        />
        <div
          style={{
            height: 32,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 128,
          }}
        />
        <div
          style={{
            height: 32,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 112,
          }}
        />
      </div>

      {/* Download Section Skeleton */}
      <div
        style={{
          padding: 24,
          borderRadius: 12,
          border: '1px solid var(--fx-border)',
          animation: 'pulse 2s infinite',
        }}
      >
        <div
          style={{
            height: 24,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 192,
            marginBottom: 16,
          }}
        />
        <div
          style={{
            height: 16,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: '100%',
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: 16,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: '75%',
            marginBottom: 24,
          }}
        />
        <div
          style={{
            height: 48,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
            width: 192,
          }}
        />
      </div>
    </div>
  );
}
