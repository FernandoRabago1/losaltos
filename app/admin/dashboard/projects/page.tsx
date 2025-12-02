import { getAllProjects } from '@/lib/actions/projects';
import ProjectsTable from '@/components/admin/ProjectsTable';

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsTable projects={projects} />;
}
