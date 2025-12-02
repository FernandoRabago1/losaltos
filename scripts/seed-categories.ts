import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    slug: 'industrial',
    name: 'Industrial',
    enabled: true,
    order: 1,
  },
  {
    slug: 'residencial',
    name: 'Residencial',
    enabled: true,
    order: 2,
  },
  {
    slug: 'comercial',
    name: 'Comercial',
    enabled: true,
    order: 3,
  },
  {
    slug: 'arte',
    name: 'Arte',
    enabled: true,
    order: 4,
  },
];

async function seedCategories() {
  try {
    console.log('🌱 Seeding categories...\n');

    for (const category of categories) {
      const existing = await prisma.category.findUnique({
        where: { slug: category.slug },
      });

      if (existing) {
        console.log(`✓ Category "${category.name}" already exists`);
      } else {
        await prisma.category.create({
          data: category,
        });
        console.log(`✓ Created category: ${category.name}`);
      }
    }

    console.log('\n✅ Categories seeded successfully!\n');
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();
