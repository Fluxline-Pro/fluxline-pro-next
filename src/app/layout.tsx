import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../theme/contexts/ThemeProvider";

export const metadata: Metadata = {
  title: "Fluxline Pro - Business Transformation Platform",
  description: "Strategic precision for modern business transformation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
