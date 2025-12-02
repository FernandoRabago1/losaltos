export const locales = ['es', 'en', 'zh', 'ja', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  zh: '中文',
  ja: '日本語',
  pt: 'Português',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
