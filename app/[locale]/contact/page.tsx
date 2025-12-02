'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { translations } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/config';

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'es';
  const t = translations[locale];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'residencial',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'residencial',
          message: '',
        });
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert(error instanceof Error ? error.message : 'Error al enviar el mensaje. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 md:pt-40">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-light text-white mb-4"
          >
            {t.contact.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl font-light text-zinc-300 max-w-2xl"
          >
            {t.contact.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-100/90 backdrop-blur-sm rounded-2xl p-8">
                <h2 className="text-2xl font-light text-zinc-900 mb-6">{t.contact.contactInfoTitle}</h2>

                <div className="space-y-6">
                  {/* <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-zinc-900 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-light text-zinc-900 mb-1">{t.contact.phone}</h3>
                      <p className="text-zinc-600 font-light">(33) 555-0123</p>
                      <p className="text-sm text-zinc-500 font-light">{t.contact.phoneHours}</p>
                    </div>
                  </div> */}

                  {/* <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-zinc-900 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-light text-zinc-900 mb-1">{t.contact.email}</h3>
                      <p className="text-zinc-600 font-light">info@losaltos.com</p>
                      <p className="text-sm text-zinc-500 font-light">{t.contact.emailResponse}</p>
                    </div>
                  </div> */}

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-zinc-900 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-light text-zinc-900 mb-1">{t.contact.office}</h3>
                      <p className="text-zinc-600 font-light">Agua Blanca Industrial</p>
                      <p className="text-zinc-600 font-light">Zapopan, Jalisco</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-200">
                  <h3 className="font-light text-zinc-900 mb-4">{t.contact.officeHours}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600 font-light">{t.contact.mondayFriday}</span>
                      <span className="text-zinc-900 font-light">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 font-light">{t.contact.saturday}</span>
                      <span className="text-zinc-900 font-light">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 font-light">{t.contact.sunday}</span>
                      <span className="text-zinc-900 font-light">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-light text-zinc-900 mb-6">{t.contact.formTitle}</h2>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-2xl font-light text-zinc-900 mb-2">{t.contact.thankYou}</h3>
                    <p className="text-zinc-600 font-light">{t.contact.thankYouMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-light text-zinc-700 mb-2">
                          {t.contact.fullName} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                          placeholder={t.contact.namePlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-light text-zinc-700 mb-2">
                          {t.contact.emailLabel} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                          placeholder={t.contact.emailPlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-light text-zinc-700 mb-2">
                          {t.contact.phoneNumber}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div>
                        <label htmlFor="projectType" className="block text-sm font-light text-zinc-700 mb-2">
                          {t.contact.projectType} *
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                        >
                          <option value="industrial">{t.contact.projectTypeIndustrial}</option>
                          <option value="residencial">{t.contact.projectTypeResidential}</option>
                          <option value="comercial">{t.contact.projectTypeCommercial}</option>
                          <option value="arte">{t.contact.projectTypeArt}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-light text-zinc-700 mb-2">
                        {t.contact.message} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none"
                        placeholder={t.contact.messagePlaceholder}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-zinc-500 font-light">{t.contact.requiredFields}</p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center gap-2 px-8 py-3 bg-zinc-900 text-white font-light rounded-full transition-all duration-300 ${
                          isSubmitting
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-zinc-800 hover:scale-105'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {t.contact.sending}
                          </>
                        ) : (
                          <>
                            {t.contact.sendMessage}
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="h-96 bg-zinc-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto mb-4 text-zinc-400" size={48} />
            <p className="text-xl text-zinc-600">{t.contact.interactiveMap}</p>
            <p className="text-zinc-500">{t.contact.mapPlaceholder}</p>
          </div>
        </div>
      </section> */}
    </div>
  );
}