// Simple SVG placeholder generator for development
export const createPlaceholderSVG = (
  width: number,
  height: number,
  text: string,
  bgColor = '#f0f0f0',
  textColor = '#666'
) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
      ${text}
    </text>
  </svg>`;

  // Use Buffer for Node.js environment or btoa for browser
  const encoded =
    typeof window !== 'undefined'
      ? btoa(svg)
      : Buffer.from(svg).toString('base64');

  return `data:image/svg+xml;base64,${encoded}`;
};
