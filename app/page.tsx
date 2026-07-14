import Link from "next/link";
import { getProjects } from "./works/projects";

export default function Home() {
  const projects = getProjects();

  return (
    <main className="flex-1 w-full max-w-full mx-auto px-6 py-12 md:py-24 flex flex-col items-start justify-center gap-10">
      

      {/* Projects List */}
      <div className="grid md:grid-cols-3 gap-0 w-full">
        {projects.map((project, idx) => (
          <Link 
            key={idx}
            href={`/works/${project.id}`}
            className="group flex flex-col p-0 rounded-none"
          >
            {/* Project Image */}
            {project.image && (
              <div 
                className="relative aspect-[4/3] p-3 w-full overflow-hidden shrink-0 border border-zinc-100 dark:border-zinc-900 flex items-center justify-center  hover:bg-pink-500"

                style={project.bgColor ? { backgroundColor: project.bgColor } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="max-h-full max-w-full object-contain" 
                />
                {/* Hover overlay with pink background and title */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-lg px-4 text-center">
                    {project.title}
                  </span>
                </div>
              </div>
            )}

          </Link>
        ))}
      </div>



    </main>
  );
}
