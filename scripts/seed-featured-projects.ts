import { prisma } from '../lib/db';

async function main() {
  console.log('Starting featured projects seed...');

  // Get all projects
  const projects = await prisma.project.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  if (projects.length === 0) {
    console.log('No projects found. Please seed projects first.');
    return;
  }

  // Clear existing featured projects
  await prisma.featuredProject.deleteMany({});
  console.log('Cleared existing featured projects');

  // Add first 6 projects as featured
  const featuredProjects = await Promise.all(
    projects.map((project, index) =>
      prisma.featuredProject.create({
        data: {
          projectId: project.id,
          order: index,
          enabled: true,
        },
      })
    )
  );

  console.log(`✓ Created ${featuredProjects.length} featured projects`);
  console.log('Featured projects:');
  featuredProjects.forEach((fp, i) => {
    const project = projects.find((p) => p.id === fp.projectId);
    console.log(`  ${i + 1}. ${project?.title}`);
  });
}

main()
  .catch((e) => {
    console.error('Error seeding featured projects:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
