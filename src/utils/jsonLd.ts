/**
 * JSON-LD Utilities
 * Safe serialization for structured data to prevent XSS vulnerabilities
 */

/**
 * Safely serialize JSON-LD for inline script tags
 * Escapes HTML-significant characters to prevent XSS via script tag breakout
 *
 * @param obj - The JSON-LD schema object to serialize
 * @returns Safely escaped JSON string for use in dangerouslySetInnerHTML
 *
 * @example
 * ```tsx
 * <Script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(schema) }}
 * />
 * ```
 */
export function safeJsonLdStringify(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
