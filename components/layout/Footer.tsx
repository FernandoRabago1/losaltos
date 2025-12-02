import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { getEnabledCategories } from '@/lib/actions/categories';
import { translations, translateTypology } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
];

export async function Footer({ locale = 'es' }: { locale?: Locale }) {
  const categories = await getEnabledCategories();
  const t = translations[locale];

  const footerLinks = {
    company: [
      { name: t.footer.aboutUs, href: `/${locale}/about` },
      { name: t.footer.ourTeam, href: `/${locale}/about#team` },
    ],
    services: [
      { name: t.footer.architecturalDesign, href: `/${locale}/services#architecture` },
      { name: t.footer.construction, href: `/${locale}/services#construction` },
      { name: t.footer.consulting, href: `/${locale}/services#consulting` },
    ],
  };

  const projectLinks = [
    { name: t.footer.allProjects, href: `/${locale}/projects` },
    ...categories.map((cat) => ({
      name: translateTypology(cat.slug, locale),
      href: `/${locale}/projects?category=${cat.slug.toUpperCase()}`,
    })),
  ];

  return (
    <footer className="bg-zinc-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-6">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-white transform rotate-45 scale-75"></div>
                  <div className="relative bg-zinc-100 text-zinc-900 font-bold text-xl px-3 py-2">
                    LA
                  </div>
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">
                  Los ALTOS
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 mb-6 max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="space-y-3 text-zinc-400">
              <div className="flex items-center space-x-3">
                <MapPin size={18} />
                <span>Zapopan, Jalisco</span>
              </div>
              {/* Uncomment and update with your contact information
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <span>(33) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <span>contacto@losaltos.com</span>
              </div>
              */}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.company}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.services}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.projects}</h3>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-zinc-400 text-sm">
              {t.footer.copyright}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-zinc-400">
              <span>{t.footer.privacy}</span>
              <span>{t.footer.terms}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}