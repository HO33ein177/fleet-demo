// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // <- make sure this file exists (Tailwind uses it)

export const metadata: Metadata = {
  title: "Fleet Demo",
  description: "Fleet dashboard demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // change dir="rtl" if you want Persian/RTL layout
    <html lang="en" dir="ltr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
