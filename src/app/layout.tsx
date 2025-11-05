import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './tailwind.css'; // ← Tailwind base/utilities first
import './globals.scss'; // ← Your custom styles override Tailwind
import ThemeProvider from '../theme/contexts/ThemeProvider';

// Load Inter font with variable support
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
    <html lang='en' className={inter.variable}>
      <body className='antialiased' suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
