import { Project, projectsData } from './projectsData';

export type { Project };

export function loadProjects(): Project[] {
  return projectsData;
}

export function getProjects(): Project[] {
  return projectsData;
}

export const projects = projectsData;
