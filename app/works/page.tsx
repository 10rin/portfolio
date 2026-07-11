import Link from "next/link";
import { getProjects } from "./projects";

export default function Works() {
  const projects = getProjects();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col items-start justify-center gap-10">
      
      {/* Content */}
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Works
        </h1>
      </div>

      {/* Projects List */}
      <div className="grid gap-6 md:grid-cols-4 w-full">
        {projects.map((project, idx) => (
          <Link 
            key={idx}
            href={`/works/${project.id}`}
            className="group flex flex-col p-5 rounded-none border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/20 cursor-pointer"
          >
            {/* Project Image */}
            {project.image && (
              <div 
                className="relative aspect-[4/3] w-full overflow-hidden rounded-none mb-4 shrink-0 shadow-sm border border-zinc-100 dark:border-zinc-900 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/50"
                style={project.bgColor ? { backgroundColor: project.bgColor } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
            )}

            {/* Date and Metadata */}
            {project.date && (
              <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                {project.date}
              </span>
            )}

            {/* Title */}
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-brand leading-snug">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 flex-1">
              {project.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag, tagIdx) => (
                <span 
                  key={tagIdx}
                  className="inline-flex items-center px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 text-[10px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Next Step Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
        <Link
          href="/"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-none bg-zinc-900 px-6 font-medium text-white transition-all hover:bg-brand dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-brand dark:hover:text-white shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <span>Learn more about me</span>
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