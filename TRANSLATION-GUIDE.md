# Multi-Language Translation Guide

This guide explains where to edit translations for different parts of your website and how to manage multi-language content.

## 📁 File Structure Overview

```
architecture-portfolio/
├── lib/i18n/
│   ├── config.ts           # Language configuration (add/remove languages here)
│   └── translations.ts     # ALL static text translations (navigation, pages, etc.)
├── prisma/
│   └── schema.prisma       # Database structure for project translations
└── scripts/
    └── populate-translations.ts  # Script to populate missing translations
```

---

## 🌍 Where to Edit Each Type of Translation

### 1. **Static Page Text (Navigation, Buttons, Labels, etc.)**

**File:** `/lib/i18n/translations.ts`

This file contains ALL the text that appears on your website pages (except project content).

#### What's included:
- Navigation menu items (Home, Projects, About, Contact, Services)
- Page titles and descriptions
- Button text
- Form labels
- Footer content
- Search interface text
- Project card labels (Location, Year, Status, etc.)
- Service page content
- About page content
- Contact form labels

#### Example - How to edit:

```typescript
export const translations: Record<Locale, Translation> = {
  es: {
    nav: {
      home: 'Inicio',           // ← Change this for Spanish
      projects: 'Proyectos',
      about: 'Acerca de',
      contact: 'Contacto',
      services: 'Servicios',
      allProjects: 'Todos los Proyectos',
    },
    // ... more sections
  },
  en: {
    nav: {
      home: 'Home',             // ← Change this for English
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      services: 'Services',
      allProjects: 'All Projects',
    },
    // ... more sections
  },
  zh: {
    nav: {
      home: '首页',              // ← Change this for Chinese
      projects: '项目',
      about: '关于',
      contact: '联系',
      services: '服务',
      allProjects: '所有项目',
    },
    // ... more sections
  },
  ja: {
    nav: {
      home: 'ホーム',            // ← Change this for Japanese
      projects: 'プロジェクト',
      about: '会社概要',
      contact: 'お問い合わせ',
      services: 'サービス',
      allProjects: 'すべてのプロジェクト',
    },
    // ... more sections
  },
  pt: {
    nav: {
      home: 'Início',           // ← Change this for Portuguese
      projects: 'Projetos',
      about: 'Sobre',
      contact: 'Contato',
      services: 'Serviços',
      allProjects: 'Todos os Projetos',
    },
    // ... more sections
  },
};
```

#### How to add new text:

1. Find the appropriate section (nav, home, about, contact, etc.)
2. Add your new key in **ALL 5 languages**
3. Use the translation in your component: `t.sectionName.keyName`

Example:
```typescript
// In translations.ts - add to ALL languages
nav: {
  home: 'Home',
  newPage: 'New Page',  // ← Add this
}

// In your component
import { translations } from '@/lib/i18n/translations';

export default function Navigation({ locale }: { locale: Locale }) {
  const t = translations[locale];
  return <Link href="/new">{t.nav.newPage}</Link>;
}
```

---

### 2. **Project Content (Titles, Descriptions)**

**Location:** Admin Dashboard → Projects

#### Two ways to edit:

**A. Through Admin Dashboard (Recommended):**
1. Go to http://localhost:3003/admin/login
2. Login with: admin@example.com / admin123
3. Navigate to "Projects"
4. Click "Edit" on any project
5. Use the language tabs (ES, EN, 中文, 日本語, PT) to edit:
   - Title
   - Short Description
   - Full Description

**B. Directly in Database:**
```bash
# View current translations
sqlite3 prisma/dev.db "SELECT * FROM ProjectTranslation WHERE projectId = 'PROJECT_ID_HERE';"

# Update a translation
sqlite3 prisma/dev.db "UPDATE ProjectTranslation SET title = 'New Title' WHERE projectId = 'PROJECT_ID' AND locale = 'en';"
```

---

### 3. **Project Status & Typology Labels**

**File:** `/lib/i18n/translations.ts`

Look for the `typology` and `status` sections:

```typescript
typology: {
  industrial: 'Industrial',    // ← Edit these
  residencial: 'Residential',
  comercial: 'Commercial',
  arte: 'Art',
},
status: {
  completado: 'Completed',     // ← Edit these
  'en progreso': 'In Progress',
  concept: 'Concept',
  diseño: 'Design',
  construcción: 'Construction',
},
```

---

## 🔧 Common Editing Tasks

### Add a New Language

1. **Update config file:**
```typescript
// lib/i18n/config.ts
export const locales = ['es', 'en', 'zh', 'ja', 'pt', 'fr'] as const; // ← Add 'fr'
```

2. **Add translations:**
```typescript
// lib/i18n/translations.ts
export const translations: Record<Locale, Translation> = {
  // ... existing languages
  fr: {
    nav: {
      home: 'Accueil',
      // ... all other keys
    },
    // ... all sections
  },
};
```

3. **Update database schema:**
```prisma
// prisma/schema.prisma - update comment
locale String // 'en' | 'es' | 'zh' | 'ja' | 'pt' | 'fr'
```

4. **Update components:**
```tsx
// components/admin/ProjectForm.tsx - add tab
<TabsTrigger value="fr">FR</TabsTrigger>
```

---

### Update Existing Translations

**For page text:**
1. Open `/lib/i18n/translations.ts`
2. Find the section you want to edit (use Ctrl+F to search)
3. Update the text for all 5 languages
4. Save the file (changes are immediate)

**For project content:**
1. Use the admin dashboard
2. Edit the project
3. Switch between language tabs
4. Save changes

---

### Bulk Update Project Translations

**Script:** `/scripts/populate-translations.ts`

Edit this script to add your translations, then run:
```bash
pnpm tsx scripts/populate-translations.ts
```

---

## 📋 Complete Translation Sections Reference

### Available sections in `translations.ts`:

1. **nav** - Navigation menu
2. **home** - Homepage text
3. **about** - About page
4. **contact** - Contact page
5. **services** - Services page
6. **projects** - Projects page text
7. **project** - Individual project page labels
8. **projectDetail** - Project detail page
9. **search** - Search interface
10. **footer** - Footer content
11. **typology** - Project type labels
12. **status** - Project status labels

---

## 🎯 Quick Reference - Where is What?

| What you want to change | Where to edit |
|------------------------|---------------|
| Navigation links text | `lib/i18n/translations.ts` → `nav` section |
| Homepage hero text | `lib/i18n/translations.ts` → `home` section |
| About page content | `lib/i18n/translations.ts` → `about` section |
| Contact form labels | `lib/i18n/translations.ts` → `contact` section |
| Services page text | `lib/i18n/translations.ts` → `services` section |
| Footer text | `lib/i18n/translations.ts` → `footer` section |
| Search placeholder | `lib/i18n/translations.ts` → `search` section |
| Project titles | Admin Dashboard → Projects → Edit |
| Project descriptions | Admin Dashboard → Projects → Edit |
| Project type labels (Industrial, etc.) | `lib/i18n/translations.ts` → `typology` |
| Project status labels (Completed, etc.) | `lib/i18n/translations.ts` → `status` |
| Button text | `lib/i18n/translations.ts` → relevant section |

---

## 💡 Tips

1. **Always update ALL 5 languages** when adding new text to `translations.ts`
2. **Use descriptive keys** like `heroTitle` instead of `title1`
3. **Test each language** by switching languages on the website
4. **Keep translations consistent** across similar sections
5. **Use the admin dashboard** for project content - it's easier!

---

## 🚀 After Making Changes

1. **For `translations.ts` changes:**
   - Changes are immediate (hot reload)
   - Refresh the browser to see updates

2. **For project content changes:**
   - Click "Update Project" in the admin
   - Navigate to the project page
   - Switch languages to verify

3. **For database schema changes:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

---

## 📞 Need Help?

Common issues:
- **Translation not showing?** → Check you updated ALL 5 languages
- **Project translation not saving?** → Check browser console for errors
- **Language not switching?** → Clear cookies and try again
- **New language not working?** → Make sure you updated all files mentioned in "Add a New Language"
