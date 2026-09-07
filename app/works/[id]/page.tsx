import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "../projects";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}
function renderTextWithLinks(text: string) {
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [_, linkText, linkUrl] = match;
    parts.push(
      <Link
        key={match.index}
        href={linkUrl}
        className="underline hover:text-brand transition-colors"
      >
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="w-full grid gap-10 md:grid-cols-2 items-start">
        {/* Left Column: Images (Hero & Gallery) */}
        <div className="flex flex-col gap-8">
          {/* Hero Image (Thumbnail) */}
          {project.image && (
            <div 
              className="w-full relative overflow-hidden rounded-none border border-zinc-200/50 dark:border-zinc-800/80 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/50"
              style={project.bgColor ? { backgroundColor: project.bgColor } : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={project.image} 
                alt={`${project.title} Cover`} 
                className="w-full h-auto block" 
              />
            </div>
          )}

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                {project.images.map((imgSrc, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-full overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-800/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imgSrc} 
                      alt={`${project.title} screenshot ${idx + 1}`} 
                      className="w-full h-auto block" 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Text Content */}
        <div className="flex flex-col gap-8">
          {/* Hero Header */}
          <div className="w-full flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            {project.date && (
              <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                {project.date}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {project.title}
            </h1>
            {/* link*/}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xl font-medium text-brand hover:underline"            >
                Visit Website
              </a>
            )}

          </div>

          {/* Tags
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}

          {/* overview */}
          {project.description && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                overview
              </h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                {renderTextWithLinks(project.description)}
              </p>
            </div>
          )}

          {/* Concept */}
          {project.concept && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                concept
              </h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                {project.concept}
              </p>
            </div>
          )}
          
          {/* Content */}
          {project.content && (
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                content
              </h2>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                {project.content}
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
