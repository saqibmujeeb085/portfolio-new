import ProjectsSection from "./ProjectsSection";
import { getFeaturedProjects } from "@/lib/sanity/fetch";

export default async function HomeProjectsSection() {
  // Fetch featured projects
  const projects = await getFeaturedProjects();

  return (
    
      <ProjectsSection projects={projects} />
    
  );
}