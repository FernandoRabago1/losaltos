import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialTags = [
  { name: 'Industrial', order: 1 },
  { name: 'Residencial', order: 2 },
  { name: 'Comercial', order: 3 },
  { name: 'Instalación', order: 4 },
  { name: 'Premios', order: 5 },
  { name: 'Producto', order: 6 },
  { name: 'Reutilización Adaptativa', order: 7 },
  { name: 'Equipo', order: 8 },
  { name: 'Bienvenida', order: 9 },
  { name: 'Evento', order: 10 },
  { name: 'Transporte', order: 11 },
  { name: 'Conversación', order: 12 },
];

async function seedTags() {
  try {
    console.log('🏷️  Seeding tags...\n');

    for (const tag of initialTags) {
      const existing = await prisma.tag.findUnique({
        where: { name: tag.name },
      });

      if (existing) {
        console.log(`✓ Tag "${tag.name}" already exists`);
      } else {
        await prisma.tag.create({
          data: tag,
        });
        console.log(`✓ Created tag: ${tag.name}`);
      }
    }

    console.log('\n✅ Tags seeded successfully!\n');
  } catch (error) {
    console.error('Error seeding tags:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedTags();
