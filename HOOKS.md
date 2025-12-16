# Hooks Documentation

This document provides comprehensive documentation for all custom React hooks in the Fluxline Pro Next.js application.

## Table of Contents

- [Utility Hooks](#utility-hooks)
- [Browser API Hooks](#browser-api-hooks)
- [Interaction Hooks](#interaction-hooks)
- [Animation Hooks](#animation-hooks)
- [Theme Hooks](#theme-hooks)
- [Best Practices](#best-practices)

---

## Utility Hooks

### useDebounce

Debounces a value by delaying its update until after a specified delay. Useful for optimizing performance of expensive operations like API calls or search.

**Usage:**

```tsx
import { useDebounce } from '@/hooks';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    // This will only run 300ms after the user stops typing
    if (debouncedSearchTerm) {
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**Parameters:**
- `value: T` - The value to debounce
- `delay: number` - Delay in milliseconds (default: 500ms)

**Returns:** The debounced value

---

### useThrottle

Throttles a callback function, ensuring it's called at most once per specified interval. Useful for rate-limiting expensive operations like scroll handlers or resize listeners.

**Usage:**
```tsx
import { useThrottle } from '@/hooks';

function ScrollComponent() {
  const handleScroll = useThrottle(() => {
    console.log('Scroll position:', window.scrollY);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <div>Content</div>;
}
```

**Parameters:**
- `callback: T` - The function to throttle
- `delay: number` - Minimum time between calls in milliseconds (default: 500ms)

**Returns:** The throttled function

---

### useToggle

Manages a boolean state with toggle, setTrue, and setFalse functions. Useful for modals, dropdowns, and other UI components with open/closed states.

**Usage:**
```tsx
import { useToggle } from '@/hooks';

function ModalExample() {
  const [isOpen, toggle, open, close] = useToggle();

  return (
    <>
      <button onClick={toggle}>Toggle Modal</button>
      <button onClick={open}>Open Modal</button>
      <button onClick={close}>Close Modal</button>
      {isOpen && <Modal onClose={close}>Content</Modal>}
    </>
  );
}
```

**Parameters:**
- `initialValue: boolean` - Initial boolean value (default: false)

**Returns:** `[value, toggle, setTrue, setFalse]`

---

### usePrevious

Returns the previous value of a state or prop. Useful for comparing current and previous values in effects.

**Usage:**
```tsx
import { usePrevious } from '@/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (prevCount !== undefined) {
      console.log(`Count changed from ${prevCount} to ${count}`);
    }
  }, [count, prevCount]);

  return (
    <div>
      <p>Current: {count}, Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Parameters:**
- `value: T` - The value to track

**Returns:** The previous value or `undefined`

---

## Browser API Hooks

### useClickOutside

Detects clicks outside of a referenced element. Useful for closing dropdowns, modals, and popovers when clicking outside.

**Usage:**
```tsx
import { useClickOutside } from '@/hooks';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>Dropdown Content</div>}
    </div>
  );
}
```

**Parameters:**
- `callback: () => void` - Function to call when a click outside is detected

**Returns:** `React.RefObject<T>` to attach to the element

---

### useKeyPress

Listens for specific keyboard key presses. Useful for keyboard shortcuts and accessibility features.

**Usage:**
```tsx
import { useKeyPress } from '@/hooks';

function KeyboardShortcuts() {
  useKeyPress('Escape', () => {
    closeModal();
  });

  useKeyPress('Enter', () => {
    submitForm();
  }, { ctrl: true }); // Only trigger when Ctrl+Enter is pressed

  return <div>Press Escape or Ctrl+Enter</div>;
}
```

**Parameters:**
- `targetKey: string` - The key to listen for (e.g., 'Escape', 'Enter')
- `callback: (event: KeyboardEvent) => void` - Function to call when the key is pressed
- `options?: { ctrl?, shift?, alt?, meta? }` - Optional modifier keys

---

### useScrollPosition

Returns the current scroll position of the window. Useful for implementing scroll-based animations and effects.

**Usage:**
```tsx
import { useScrollPosition } from '@/hooks';

function ScrollIndicator() {
  const { scrollY } = useScrollPosition(100); // Throttled to 100ms

  return (
    <div
      style={{
        opacity: scrollY > 100 ? 0.5 : 1,
        transition: 'opacity 0.3s'
      }}
    >
      Content fades when scrolled past 100px
    </div>
  );
}
```

**Parameters:**
- `throttleMs: number` - Throttle delay in milliseconds (default: 100ms)

**Returns:** `{ scrollX: number, scrollY: number }`

---

### useLocalStorage

Manages state synchronized with localStorage. Handles SSR gracefully and updates across browser tabs.

**Usage:**
```tsx
import { useLocalStorage } from '@/hooks';

function ThemeSelector() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme (current: {theme})
      </button>
      <button onClick={removeTheme}>Reset Theme</button>
    </div>
  );
}
```

**Parameters:**
- `key: string` - The localStorage key
- `initialValue: T` - Initial value if key doesn't exist

**Returns:** `[value, setValue, removeValue]`

**Note:** Uses `useSyncExternalStore` for SSR safety. Returns initial value on server, syncs with localStorage on client.

---

### useSessionStorage

Manages state synchronized with sessionStorage. Similar to useLocalStorage but doesn't sync across tabs.

**Usage:**
```tsx
import { useSessionStorage } from '@/hooks';

function FormDraft() {
  const [formData, setFormData, clearFormData] = useSessionStorage('formDraft', {});

  return (
    <form>
      <input
        value={formData.name || ''}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="button" onClick={clearFormData}>Clear Draft</button>
    </form>
  );
}
```

**Parameters:**
- `key: string` - The sessionStorage key
- `initialValue: T` - Initial value if key doesn't exist

**Returns:** `[value, setValue, removeValue]`

---

## Interaction Hooks

### useHoverState

Manages hover state for a single element with focus support. Returns hover state and props to spread on the element.

**Usage:**
```tsx
import { useHoverState } from '@/hooks';

function HoverableCard() {
  const [isHovered, hoverProps] = useHoverState();

  return (
    <div {...hoverProps} style={{ opacity: isHovered ? 1 : 0.7 }}>
      Hover me!
    </div>
  );
}
```

**Parameters:**
- `initialState: boolean` - Initial hover state (default: false)

**Returns:** `[isHovered, hoverProps]`

---

### useMultiHoverState

Manages hover state for multiple items by ID. Tracks which item is currently hovered.

**Usage:**
```tsx
import { useMultiHoverState } from '@/hooks';

function CardList() {
  const { isHovered, getHoverProps } = useMultiHoverState();

  return (
    <div>
      {items.map(item => (
        <div
          key={item.id}
          {...getHoverProps(item.id)}
          style={{ background: isHovered(item.id) ? 'blue' : 'gray' }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

**Returns:** `{ isHovered: (id: string) => boolean, getHoverProps: (id: string) => props }`

---

## Animation Hooks

### useIntersectionObserver

Tracks element visibility using Intersection Observer API. Useful for lazy loading, scroll animations, and analytics.

**Usage:**
```tsx
import { useIntersectionObserver } from '@/hooks';

function LazyImage() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.5,
    freezeOnceVisible: true
  });

  return (
    <div ref={ref} className={isVisible ? 'fade-in' : 'fade-out'}>
      {isVisible && <img src="image.jpg" alt="Lazy loaded" />}
    </div>
  );
}
```

**Parameters:**
- `options: UseIntersectionObserverOptions` - Intersection observer options
  - `threshold?: number | number[]` - Visibility threshold (0-1)
  - `root?: Element | null` - Root element for observation
  - `rootMargin?: string` - Margin around root
  - `freezeOnceVisible?: boolean` - Stop observing after first intersection

**Returns:** `[ref, isIntersecting, entry]`

---

## Theme Hooks

### useAppTheme

Gets the current Fluent UI theme and theme mode. Already migrated from the React app.

**Usage:**
```tsx
import { useAppTheme } from '@/theme/hooks';

function ThemedComponent() {
  const { theme, isDark } = useAppTheme();

  return (
    <div style={{ 
      backgroundColor: theme.palette.white,
      color: theme.palette.neutralPrimary 
    }}>
      Current mode: {isDark ? 'dark' : 'light'}
    </div>
  );
}
```

---

### useMediaQuery

Checks if a media query matches. Supports responsive breakpoints and custom queries.

**Usage:**
```tsx
import { useMediaQuery, useIsMobile, useIsDesktop } from '@/theme/hooks';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const isLarge = useMediaQuery('lg', 'greater-than-or-equal');

  return (
    <div>
      {isMobile && <MobileLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
}
```

---

### useReducedMotion

Detects user's reduced motion preference. Use to disable animations for accessibility.

**Usage:**
```tsx
import { useReducedMotion } from '@/theme/hooks';

function AnimatedComponent() {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

---

## Best Practices

### SSR Compatibility

All hooks are designed to be SSR-safe. However, keep these guidelines in mind:

1. **Browser APIs**: Hooks that access `window`, `document`, or browser storage should only be used in Client Components (`'use client'`).

2. **useLocalStorage/useSessionStorage**: These use `useSyncExternalStore` and return initial values on the server, syncing with storage on the client.

3. **useMediaQuery**: Returns `false` on the server and syncs on the client.

### Performance Optimization

1. **Debounce**: Use `useDebounce` for search inputs and expensive computations.

2. **Throttle**: Use `useThrottle` for scroll and resize handlers.

3. **Intersection Observer**: Use `useIntersectionObserver` with `freezeOnceVisible: true` for one-time animations.

### Accessibility

1. **useKeyPress**: Always provide keyboard alternatives for mouse interactions.

2. **useReducedMotion**: Respect user preferences for reduced motion.

3. **useClickOutside**: Ensure focus management when closing modals/dropdowns.

### Type Safety

All hooks are fully typed with TypeScript. Use generic parameters where available:

```tsx
const ref = useClickOutside<HTMLDivElement>(() => close());
const [ref, isVisible] = useIntersectionObserver<HTMLImageElement>();
```

---

## Migration Notes

These hooks were migrated from the React app with the following adaptations:

1. All hooks are Client Components (`'use client'` directive)
2. React Router hooks removed (use Next.js navigation instead)
3. Browser API access moved to `useEffect`
4. `useSyncExternalStore` used for localStorage/sessionStorage
5. TypeScript strict mode compliance

For page-specific hooks (like useDocumentTitle), use Next.js Metadata API instead.

---

Last updated: November 3, 2025
