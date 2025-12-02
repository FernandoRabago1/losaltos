/**
 * Migration Script: Update Project Categories
 *
 * This script migrates existing project typologies to the new standardized categories:
 * - industrial
 * - residencial
 * - comercial
 * - arte
 *
 * Migration rules:
 * 1. Projects with 'Industrial' tag → typology = 'industrial'
 * 2. 'uso mixto' → 'comercial' (mixed-use is commercial)
 * 3. 'renovación' → Keep existing if residencial/comercial, else 'residencial'
 * 4. 'paisaje' → 'arte' (landscape is artistic)
 * 5. Already correct categories → No change
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MigrationResult {
  projectId: string;
  title: string;
  oldTypology: string;
  newTypology: string;
  reason: string;
}

async function migrateCategories() {
  console.log('🚀 Starting category migration...\n');

  const results: MigrationResult[] = [];
  let errorCount = 0;

  try {
    // Fetch all projects
    const projects = await prisma.project.findMany();
    console.log(`📊 Found ${projects.length} projects to check\n`);

    for (const project of projects) {
      const oldTypology = project.typology;
      let newTypology = oldTypology;
      let reason = 'No change needed';
      let shouldUpdate = false;

      // Parse tags if they exist
      const tags = project.tags ? JSON.parse(project.tags) : [];

      // Migration Logic

      // Rule 1: Projects with 'Industrial' tag get 'industrial' typology
      if (tags.includes('Industrial')) {
        newTypology = 'industrial';
        reason = "Has 'Industrial' tag";
        shouldUpdate = true;
      }
      // Rule 2: 'uso mixto' becomes 'comercial'
      else if (oldTypology === 'uso mixto') {
        newTypology = 'comercial';
        reason = "Mixed-use → Commercial";
        shouldUpdate = true;
      }
      // Rule 3: 'renovación' - check context
      else if (oldTypology === 'renovación') {
        // Check tags for context
        if (tags.includes('Comercial')) {
          newTypology = 'comercial';
          reason = "Renovation with commercial context";
        } else if (tags.includes('Residencial')) {
          newTypology = 'residencial';
          reason = "Renovation with residential context";
        } else {
          newTypology = 'residencial';
          reason = "Renovation → Default to residential";
        }
        shouldUpdate = true;
      }
      // Rule 4: 'paisaje' becomes 'arte'
      else if (oldTypology === 'paisaje') {
        newTypology = 'arte';
        reason = "Landscape → Art";
        shouldUpdate = true;
      }
      // Check if already using correct categories
      else if (!['industrial', 'residencial', 'comercial', 'arte'].includes(oldTypology)) {
        newTypology = 'residencial';
        reason = `Unknown typology '${oldTypology}' → Default to residential`;
        shouldUpdate = true;
      }

      // Update project if needed
      if (shouldUpdate) {
        try {
          await prisma.project.update({
            where: { id: project.id },
            data: { typology: newTypology },
          });

          results.push({
            projectId: project.id,
            title: project.title,
            oldTypology,
            newTypology,
            reason,
          });

          console.log(`✅ Updated: "${project.title}"`);
          console.log(`   ${oldTypology} → ${newTypology} (${reason})\n`);
        } catch (error) {
          console.error(`❌ Error updating project "${project.title}":`, error);
          errorCount++;
        }
      } else {
        console.log(`⏭️  Skipped: "${project.title}" (already correct: ${oldTypology})`);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total projects checked: ${projects.length}`);
    console.log(`Projects updated: ${results.length}`);
    console.log(`Projects skipped: ${projects.length - results.length}`);
    console.log(`Errors: ${errorCount}\n`);

    if (results.length > 0) {
      console.log('Updated Projects:');
      console.log('-'.repeat(60));
      results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.title}`);
        console.log(`   ${result.oldTypology} → ${result.newTypology}`);
        console.log(`   Reason: ${result.reason}\n`);
      });
    }

    console.log('✨ Migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateCategories()
  .then(() => {
    console.log('\n👋 Done! You can now restart your application.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
