export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  status: 'completado' | 'en progreso' | 'concept';
  typology: 'industrial' | 'residencial' | 'comercial' | 'arte';
  description: string;
  shortDescription: string;
  images: string[];
  featuredImage: string;
  tags?: string[];
  area?: string;
  client?: string;
  team?: {
    role: string;
    members: string[];
  }[];
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
}