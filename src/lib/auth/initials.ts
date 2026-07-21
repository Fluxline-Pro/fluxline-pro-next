/**
 * Derive up-to-two-character initials for the avatar circle from a display
 * name, falling back to the email address. Pure logic — unit tested in
 * `initials.test.ts`.
 */
export function getInitials(
  displayName?: string | null,
  email?: string | null
): string {
  const name = (displayName || '').trim();

  // A display name that is actually an email address should use email rules.
  if (name && !name.includes('@')) {
    const parts = name
      .split(/\s+/)
      .map((part) => part.replace(/[^\p{L}\p{N}]/gu, ''))
      .filter(Boolean);

    if (parts.length >= 2) {
      return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
  }

  const mail = (name.includes('@') ? name : email || '').trim();
  if (mail) {
    const localPart = mail.split('@')[0].replace(/[^\p{L}\p{N}]/gu, '');
    if (localPart) return localPart.slice(0, 2).toUpperCase();
  }

  return '?';
}
