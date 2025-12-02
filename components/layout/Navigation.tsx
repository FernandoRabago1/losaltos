'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from './SearchProvider';
import LanguageSwitcher from './LanguageSwitcher';
import { useParams } from 'next/navigation';
import { translations } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';

export default function Navigation() {
  const { openSearch } = useSearch();
  const params = useParams();
  const locale = (params?.locale as Locale) || 'es';
  const t = translations[locale];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile services data (translated)
  const mobileServices = [
    { name: t.services.architecture, href: `/${locale}/services#architecture` },
    { name: t.services.construction, href: `/${locale}/services#construction` },
    { name: t.services.interior, href: `/${locale}/services#interior` },
    { name: t.services.consulting, href: `/${locale}/services#consulting` },
  ];

  // Handle scroll for navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-8 py-4 md:py-6 transition-all duration-500 ${
        !isScrolled ? 'bg-white shadow-sm' : 'bg-gray-100/50 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-xl md:text-2xl font-bold tracking-wider text-zinc-900 transition-colors duration-300">
            LOS ALTOS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href={`/${locale}/services`}
              className="text-sm uppercase tracking-wider text-zinc-700 hover:text-zinc-900 transition-colors py-2"
            >
              {t.nav.services}
            </Link>

            <Link
              href={`/${locale}/projects`}
              className="text-sm uppercase tracking-wider text-zinc-700 hover:text-zinc-900 transition-colors py-2"
            >
              {t.nav.projects}
            </Link>

            <Link
              href={`/${locale}/about`}
              className="text-sm uppercase tracking-wider text-zinc-700 hover:text-zinc-900 transition-colors py-2"
            >
              {t.nav.about}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="p-2 text-zinc-700 hover:text-zinc-900 transition-colors bg-zinc-100/40 hover:bg-zinc-200/50 backdrop-blur-md rounded-lg"
            >
              <Phone size={20} />
            </Link>

            <button
              onClick={openSearch}
              className="p-2 text-zinc-700 hover:text-zinc-900 transition-colors bg-zinc-100/40 hover:bg-zinc-200/50 backdrop-blur-md rounded-lg"
            >
              <Search size={20} />
            </button>

            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-900 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Glass Effect */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-4 top-4 h-[80%] w-full max-w-sm backdrop-blur-xl rounded-2xl shadow-xl"
              style={{ backgroundColor: 'rgba(226, 232, 220, 0.5)' }}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-light text-zinc-800">{t.nav.menu}</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-zinc-700 hover:bg-gray-200/50 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-6 flex-1 overflow-y-auto">
                  {/* Projects - Only "All Projects" */}
                  <div>
                    <h3 className="text-zinc-600 uppercase tracking-wider text-xs mb-3 font-light">{t.nav.projects}</h3>
                    <Link
                      href={`/${locale}/projects`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-zinc-700 hover:text-zinc-900 transition-colors font-light"
                    >
                      {t.nav.allProjects}
                    </Link>
                  </div>

                  {/* Services - Keep all items */}
                  <div>
                    <h3 className="text-zinc-600 uppercase tracking-wider text-xs mb-3 font-light">{t.nav.services}</h3>
                    <div className="space-y-2">
                      {mobileServices.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-zinc-700 hover:text-zinc-900 transition-colors font-light"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Office - Only "About Us" and "Contact" */}
                  <div>
                    <h3 className="text-zinc-600 uppercase tracking-wider text-xs mb-3 font-light">{t.nav.office}</h3>
                    <div className="space-y-2">
                      <Link
                        href={`/${locale}/about`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-zinc-700 hover:text-zinc-900 transition-colors font-light"
                      >
                        {t.nav.about}
                      </Link>
                      <Link
                        href={`/${locale}/contact`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-zinc-700 hover:text-zinc-900 transition-colors font-light"
                      >
                        {t.nav.contact}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openSearch();
                  }}
                  className="mt-6 w-full py-3 bg-white/50 border border-gray-300/50 text-zinc-800 uppercase text-sm tracking-wider font-light rounded-lg hover:bg-white/60 transition-colors"
                >
                  {t.nav.search}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
