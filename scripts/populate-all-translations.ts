import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Complete translation mappings for all projects
const projectTranslations = {
  'Residencia Moderna en las Colinas': {
    en: {
      title: 'Modern Residence in the Hills',
      shortDescription: 'A contemporary hillside residence featuring panoramic views and sustainable design principles.',
      description: 'This modern residence seamlessly blends contemporary architecture with the natural landscape. The design features floor-to-ceiling windows that capture stunning hillside views, sustainable materials, and open-plan living spaces that create a harmonious connection between indoor and outdoor environments.',
    },
    zh: {
      title: '山丘现代住宅',
      shortDescription: '一座当代山坡住宅，拥有全景视野和可持续设计理念。',
      description: '这座现代住宅将当代建筑与自然景观完美融合。设计采用落地窗，可以欣赏到令人惊叹的山景，使用可持续材料，开放式生活空间创造了室内外环境之间的和谐连接。',
    },
    ja: {
      title: '丘の上のモダンレジデンス',
      shortDescription: 'パノラマビューと持続可能なデザイン原則を特徴とする現代的な丘陵地の住宅。',
      description: 'このモダンレジデンスは、現代建築と自然景観をシームレスに融合させています。デザインには、素晴らしい丘の景色を捉える床から天井までの窓、持続可能な素材、室内外の環境間の調和のとれたつながりを作り出すオープンプランの生活空間が含まれています。',
    },
    pt: {
      title: 'Residência Moderna nas Colinas',
      shortDescription: 'Uma residência contemporânea na encosta com vistas panorâmicas e princípios de design sustentável.',
      description: 'Esta residência moderna combina perfeitamente a arquitetura contemporânea com a paisagem natural. O design apresenta janelas do chão ao teto que capturam vistas deslumbrantes das colinas, materiais sustentáveis e espaços de convivência em plano aberto que criam uma conexão harmoniosa entre ambientes internos e externos.',
    },
  },
  'Complejo Comercial Centro': {
    en: {
      title: 'Downtown Commercial Complex',
      shortDescription: 'A mixed-use development in the heart of the city combining retail, office, and public spaces.',
      description: 'This downtown commercial complex represents a new era of urban development. The project integrates retail spaces, modern offices, and vibrant public areas, creating a dynamic hub that serves the community while respecting the urban fabric of the city center.',
    },
    zh: {
      title: '市中心商业综合体',
      shortDescription: '位于市中心的综合开发项目，结合零售、办公和公共空间。',
      description: '这个市中心商业综合体代表着城市发展的新时代。该项目整合了零售空间、现代办公室和充满活力的公共区域，创造了一个服务社区的动态中心，同时尊重市中心的城市结构。',
    },
    ja: {
      title: 'ダウンタウン商業複合施設',
      shortDescription: '都市の中心部にある、小売、オフィス、公共スペースを組み合わせた複合開発。',
      description: 'このダウンタウン商業複合施設は、都市開発の新時代を表しています。このプロジェクトは、小売スペース、モダンなオフィス、活気ある公共エリアを統合し、都心部の都市構造を尊重しながらコミュニティにサービスを提供する動的なハブを作り出しています。',
    },
    pt: {
      title: 'Complexo Comercial Centro',
      shortDescription: 'Um empreendimento de uso misto no coração da cidade combinando varejo, escritórios e espaços públicos.',
      description: 'Este complexo comercial no centro representa uma nova era de desenvolvimento urbano. O projeto integra espaços de varejo, escritórios modernos e áreas públicas vibrantes, criando um hub dinâmico que serve a comunidade enquanto respeita o tecido urbano do centro da cidade.',
    },
  },
  'Parque de Oficinas Sustentable': {
    en: {
      title: 'Sustainable Office Park',
      shortDescription: 'An eco-friendly office campus designed for the future of work with green technologies.',
      description: 'This sustainable office park sets new standards for corporate architecture. Featuring solar panels, rainwater harvesting, natural ventilation systems, and abundant green spaces, it creates a healthy and productive work environment while minimizing environmental impact.',
    },
    zh: {
      title: '可持续办公园区',
      shortDescription: '采用绿色技术设计的环保办公园区，面向未来工作模式。',
      description: '这个可持续办公园区为企业建筑树立了新标准。配备太阳能电池板、雨水收集系统、自然通风系统和丰富的绿色空间，创造了健康高效的工作环境，同时最大限度地减少环境影响。',
    },
    ja: {
      title: '持続可能なオフィスパーク',
      shortDescription: 'グリーンテクノロジーを備えた、未来の働き方のために設計されたエコフレンドリーなオフィスキャンパス。',
      description: 'この持続可能なオフィスパークは、企業建築の新しい基準を設定します。ソーラーパネル、雨水harvesting、自然換気システム、豊富な緑地を特徴とし、環境への影響を最小限に抑えながら、健康的で生産性の高い作業環境を作り出しています。',
    },
    pt: {
      title: 'Parque de Escritórios Sustentável',
      shortDescription: 'Um campus de escritórios ecológico projetado para o futuro do trabalho com tecnologias verdes.',
      description: 'Este parque de escritórios sustentável estabelece novos padrões para arquitetura corporativa. Apresentando painéis solares, coleta de água da chuva, sistemas de ventilação natural e abundantes espaços verdes, cria um ambiente de trabalho saudável e produtivo enquanto minimiza o impacto ambiental.',
    },
  },
  'Residencia de Lujo Frente al Agua': {
    en: {
      title: 'Luxury Waterfront Estate',
      shortDescription: 'An exclusive waterfront property featuring contemporary design and premium amenities.',
      description: 'This luxury waterfront estate offers unparalleled living experience with direct water access, infinity pools, private docks, and expansive terraces. The design maximizes views while providing privacy and incorporating high-end finishes throughout.',
    },
    zh: {
      title: '豪华滨水住宅',
      shortDescription: '独家滨水物业，采用当代设计和高端设施。',
      description: '这座豪华滨水住宅提供无与伦比的生活体验，拥有直接水上通道、无边泳池、私人码头和宽敞露台。设计最大化了视野，同时提供隐私，并在整个空间中融入高端装饰。',
    },
    ja: {
      title: '高級ウォーターフロント邸宅',
      shortDescription: '現代的なデザインとプレミアムアメニティを備えた独占的なウォーターフロント物件。',
      description: 'この高級ウォーターフロント邸宅は、直接水上アクセス、インフィニティプール、プライベート桟橋、広々としたテラスで比類のない生活体験を提供します。デザインは、プライバシーを提供しながら眺望を最大化し、全体に高級仕上げを組み込んでいます。',
    },
    pt: {
      title: 'Residência de Luxo à Beira-Mar',
      shortDescription: 'Uma propriedade exclusiva à beira-mar com design contemporâneo e comodidades premium.',
      description: 'Esta residência de luxo à beira-mar oferece uma experiência de vida incomparável com acesso direto à água, piscinas infinitas, docas privadas e terraços expansivos. O design maximiza as vistas enquanto proporciona privacidade e incorpora acabamentos de alta qualidade em todos os lugares.',
    },
  },
  'Proyecto de Renovación Urbana': {
    en: {
      title: 'Urban Renewal Project',
      shortDescription: 'A comprehensive urban transformation initiative revitalizing historic downtown areas.',
      description: 'This urban renewal project breathes new life into historic neighborhoods. Preserving architectural heritage while introducing modern infrastructure, mixed-use developments, and public spaces that reconnect communities and enhance urban living.',
    },
    zh: {
      title: '城市更新项目',
      shortDescription: '综合性城市改造计划，振兴历史悠久的市中心区域。',
      description: '这个城市更新项目为历史街区注入新生命。在保留建筑遗产的同时，引入现代基础设施、混合用途开发和公共空间，重新连接社区并改善城市生活。',
    },
    ja: {
      title: '都市再生プロジェクト',
      shortDescription: '歴史的なダウンタウンエリアを活性化する包括的な都市変革イニシアチブ。',
      description: 'この都市再生プロジェクトは、歴史的な地域に新しい命を吹き込みます。建築遺産を保存しながら、現代的なインフラストラクチャー、複合用途開発、コミュニティを再接続し都市生活を向上させる公共スペースを導入しています。',
    },
    pt: {
      title: 'Projeto de Renovação Urbana',
      shortDescription: 'Uma iniciativa abrangente de transformação urbana revitalizando áreas históricas do centro.',
      description: 'Este projeto de renovação urbana traz nova vida aos bairros históricos. Preservando o patrimônio arquitetônico enquanto introduz infraestrutura moderna, desenvolvimentos de uso misto e espaços públicos que reconectam comunidades e melhoram a vida urbana.',
    },
  },
  'Casas Ecológicas en Condominio': {
    en: {
      title: 'Eco-Friendly Condominium Houses',
      shortDescription: 'Sustainable residential community with green building practices and shared amenities.',
      description: 'This eco-friendly condominium development combines sustainable living with community-oriented design. Features include solar energy, water recycling systems, organic gardens, and shared green spaces that promote environmental responsibility.',
    },
    zh: {
      title: '生态公寓住宅',
      shortDescription: '采用绿色建筑实践和共享设施的可持续住宅社区。',
      description: '这个生态友好公寓开发将可持续生活与社区导向设计相结合。特点包括太阳能、水循环系统、有机花园和共享绿地，促进环境责任。',
    },
    ja: {
      title: 'エコフレンドリーコンドミニアムハウス',
      shortDescription: 'グリーンビルディング実践と共有アメニティを備えた持続可能な住宅コミュニティ。',
      description: 'このエコフレンドリーコンドミニアム開発は、持続可能な生活とコミュニティ指向のデザインを組み合わせています。太陽エネルギー、水リサイクルシステム、有機庭園、環境責任を促進する共有緑地などの機能が含まれています。',
    },
    pt: {
      title: 'Casas Ecológicas em Condomínio',
      shortDescription: 'Comunidade residencial sustentável com práticas de construção verde e comodidades compartilhadas.',
      description: 'Este empreendimento de condomínio ecológico combina vida sustentável com design orientado para a comunidade. As características incluem energia solar, sistemas de reciclagem de água, jardins orgânicos e espaços verdes compartilhados que promovem a responsabilidade ambiental.',
    },
  },
  'Complejo de Almacenes Industriales': {
    en: {
      title: 'Industrial Warehouse Complex',
      shortDescription: 'Modern logistics facility with advanced automation and efficient distribution systems.',
      description: 'This industrial warehouse complex represents the future of logistics. Incorporating automated storage systems, efficient loading docks, climate-controlled areas, and strategic location for optimal distribution operations.',
    },
    zh: {
      title: '工业仓储综合体',
      shortDescription: '具有先进自动化和高效配送系统的现代物流设施。',
      description: '这个工业仓储综合体代表物流的未来。融合自动化存储系统、高效装卸码头、气候控制区域和战略位置，实现最佳配送运营。',
    },
    ja: {
      title: '産業倉庫複合施設',
      shortDescription: '高度な自動化と効率的な配送システムを備えた現代的な物流施設。',
      description: 'この産業倉庫複合施設は、物流の未来を表しています。自動化された保管システム、効率的な荷役ドック、気候制御エリア、最適な配送業務のための戦略的な場所を組み込んでいます。',
    },
    pt: {
      title: 'Complexo de Armazéns Industriais',
      shortDescription: 'Instalação logística moderna com automação avançada e sistemas de distribuição eficientes.',
      description: 'Este complexo de armazéns industriais representa o futuro da logística. Incorporando sistemas de armazenamento automatizado, docas de carregamento eficientes, áreas com controle climático e localização estratégica para operações de distribuição ideais.',
    },
  },
  'Planta de Manufactura Avanzada': {
    en: {
      title: 'Advanced Manufacturing Plant',
      shortDescription: 'State-of-the-art production facility with cutting-edge technology and sustainable practices.',
      description: 'This advanced manufacturing plant integrates Industry 4.0 technologies with sustainable production methods. Features smart automation, energy-efficient systems, waste reduction protocols, and flexible production lines for modern manufacturing needs.',
    },
    zh: {
      title: '先进制造工厂',
      shortDescription: '采用尖端技术和可持续实践的最先进生产设施。',
      description: '这个先进制造工厂将工业4.0技术与可持续生产方法相结合。特点包括智能自动化、节能系统、减废协议和适应现代制造需求的灵活生产线。',
    },
    ja: {
      title: '先進製造プラント',
      shortDescription: '最先端技術と持続可能な実践を備えた最先端生産施設。',
      description: 'この先進製造プラントは、インダストリー4.0技術と持続可能な生産方法を統合しています。スマートオートメーション、エネルギー効率の高いシステム、廃棄物削減プロトコル、現代の製造ニーズに対応する柔軟な生産ラインを特徴としています。',
    },
    pt: {
      title: 'Planta de Manufatura Avançada',
      shortDescription: 'Instalação de produção de última geração com tecnologia de ponta e práticas sustentáveis.',
      description: 'Esta planta de manufatura avançada integra tecnologias da Indústria 4.0 com métodos de produção sustentáveis. Apresenta automação inteligente, sistemas de eficiência energética, protocolos de redução de resíduos e linhas de produção flexíveis para as necessidades de manufatura moderna.',
    },
  },
  'Centro de Distribución Logística': {
    en: {
      title: 'Logistics Distribution Center',
      shortDescription: 'High-capacity distribution hub designed for rapid order fulfillment and inventory management.',
      description: 'This logistics distribution center optimizes supply chain operations with advanced sorting systems, cross-docking facilities, temperature-controlled zones, and integrated transportation management for seamless distribution.',
    },
    zh: {
      title: '物流配送中心',
      shortDescription: '专为快速订单履行和库存管理设计的大容量配送中心。',
      description: '这个物流配送中心通过先进的分拣系统、交叉转运设施、温控区域和集成运输管理优化供应链运营，实现无缝配送。',
    },
    ja: {
      title: '物流配送センター',
      shortDescription: '迅速な注文履行と在庫管理のために設計された大容量配送ハブ。',
      description: 'この物流配送センターは、高度な仕分けシステム、クロスドッキング施設、温度管理ゾーン、シームレスな配送のための統合輸送管理でサプライチェーン業務を最適化します。',
    },
    pt: {
      title: 'Centro de Distribuição Logística',
      shortDescription: 'Hub de distribuição de alta capacidade projetado para atendimento rápido de pedidos e gerenciamento de estoque.',
      description: 'Este centro de distribuição logística otimiza as operações da cadeia de suprimentos com sistemas avançados de triagem, instalações de cross-docking, zonas com controle de temperatura e gestão de transporte integrada para distribuição perfeita.',
    },
  },
  'Escultura Urbana Moderna': {
    en: {
      title: 'Modern Urban Sculpture',
      shortDescription: 'Contemporary art installation that transforms public space and engages the community.',
      description: 'This modern urban sculpture serves as a landmark and gathering point. The abstract design interacts with natural light throughout the day, creating dynamic visual experiences that enhance the urban environment and inspire public interaction.',
    },
    zh: {
      title: '现代城市雕塑',
      shortDescription: '改变公共空间并吸引社区参与的当代艺术装置。',
      description: '这座现代城市雕塑作为地标和聚集点。抽象设计全天与自然光互动，创造动态视觉体验，增强城市环境并激发公众互动。',
    },
    ja: {
      title: 'モダンアーバンスカルプチャー',
      shortDescription: '公共空間を変革し、コミュニティを巻き込む現代アート作品。',
      description: 'このモダンアーバンスカルプチャーは、ランドマークおよび集合場所として機能します。抽象的なデザインは一日中自然光と相互作用し、都市環境を向上させ、公共の交流を促す動的な視覚体験を作り出しています。',
    },
    pt: {
      title: 'Escultura Urbana Moderna',
      shortDescription: 'Instalação de arte contemporânea que transforma o espaço público e envolve a comunidade.',
      description: 'Esta escultura urbana moderna serve como ponto de referência e encontro. O design abstrato interage com a luz natural ao longo do dia, criando experiências visuais dinâmicas que melhoram o ambiente urbano e inspiram a interação pública.',
    },
  },
  'Galería de Arte Contemporáneo': {
    en: {
      title: 'Contemporary Art Gallery',
      shortDescription: 'Innovative exhibition space designed to showcase modern art in an inspiring environment.',
      description: 'This contemporary art gallery features flexible exhibition spaces, optimal lighting systems, climate control for artwork preservation, and architectural design that enhances the viewing experience while complementing displayed works.',
    },
    zh: {
      title: '当代艺术画廊',
      shortDescription: '创新展览空间，旨在在鼓舞人心的环境中展示现代艺术。',
      description: '这个当代艺术画廊拥有灵活的展览空间、最佳照明系统、艺术品保存的气候控制，以及增强观赏体验同时补充展示作品的建筑设计。',
    },
    ja: {
      title: '現代美術ギャラリー',
      shortDescription: '刺激的な環境で現代美術を展示するために設計された革新的な展示スペース。',
      description: 'この現代美術ギャラリーは、柔軟な展示スペース、最適な照明システム、作品保存のための気候制御、展示作品を補完しながら鑑賞体験を向上させる建築デザインを特徴としています。',
    },
    pt: {
      title: 'Galeria de Arte Contemporânea',
      shortDescription: 'Espaço de exposição inovador projetado para exibir arte moderna em um ambiente inspirador.',
      description: 'Esta galeria de arte contemporânea apresenta espaços de exposição flexíveis, sistemas de iluminação ideais, controle climático para preservação de obras de arte e design arquitetônico que aprimora a experiência de visualização enquanto complementa as obras exibidas.',
    },
  },
  'Instalación de Arte Público': {
    en: {
      title: 'Public Art Installation',
      shortDescription: 'Interactive art piece that brings creativity and cultural dialogue to urban spaces.',
      description: 'This public art installation creates meaningful connections between art and community. The interactive design encourages participation, sparks conversation, and transforms ordinary urban spaces into cultural destinations that celebrate local identity.',
    },
    zh: {
      title: '公共艺术装置',
      shortDescription: '将创意和文化对话带入城市空间的互动艺术作品。',
      description: '这个公共艺术装置在艺术与社区之间创造有意义的联系。互动设计鼓励参与、激发对话，并将普通城市空间转变为庆祝当地身份的文化目的地。',
    },
    ja: {
      title: 'パブリックアートインスタレーション',
      shortDescription: '創造性と文化的対話を都市空間にもたらすインタラクティブアート作品。',
      description: 'このパブリックアートインスタレーションは、アートとコミュニティの間に意味のあるつながりを作り出します。インタラクティブなデザインは参加を促し、会話を引き起こし、普通の都市空間を地元のアイデンティティを祝う文化的な目的地に変えます。',
    },
    pt: {
      title: 'Instalação de Arte Pública',
      shortDescription: 'Peça de arte interativa que traz criatividade e diálogo cultural para espaços urbanos.',
      description: 'Esta instalação de arte pública cria conexões significativas entre arte e comunidade. O design interativo incentiva a participação, desperta conversas e transforma espaços urbanos comuns em destinos culturais que celebram a identidade local.',
    },
  },
};

async function main() {
  console.log('🌍 Populating comprehensive project translations...\n');

  const projects = await prisma.project.findMany();
  let updated = 0;
  let created = 0;

  for (const project of projects) {
    console.log(`📝 Processing: ${project.title}`);

    const translations = projectTranslations[project.title as keyof typeof projectTranslations];

    if (translations) {
      const locales = ['en', 'zh', 'ja', 'pt'] as const;

      for (const locale of locales) {
        const translation = translations[locale];

        const result = await prisma.projectTranslation.upsert({
          where: {
            projectId_locale: {
              projectId: project.id,
              locale,
            },
          },
          create: {
            projectId: project.id,
            locale,
            title: translation.title,
            description: translation.description,
            shortDescription: translation.shortDescription,
          },
          update: {
            title: translation.title,
            description: translation.description,
            shortDescription: translation.shortDescription,
          },
        });

        if (result) {
          created++;
          console.log(`  ✓ ${locale.toUpperCase()}: ${translation.title}`);
        }
      }
    } else {
      console.log(`  ⚠ No translations found for: ${project.title}`);
    }

    console.log('');
  }

  console.log(`✅ Translation update complete!`);
  console.log(`   Created/Updated: ${created} translations across ${projects.length} projects`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
