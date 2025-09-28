// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // <- make sure this file exists (Tailwind uses it)

export const metadata: Metadata = {
  title: "Fleet Demo",
  description: "Fleet dashboard demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="bg-slate-950">
      <body className="min-h-screen bg-transparent font-sans text-slate-100 antialiased">{children}</body>
    </html>
  );
}
