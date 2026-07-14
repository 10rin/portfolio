import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rin_nonokawa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#cdcdcd] text-zinc-900 dark:bg-[#cdcdcd] dark:text-zinc-900 transition-colors duration-300 font-sans">
        {/* Shared Header/Navbar */}
        <Header />

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Shared Footer */}
        <footer className="w-full max-w-full mx-auto px-6 py-8 border-t border-zinc-200/60 dark:border-zinc-800/60 flex justify-between items-center text-xs text-zinc-500 shrink-0">
          <p>© {new Date().getFullYear()} rin nonokawa</p>
          {/* <div className="flex gap-4">
            <span className="hover:text-brand transition-colors cursor-default">Next.js 16</span>
            <span>•</span>
            <span className="hover:text-brand transition-colors cursor-default">Tailwind CSS v4</span>
          </div> */}
        </footer>
      </body>
    </html>
  );
}
