'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isProjectDetail = pathname.startsWith('/works/') && pathname !== '/works';

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-50/75 dark:bg-zinc-950/75 backdrop-blur-md border-b border-zinc-200/40 dark:border-zinc-800/40 transition-colors duration-300">
      <div className="w-full max-w-full mx-auto px-6 h-16 flex justify-between items-center">
        {isProjectDetail ? (
          <Link 
            href="/works" 
            className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-brand transition-colors cursor-pointer"
          >
            <svg 
              className="h-4 w-4 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Works</span>
          </Link>
        ) : (
          <Link 
            href="/" 
            className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50 hover:text-brand transition-colors"
          >
            rin_nonokawa
          </Link>
        )}
        
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/works" className={`hover:text-brand transition-colors ${pathname === '/works' ? 'text-brand' : ''}`}>
            Works
          </Link>
          <Link href="/" className={`hover:text-brand transition-colors ${pathname === '/' ? 'text-brand' : ''}`}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
