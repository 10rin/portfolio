import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 md:py-24 flex flex-col items-start justify-center gap-10">
      {/* Title */}
  

      {/* Profile Section: Image on Left, Details on Right */}
      <div className="w-full flex flex-col md:flex-row gap-10 items-start">
        {/* Left Column: Image */}
        <div className="w-full md:w-[240px] shrink-0 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <Image
            src="/rin.jpg"
            alt="野々川 凜"
            width={1080}
            height={1440}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Right Column: Profile Details */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="w-full grid gap-6 sm:grid-cols-2">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                氏名 / Name
              </span>
              <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                野々川 凜 <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400 ml-2">Nonokawa Rin</span>
              </p>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                出身 / Origin
              </span>
              <p className="text-base text-zinc-800 dark:text-zinc-300">
                愛知県名古屋市
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                所属 / Affiliation
              </span>
              <p className="text-base text-zinc-800 dark:text-zinc-300 leading-relaxed">
                東京都立大学システムデザイン研究科 <br className="sm:hidden" />
                インダストリアルアート学域 修士1年 インタフェースデザインスタジオ
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                備考 / Achievements
              </span>
              <p className="text-base text-zinc-800 dark:text-zinc-300">
                TMU EntreBloom ビジネスアイデアチャレンジ 2025 ATOMIca&KDDI 賞受賞
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
                リンク / Links
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/10rin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-brand cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.instagram.com/rin_nonokawa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-brand cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
        <Link
          href="/works"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-none bg-zinc-900 px-6 font-medium text-white hover:text-brand dark:bg-zinc-50 dark:text-zinc-900 dark:hover:text-brand"
        >
          <span>See my works</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
