import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Translation mappings for common project titles
const translations = {
  'Residencia Moderna en las Colinas': {
    en: 'Modern Residence in the Hills',
    zh: '山丘现代住宅',
    ja: '丘の上のモダンレジデンス',
    pt: 'Residência Moderna nas Colinas',
  },
  'Complejo Comercial Centro': {
    en: 'Downtown Commercial Complex',
    zh: '市中心商业综合体',
    ja: 'ダウンタウン商業複合施設',
    pt: 'Complexo Comercial Centro',
  },
  'Parque de Oficinas Sustentable': {
    en: 'Sustainable Office Park',
    zh: '可持续办公园区',
    ja: '持続可能なオフィスパーク',
    pt: 'Parque de Escritórios Sustentável',
  },
  'Residencia de Lujo Frente al Agua': {
    en: 'Luxury Waterfront Estate',
    zh: '豪华滨水住宅',
    ja: '高級ウォーターフロント邸宅',
    pt: 'Residência de Luxo à Beira-Mar',
  },
  'Proyecto de Renovación Urbana': {
    en: 'Urban Renewal Project',
    zh: '城市更新项目',
    ja: '都市再生プロジェクト',
    pt: 'Projeto de Renovação Urbana',
  },
  'Centro Cultural Metropolitano': {
    en: 'Metropolitan Cultural Center',
    zh: '大都会文化中心',
    ja: 'メトロポリタン文化センター',
    pt: 'Centro Cultural Metropolitano',
  },
  'Complejo Industrial Eco-Tecnológico': {
    en: 'Eco-Tech Industrial Complex',
    zh: '生态科技工业园区',
    ja: 'エコテック産業複合施設',
    pt: 'Complexo Industrial Eco-Tecnológico',
  },
  'Residencia Minimalista Costera': {
    en: 'Coastal Minimalist Residence',
    zh: '海岸极简住宅',
    ja: '海岸ミニマリスト邸宅',
    pt: 'Residência Minimalista Costeira',
  },
};

// Description templates
const descriptionTemplates = {
  en: (spanish: string) => {
    // Simple template - in production you'd use proper translation
    return spanish.replace(/proyecto/gi, 'project')
                  .replace(/diseño/gi, 'design')
                  .replace(/arquitectura/gi, 'architecture')
                  .replace(/espacios/gi, 'spaces')
                  .replace(/moderno/gi, 'modern')
                  .replace(/sustentable/gi, 'sustainable');
  },
  zh: () => '这是一个建筑项目的详细描述。该项目展示了现代设计理念与可持续发展的完美结合。',
  ja: () => 'これは建築プロジェクトの詳細な説明です。このプロジェクトは、現代的なデザインと持続可能性の完璧な組み合わせを示しています。',
  pt: (spanish: string) => {
    // Portuguese is similar to Spanish
    return spanish.replace(/proyecto/gi, 'projeto')
                  .replace(/diseño/gi, 'design')
                  .replace(/espacios/gi, 'espaços');
  },
};

async function main() {
  console.log('🌍 Populating project translations...\n');

  const projects = await prisma.project.findMany();

  for (const project of projects) {
    console.log(`📝 Processing: ${project.title}`);

    const locales = ['en', 'zh', 'ja', 'pt'] as const;

    for (const locale of locales) {
      // Get translated title or fallback to original
      const translatedTitle = translations[project.title as keyof typeof translations]?.[locale] || project.title;

      // Generate description based on locale
      let translatedDescription = project.description;
      let translatedShortDescription = project.shortDescription;

      if (locale === 'en') {
        translatedDescription = descriptionTemplates.en(project.description);
        translatedShortDescription = descriptionTemplates.en(project.shortDescription);
      } else if (locale === 'pt') {
        translatedDescription = descriptionTemplates.pt(project.description);
        translatedShortDescription = descriptionTemplates.pt(project.shortDescription);
      } else {
        translatedDescription = descriptionTemplates[locale]();
        translatedShortDescription = descriptionTemplates[locale]();
      }

      await prisma.projectTranslation.upsert({
        where: {
          projectId_locale: {
            projectId: project.id,
            locale,
          },
        },
        create: {
          projectId: project.id,
          locale,
          title: translatedTitle,
          description: translatedDescription,
          shortDescription: translatedShortDescription,
        },
        update: {
          title: translatedTitle,
          description: translatedDescription,
          shortDescription: translatedShortDescription,
        },
      });

      console.log(`  ✓ ${locale.toUpperCase()}: ${translatedTitle}`);
    }

    console.log('');
  }

  console.log('✅ All translations populated successfully!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
