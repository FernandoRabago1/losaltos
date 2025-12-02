import { getEnabledCategories } from '@/lib/actions/categories';
import { getEnabledFeaturedProjectsWithTranslations } from '@/lib/actions/featured-projects';
import { getAllProjectsWithTranslations } from '@/lib/actions/projects';
import HomeClient from '@/components/home/HomeClient';
import { type Locale } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const enabledCategories = await getEnabledCategories();
  const allProjects = await getAllProjectsWithTranslations(locale);
  const featuredProjects = await getEnabledFeaturedProjectsWithTranslations(locale);

  return <HomeClient enabledCategories={enabledCategories} allProjects={allProjects} featuredProjects={featuredProjects} locale={locale} />;
}