'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { locales, localeNames, type Locale } from '@/lib/i18n/config';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = (params?.locale as Locale) || 'es';

  // Remove current locale from pathname to get the base path
  const getPathForLocale = (locale: Locale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';

    // Always include locale prefix for all languages
    return `/${locale}${pathWithoutLocale}`;
  };

  // Set cookie when language changes
  const handleLocaleChange = (locale: Locale) => {
    // Set cookie that expires in 1 year
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 text-zinc-700 hover:text-zinc-900 transition-colors bg-zinc-100/40 hover:bg-zinc-200/50 backdrop-blur-md rounded-lg"
        aria-label="Change language"
      >
        <Globe size={20} />
        <span className="text-sm uppercase font-medium hidden sm:inline">
          {currentLocale}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-zinc-200 overflow-hidden z-50"
            >
              {locales.map((locale) => {
                const href = getPathForLocale(locale);

                return (
                  <Link
                    key={locale}
                    href={href}
                    onClick={() => handleLocaleChange(locale)}
                    className={`block px-4 py-3 text-sm transition-colors ${
                      currentLocale === locale
                        ? 'bg-zinc-100 text-zinc-900 font-medium'
                        : 'text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{localeNames[locale]}</span>
                      {currentLocale === locale && (
                        <span className="text-xs text-zinc-500">✓</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
