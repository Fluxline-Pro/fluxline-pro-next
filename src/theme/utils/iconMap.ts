/**
 * Icon name to emoji/glyph mapping utility
 * Maps Fluent UI icon names and other identifiers to appropriate Unicode glyphs
 * Used in form components and FluentIcon wrapper for theme-agnostic icon rendering
 */

export const iconMap: Record<string, string> = {
  // Theme & Appearance
  Contrast: '◐',
  Light: '☀️',
  Dark: '🌙',
  Lightbulb: '💡',

  // Motion & Animation
  Motion: '✨',
  Play: '▶️',
  Pause: '⏸️',

  // Text & Font
  FontSize: '𝐀',
  TextBold: '𝗕',
  TextItalic: '𝘐',

  // Layout & Navigation
  SidePanel: '⊠',
  FullScreen: '⛶',
  Menu: '☰',
  ChevronLeft: '◀',
  ChevronRight: '▶',
  ChevronUp: '▲',
  ChevronDown: '▼',
  Cancel: '✕',
  Close: '✕',
  X: '✕',

  // Actions
  Settings: '⚙️',
  Edit: '✏️',
  Delete: '🗑️',
  Trash: '🗑️',
  Search: '🔍',
  Filter: '⧋',

  // Communication
  Mail: '✉️',
  Link: '🔗',
  Share: '⤢',

  // Status
  Success: '✓',
  CheckMark: '✓',
  Warning: '⚠️',
  Error: '✕',
  ErrorBadge: '✕',
  Info: 'ⓘ',
};

/**
 * Convert an icon name to its emoji/glyph representation
 * Falls back to the original name if no mapping exists
 * Useful for transitioning from Fluent UI icons to unicode glyphs
 *
 * @param iconName - The icon name or identifier
 * @returns The emoji/glyph character, or the original name if not found
 *
 * @example
 * getIconGlyph('Contrast') // Returns '◐'
 * getIconGlyph('Unknown') // Returns 'Unknown'
 */
export const getIconGlyph = (iconName: string | undefined): string => {
  if (!iconName) return '';
  return iconMap[iconName] || iconName;
};
