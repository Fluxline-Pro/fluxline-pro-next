'use client';

import { useState } from 'react';

/**
 * Single item hover state hook.
 * Returns hover state and props to spread on the element.
 *
 * @param initialState - Initial hover state (default: false)
 * @returns A tuple of [isHovered, hoverProps]
 *
 * @example
 * ```tsx
 * const [isHovered, hoverProps] = useHoverState();
 *
 * return (
 *   <div {...hoverProps} style={{ opacity: isHovered ? 1 : 0.7 }}>
 *     Hover me
 *   </div>
 * );
 * ```
 */
export const useHoverState = (initialState: boolean = false) => {
  const [isHovered, setIsHovered] = useState(initialState);

  const hoverProps = {
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return [isHovered, hoverProps] as const;
};

/**
 * Multiple items hover state hook.
 * Tracks which item ID is currently hovered.
 *
 * @returns Object with isHovered check function and getHoverProps function
 *
 * @example
 * ```tsx
 * const { isHovered, getHoverProps } = useMultiHoverState();
 *
 * return items.map(item => (
 *   <div
 *     key={item.id}
 *     {...getHoverProps(item.id)}
 *     style={{ background: isHovered(item.id) ? 'blue' : 'gray' }}
 *   >
 *     {item.name}
 *   </div>
 * ));
 * ```
 */
export const useMultiHoverState = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getHoverProps = (id: string) => ({
    onFocus: () => setHoveredId(id),
    onBlur: () => setHoveredId(null),
    onMouseEnter: () => setHoveredId(id),
    onMouseLeave: () => setHoveredId(null),
  });

  const isHovered = (id: string) => hoveredId === id;

  return { isHovered, getHoverProps };
};
