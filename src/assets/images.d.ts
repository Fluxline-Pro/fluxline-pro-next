/**
 * Module declarations for static image imports.
 *
 * Next.js provides `StaticImageData` via `next/image-types/global` (referenced
 * in `next-env.d.ts`), so image imports are objects with `{ src, width, height }`
 * rather than bare strings. These declarations align with that contract.
 *
 * If you add a new image format, mirror the declaration here.
 */

declare module '*.jpg' {
  import type { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  import type { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}

declare module '*.png' {
  import type { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  import type { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}

declare module '*.webp' {
  import type { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}

declare module '*.heic' {
  import type { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}

declare module '*.heif' {
  import type { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}

declare module '*.hevc' {
  import type { StaticImageData } from 'next/image';
  const content: StaticImageData;
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
