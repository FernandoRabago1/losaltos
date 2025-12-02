import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'modern-residence-hills',
    title: 'Residencia Moderna en las Colinas',
    location: 'Los Altos, California',
    year: '2024',
    status: 'completado',
    typology: 'residencial',
    shortDescription: 'Una impresionante casa moderna ubicada en las colinas de Los Altos con vistas panorámicas.',
    description: `Esta residencia contemporánea ejemplifica la armonía perfecta entre la arquitectura moderna y el paisaje natural.
    Diseñada con la sostenibilidad en mente, la casa cuenta con amplios muros de cristal que difuminan los límites entre los espacios interiores y exteriores.
    El uso de materiales naturales como madera y piedra crea una atmósfera cálida y acogedora, manteniendo al mismo tiempo una estética minimalista y elegante.`,
    images: ['/image.png', '/image2.png', '/image3.png'],
    featuredImage: '/image.png',
    tags: ['Residencial', 'Premios', 'Equipo', 'Reutilización Adaptativa'],
    area: '5,500 sq ft',
    client: 'Cliente Privado',
    team: [
      {
        role: 'Arquitecto Principal',
        members: ['Los ALTOS Design Team']
      },
      {
        role: 'Ingeniero Estructural',
        members: ['Smith Engineering']
      }
    ],
    featured: true
  },
  {
    id: '2',
    slug: 'downtown-commercial-complex',
    title: 'Complejo Comercial Centro',
    location: 'Palo Alto, California',
    year: '2023',
    status: 'completado',
    typology: 'comercial',
    shortDescription: 'Un desarrollo de uso mixto que aporta espacios modernos de comercio y oficinas al centro.',
    description: `Este innovador complejo comercial representa el futuro del desarrollo urbano.
    El edificio cuenta con espacios de oficinas flexibles, comercios en planta baja y áreas públicas de reunión.
    El diseño prioriza la luz natural, la eficiencia energética y crea un vibrante centro comunitario en el corazón del centro de Palo Alto.`,
    images: ['/image2.png', '/image3.png', '/image4.png'],
    featuredImage: '/image2.png',
    tags: ['Instalación', 'Evento', 'Equipo', 'Producto'],
    area: '45,000 sq ft',
    client: 'Palo Alto Development Group',
    featured: true
  },
  {
    id: '3',
    slug: 'sustainable-office-park',
    title: 'Parque de Oficinas Sustentable',
    location: 'Mountain View, California',
    year: '2024',
    status: 'en progreso',
    typology: 'comercial',
    shortDescription: 'Un campus de oficinas certificado LEED Platino enfocado en el bienestar de los empleados.',
    description: `Este parque de oficinas de vanguardia establece nuevos estándares para el desarrollo comercial sostenible.
    Con paneles solares, captación de agua pluvial y amplias áreas verdes, el campus prioriza tanto la responsabilidad ambiental como el bienestar de los empleados.
    El diseño incorpora elementos biofílicos en todo el proyecto, creando espacios de trabajo inspiradores que aumentan la productividad y creatividad.`,
    images: ['/image3.png', '/image4.png', '/image5.png'],
    featuredImage: '/image3.png',
    tags: ['Producto', 'Equipo', 'Premios', 'Conversación'],
    area: '120,000 sq ft',
    client: 'Tech Innovation Corp',
    featured: true
  },
  {
    id: '4',
    slug: 'luxury-waterfront-estate',
    title: 'Residencia de Lujo Frente al Agua',
    location: 'Atherton, California',
    year: '2023',
    status: 'completado',
    typology: 'residencial',
    shortDescription: 'Una propiedad exclusiva frente al agua que combina elegancia con amenidades modernas.',
    description: `Esta magnífica residencia representa el pináculo del diseño residencial de lujo.
    La propiedad cuenta con impresionantes vistas al agua, jardines meticulosamente diseñados y domótica de última generación.
    Cada detalle ha sido cuidadosamente considerado para crear una experiencia de vida que es tanto opulenta como cómoda.`,
    images: ['/image4.png', '/image5.png', '/image6.png'],
    featuredImage: '/image4.png',
    tags: ['Residencial', 'Reutilización Adaptativa', 'Premios'],
    area: '12,000 sq ft',
    client: 'Cliente Privado',
    featured: false
  },
  {
    id: '5',
    slug: 'urban-renewal-project',
    title: 'Proyecto de Renovación Urbana',
    location: 'San Jose, California',
    year: '2024',
    status: 'en progreso',
    typology: 'comercial',
    shortDescription: 'Revitalizando el centro con espacios residenciales y comerciales mixtos.',
    description: `Este ambicioso proyecto de renovación urbana da nueva vida a un distrito histórico del centro.
    Al preservar el patrimonio arquitectónico mientras se introducen amenidades modernas, el desarrollo crea una comunidad vibrante que honra el pasado mientras abraza el futuro.
    El proyecto incluye vivienda accesible, espacios comerciales locales e instalaciones de arte público.`,
    images: ['/image5.png', '/image6.png', '/image.png'],
    featuredImage: '/image5.png',
    tags: ['Transporte', 'Equipo', 'Producto', 'Evento'],
    area: '200,000 sq ft',
    client: 'City of San Jose',
    featured: false
  },
  {
    id: '6',
    slug: 'eco-friendly-townhomes',
    title: 'Casas Ecológicas en Condominio',
    location: 'Sunnyvale, California',
    year: '2023',
    status: 'completado',
    typology: 'residencial',
    shortDescription: 'Vida sustentable en comunidades modernas de casas en condominio.',
    description: `Estas innovadoras casas en condominio demuestran que la vida sustentable no requiere sacrificar comodidad o estilo.
    Cada unidad cuenta con paneles solares, electrodomésticos de bajo consumo energético y tecnología de hogar inteligente.
    El diseño comunitario fomenta la interacción vecinal con áreas verdes compartidas y senderos peatonales.`,
    images: ['/image6.png', '/image.png', '/image2.png'],
    featuredImage: '/image6.png',
    tags: ['Evento', 'Bienvenida', 'Instalación', 'Equipo'],
    area: '2,200 sq ft per unit',
    client: 'Green Living Development',
    featured: false
  },
  {
    id: '7',
    slug: 'industrial-warehouse-complex',
    title: 'Complejo de Almacenes Industriales',
    location: 'San Jose, California',
    year: '2024',
    status: 'completado',
    typology: 'comercial',
    shortDescription: 'Moderno complejo de almacenes diseñado para eficiencia logística y operaciones industriales.',
    description: `Este complejo de almacenes de última generación combina funcionalidad industrial con diseño arquitectónico innovador.
    Diseñado para maximizar la eficiencia operativa con techos altos, amplias bahías de carga y sistemas avanzados de gestión de inventario.
    El complejo incluye oficinas administrativas integradas y áreas de servicio para empleados.`,
    images: ['/image.png', '/image2.png', '/image3.png'],
    featuredImage: '/image.png',
    tags: ['Industrial', 'Comercial', 'Producto'],
    area: '150,000 sq ft',
    client: 'Industrial Logistics Corp',
    team: [
      {
        role: 'Arquitecto Principal',
        members: ['Los ALTOS Design Team']
      },
      {
        role: 'Ingeniero Estructural',
        members: ['Industrial Solutions Inc']
      }
    ],
    featured: true
  },
  {
    id: '8',
    slug: 'manufacturing-facility',
    title: 'Planta de Manufactura Avanzada',
    location: 'Fremont, California',
    year: '2023',
    status: 'completado',
    typology: 'comercial',
    shortDescription: 'Instalación de manufactura de alta tecnología con espacios de producción optimizados.',
    description: `Esta planta de manufactura de vanguardia establece nuevos estándares en diseño industrial.
    Incorpora tecnología de construcción modular, sistemas de energía eficiente y espacios de trabajo ergonómicos.
    El diseño integra áreas de producción, control de calidad, y centros de investigación y desarrollo.`,
    images: ['/image2.png', '/image3.png', '/image4.png'],
    featuredImage: '/image2.png',
    tags: ['Industrial', 'Tecnología', 'Equipo'],
    area: '200,000 sq ft',
    client: 'Tech Manufacturing Solutions',
    featured: true
  },
  {
    id: '9',
    slug: 'distribution-center',
    title: 'Centro de Distribución Logística',
    location: 'Oakland, California',
    year: '2024',
    status: 'en progreso',
    typology: 'comercial',
    shortDescription: 'Centro de distribución estratégicamente diseñado para operaciones logísticas eficientes.',
    description: `Este centro de distribución de última generación optimiza cada aspecto de las operaciones logísticas modernas.
    Cuenta con sistemas automatizados de manejo de materiales, áreas de clasificación optimizadas y acceso directo a autopistas principales.
    El diseño sostenible incluye paneles solares en el techo y sistemas de iluminación LED de bajo consumo.`,
    images: ['/image3.png', '/image4.png', '/image5.png'],
    featuredImage: '/image3.png',
    tags: ['Industrial', 'Logística', 'Sustentable'],
    area: '180,000 sq ft',
    client: 'Global Logistics Group',
    featured: true
  },
  {
    id: '10',
    slug: 'escultura-urbana-moderna',
    title: 'Escultura Urbana Moderna',
    location: 'San Francisco, California',
    year: '2024',
    status: 'completado',
    typology: 'arte',
    shortDescription: 'Una impresionante instalación de arte urbano que reimagina el espacio público contemporáneo.',
    description: `Esta escultura monumental representa la intersección entre arte y arquitectura en el paisaje urbano.
    Fabricada con acero inoxidable y vidrio, la pieza refleja la luz natural de maneras dinámicas a lo largo del día.
    La obra invita a la reflexión sobre la relación entre el ser humano y su entorno construido.`,
    images: ['/art1.png', '/art2.png', '/art3.png'],
    featuredImage: '/art1.png',
    tags: ['Arte', 'Instalación', 'Producto'],
    area: '2,500 sq ft',
    client: 'Museo de Arte Moderno',
    team: [
      {
        role: 'Director Artístico',
        members: ['Los ALTOS Design Team']
      }
    ],
    featured: true
  },
  {
    id: '11',
    slug: 'galeria-arte-contemporaneo',
    title: 'Galería de Arte Contemporáneo',
    location: 'Palo Alto, California',
    year: '2023',
    status: 'completado',
    typology: 'arte',
    shortDescription: 'Espacio multifuncional dedicado a la exhibición de arte contemporáneo y vanguardista.',
    description: `Un espacio diseñado específicamente para exhibir obras de arte en condiciones óptimas de iluminación y presentación.
    Los techos altos y las paredes flexibles permiten adaptarse a diferentes tipos de instalaciones artísticas.
    El diseño minimalista del espacio permite que el arte sea el protagonista absoluto.`,
    images: ['/art2.png', '/art3.png', '/art1.png'],
    featuredImage: '/art2.png',
    tags: ['Arte', 'Bienvenida', 'Evento'],
    area: '8,000 sq ft',
    client: 'Fundación Cultural',
    featured: true
  },
  {
    id: '12',
    slug: 'instalacion-arte-publico',
    title: 'Instalación de Arte Público',
    location: 'San Jose, California',
    year: '2024',
    status: 'en progreso',
    typology: 'arte',
    shortDescription: 'Proyecto de arte público interactivo que transforma espacios comunitarios.',
    description: `Esta instalación permanente combina elementos escultóricos con tecnología interactiva.
    Los visitantes pueden interactuar con la obra a través de sensores de movimiento que activan luces y sonidos.
    El proyecto busca crear un sentido de comunidad y pertenencia en el espacio urbano.`,
    images: ['/art3.png', '/art1.png', '/art2.png'],
    featuredImage: '/art3.png',
    tags: ['Arte', 'Conversación', 'Instalación'],
    area: '3,200 sq ft',
    client: 'Ciudad de San Jose',
    featured: true
  }
];

export const services = [
  {
    id: '1',
    title: 'Diseño Arquitectónico',
    description: 'Servicios arquitectónicos integrales desde el concepto hasta la finalización.',
    icon: 'Building',
    features: [
      'Diseño Conceptual',
      'Diseño Esquemático',
      'Desarrollo de Diseño',
      'Documentación de Construcción',
      'Administración de Construcción'
    ]
  },
  {
    id: '2',
    title: 'Gestión de Construcción',
    description: 'Supervisión experta que garantiza la entrega de proyectos a tiempo y dentro del presupuesto.',
    icon: 'HardHat',
    features: [
      'Planeación de Proyectos',
      'Estimación de Costos',
      'Gestión de Cronograma',
      'Control de Calidad',
      'Cumplimiento de Seguridad'
    ]
  },
  {
    id: '3',
    title: 'Diseño de Interiores',
    description: 'Creando espacios hermosos y funcionales que reflejan tu visión.',
    icon: 'Palette',
    features: [
      'Planeación de Espacios',
      'Selección de Materiales',
      'Diseño de Mobiliario Personalizado',
      'Diseño de Iluminación',
      'Curaduría de Arte'
    ]
  },
  {
    id: '4',
    title: 'Diseño Sustentable',
    description: 'Soluciones ecológicas para un futuro más verde.',
    icon: 'Leaf',
    features: [
      'Certificación LEED',
      'Modelado Energético',
      'Materiales Sustentables',
      'Conservación de Agua',
      'Integración Solar'
    ]
  }
];