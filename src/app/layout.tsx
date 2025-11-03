import type { Metadata } from 'next';

import './tailwind.css'; // ← Tailwind base/utilities first
import './globals.scss'; // ← Your custom styles override Tailwind
import ThemeProvider from '../theme/contexts/ThemeProvider';

export const metadata: Metadata = {
  title: 'Fluxline Pro - Business Transformation Platform',
  description: 'Strategic precision for modern business transformation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased' suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
