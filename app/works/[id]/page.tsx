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

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-start gap-10">
      {/* Hero Image (Thumbnail) */}
      {project.image && (
        <div 
          className="w-full relative aspect-[4/3] overflow-hidden rounded-none border border-zinc-200/50 dark:border-zinc-800/80 shadow-md flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/50"
          style={project.bgColor ? { backgroundColor: project.bgColor } : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.image} 
            alt={`${project.title} Cover`} 
            className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-[1.01]" 
          />
        </div>
      )}



      {/* Hero Header */}
      <div className="w-full flex flex-col gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        {project.date && (
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
            {project.date}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h1>
        
        {/* Tags */}
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
      </div>

      {/* Main Content Layout */}
      <div className="w-full grid gap-10 lg:grid-cols-3">
        {/* Left 2 Columns: Description, Concept, Procedure */}
        <div className="lg:col-span-2 flex flex-col gap-10">

          
          {/* Introduction */}
          {project.introduction && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                概要 / Introduction
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                {project.introduction}
              </p>
            </div>
          )}

          {/* Detailed Description */}
          {!project.introduction && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                説明 / Description
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </div>
          )}

          {/* Concept */}
          {project.concept && (
            <div className="p-6 rounded-none bg-zinc-100/50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                コンセプト / Concept
              </h2>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.concept}
              </p>
            </div>
          )}

          {/* Procedure / System steps */}
          {project.procedure && project.procedure.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                制作プロセス・機能詳細 / Process & Features
              </h2>
              <ol className="relative border-l border-zinc-200 dark:border-zinc-800 pl-6 space-y-8">
                {project.procedure.map((step, idx) => {
                  const [title, desc] = step.split("：");
                  return (
                    <li key={idx} className="relative">
                      <span className="absolute -left-9 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-800 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
                        {idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                        {title}
                      </h3>
                      {desc && (
                        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {desc}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Outcome */}
          {project.outcome && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                成果と今後の展望 / Outcome
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                {project.outcome}
              </p>
            </div>
          )}
        </div>

        {/* Right 1 Column: Meta Details & Image Gallery */}
        <div className="flex flex-col gap-10">
          
          {/* Metadata Block (Role, System) */}
          <div className="p-6 rounded-none border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 flex flex-col gap-6">
            
            {/* Role */}
            {project.role && (
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
                  担当役割 / Role
                </span>
                <p className="text-xs text-zinc-800 dark:text-zinc-300 font-medium">
                  {project.role}
                </p>
              </div>
            )}

            {/* System Specs */}
            {project.system && (
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1.5">
                  システム環境 / System Specifications
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-mono">
                  {project.system}
                </p>
              </div>
            )}
          </div>

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-4">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                作品ギャラリー / Gallery
              </span>
              <div className="flex flex-col gap-4">
                {project.images.map((imgSrc, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-full overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 shadow-sm bg-zinc-100 dark:bg-zinc-800/50"
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

          {/* References / Survey */}
          {project.survey && project.survey.length > 0 && (
            <div className="space-y-3">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                参考文献・インスピレーション / References
              </span>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                {project.survey.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
