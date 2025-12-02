'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-zinc-900 transform rotate-45 scale-75 group-hover:rotate-90 transition-transform duration-500"></div>
              <div className="relative bg-zinc-800 text-white font-bold text-xl px-3 py-2">
                LA
              </div>
            </div>
            <span className={`font-bold text-xl tracking-tight ${
              isScrolled ? 'text-zinc-900' : 'text-white'
            }`}>
              Los ALTOS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-colors duration-200 hover:text-zinc-600 ${
                  pathname === item.href
                    ? isScrolled ? 'text-zinc-900' : 'text-white'
                    : isScrolled ? 'text-zinc-600' : 'text-white/80'
                } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-zinc-900 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  pathname === item.href ? 'after:scale-x-100' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-zinc-900 text-white px-6 py-2.5 rounded-full hover:bg-zinc-800 transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${
              isScrolled ? 'text-zinc-900' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-6 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block w-full text-center bg-zinc-900 text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}