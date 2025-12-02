import Navigation from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import type { Locale } from '@/lib/i18n/config';

export default async function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Navigation />
      {children}
      <Footer locale={locale as Locale} />
    </>
  );
}