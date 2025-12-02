import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { SearchProvider } from '@/components/layout/SearchProvider';
import GlobalSearch from '@/components/layout/GlobalSearch';
import { getEnabledTags } from '@/lib/actions/tags';
import { getPopularProjects, getAllProjects } from '@/lib/actions/projects';

export async function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ja' },
    { locale: 'pt' },
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const tags = await getEnabledTags();
  const popularProjects = await getPopularProjects();
  const allProjects = await getAllProjects();

  return (
    <SearchProvider>
      <main className="min-h-screen">{children}</main>
      <GlobalSearch
        tags={tags}
        popularProjects={popularProjects}
        allProjects={allProjects}
        locale={locale}
      />
    </SearchProvider>
  );
}
