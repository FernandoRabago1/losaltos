import { PrismaClient } from '@prisma/client';
import { projects } from '../lib/constants/projects';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create a default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@architecture.com' },
    update: {},
    create: {
      email: 'admin@architecture.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Seed projects from existing constants
  console.log(`📦 Seeding ${projects.length} projects...`);

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        location: project.location,
        year: project.year,
        status: project.status,
        typology: project.typology,
        description: project.description,
        shortDescription: project.shortDescription,
        images: JSON.stringify(project.images),
        featuredImage: project.featuredImage,
        tags: project.tags ? JSON.stringify(project.tags) : null,
        area: project.area || null,
        client: project.client || null,
        team: project.team ? JSON.stringify(project.team) : null,
        featured: project.featured,
      },
      create: {
        id: project.id,
        slug: project.slug,
        title: project.title,
        location: project.location,
        year: project.year,
        status: project.status,
        typology: project.typology,
        description: project.description,
        shortDescription: project.shortDescription,
        images: JSON.stringify(project.images),
        featuredImage: project.featuredImage,
        tags: project.tags ? JSON.stringify(project.tags) : null,
        area: project.area || null,
        client: project.client || null,
        team: project.team ? JSON.stringify(project.team) : null,
        featured: project.featured,
      },
    });
    console.log(`  ✓ ${project.title}`);
  }

  console.log('✅ Seed completed successfully!');
  console.log('\n📝 Default credentials:');
  console.log('   Email: admin@architecture.com');
  console.log('   Password: admin123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
