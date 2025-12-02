# Admin Dashboard Documentation

## Overview

This document provides comprehensive documentation for the Architecture Portfolio Admin Dashboard - a modern, secure, and user-friendly content management system built specifically for managing architecture projects.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Authentication](#authentication)
5. [Project Management](#project-management)
6. [Database Schema](#database-schema)
7. [Architecture & Design Patterns](#architecture--design-patterns)
8. [Security Features](#security-features)
9. [API Reference](#api-reference)
10. [Troubleshooting](#troubleshooting)

---

## Technology Stack

### Core Framework
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety

### Authentication
- **NextAuth.js v5 (Auth.js)** - Authentication solution
- **bcryptjs** - Password hashing
- **Credentials Provider** - Email/password authentication

### Database
- **Prisma ORM** - Database toolkit
- **SQLite** - Local database (no external services required)
- Located at: `prisma/dev.db`

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Validation
- **Zod** - Schema validation for forms and API inputs

---

## Features

### Authentication System
- Secure credential-based login
- User registration with validation
- Password hashing with bcrypt (10 rounds)
- Session management with NextAuth
- Protected routes with middleware
- Role-based access control (admin only)

### Dashboard Features
- **Overview Dashboard**
  - Project statistics (total, completed, in-progress, concepts)
  - Recent projects list
  - Quick navigation

- **Project Management**
  - Create, Read, Update, Delete (CRUD) operations
  - Multi-image upload support
  - Rich form validation
  - Search and filtering
  - Status tracking (completado, en progreso, concept)
  - Typology categorization

- **UI Components**
  - Modern, responsive sidebar navigation
  - Header with search and notifications
  - Data tables with actions
  - Form components with validation
  - Loading states and error handling
  - Toast notifications

---

## Getting Started

### Prerequisites
- Node.js 20+ installed
- pnpm package manager

### Initial Setup

1. **Install Dependencies**
```bash
pnpm install
```

2. **Set Up Environment Variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
AUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

3. **Run Database Migrations**
```bash
npx prisma migrate dev
```

4. **Seed the Database**
```bash
pnpm db:seed
```

This will:
- Create a default admin user
- Migrate all existing projects from `lib/constants/projects.ts`

5. **Start Development Server**
```bash
pnpm dev
```

The application will be available at: `http://localhost:3000`

---

## Authentication

### Happy Path: First Time Setup

#### Step 1: Register an Admin Account

1. Navigate to: `http://localhost:3000/admin/register`

2. Fill in the registration form:
   - **Full Name**: Your name (e.g., "John Doe")
   - **Email**: Your email address (e.g., "admin@example.com")
   - **Password**: At least 6 characters

3. Click "Create Account"

4. You will be automatically redirected to the login page after 2 seconds

#### Step 2: Login to Dashboard

1. Navigate to: `http://localhost:3000/admin/login`

2. Enter your credentials:
   - **Email**: The email you registered with
   - **Password**: Your password

3. Click "Sign In"

4. You will be redirected to: `http://localhost:3000/admin/dashboard`

### Default Credentials (Seeded User)

If you ran the seed script, a default admin account was created:

```
Email: admin@architecture.com
Password: admin123
```

**Important**: Change this password immediately in production!

### Authentication Flow

```
User Request → Middleware Check → Protected Route
                      ↓
              Is Authenticated?
                   /    \
                 No      Yes
                 ↓        ↓
          Redirect    Allow
           to Login    Access
```

### Protected Routes

All routes under `/admin/dashboard/*` are protected and require authentication:
- `/admin/dashboard` - Overview
- `/admin/dashboard/projects` - Projects list
- `/admin/dashboard/projects/new` - Create project
- `/admin/dashboard/projects/[id]/edit` - Edit project
- `/admin/dashboard/settings` - Settings

### Session Management

- Sessions are managed by NextAuth.js
- Session data is stored in JWT tokens
- Sessions persist across browser restarts
- Logout clears the session immediately

---

## Project Management

### Creating a New Project

#### Happy Path: Create Project

1. **Navigate to Projects**
   - Click "Projects" in the sidebar
   - Or go to: `http://localhost:3000/admin/dashboard/projects`

2. **Click "New Project"**
   - Top right corner of the page

3. **Fill in Basic Information**
   - **Title**: Project name (e.g., "Modern Residence")
   - **Slug**: URL-friendly identifier (e.g., "modern-residence")
     - Must be unique
     - Only lowercase letters, numbers, and hyphens
   - **Location**: Project location (e.g., "San Francisco, CA")
   - **Year**: Project year (e.g., "2024")
   - **Status**: Select from dropdown
     - `concept` - Early stage
     - `en progreso` - Currently in development
     - `completado` - Finished project
   - **Typology**: Select category
     - `residencial` - Residential
     - `comercial` - Commercial
     - `uso mixto` - Mixed Use
     - `renovación` - Renovation
     - `paisaje` - Landscape
     - `arte` - Art

4. **Add Descriptions**
   - **Short Description**: Brief summary (shown in cards)
   - **Full Description**: Detailed project description

5. **Add Additional Details** (Optional)
   - **Area**: Project size (e.g., "5,500 sq ft")
   - **Client**: Client name
   - **Tags**: Comma-separated tags (e.g., "Award, Team, Residential")
   - **Featured**: Check to feature on homepage

6. **Upload Images**
   - **Featured Image**: Main project image URL (e.g., "/image.png")
   - **Gallery Images**: Add multiple image URLs
     - Enter URL in input field
     - Click "Add" button
     - Repeat for each image
     - Remove images by clicking "Remove"

7. **Submit**
   - Click "Create Project"
   - Success message appears
   - Redirected to projects list after 2 seconds

### Editing a Project

1. Navigate to projects list
2. Find the project you want to edit
3. Click the pencil icon (Edit)
4. Modify any fields
5. Click "Update Project"

### Deleting a Project

1. Navigate to projects list
2. Find the project you want to delete
3. Click the trash icon (Delete)
4. Confirm deletion in the dialog
5. Project is immediately removed

### Viewing Projects

#### In Dashboard
- View all projects in table format
- See status, typology, and year at a glance
- Click project name to view details

#### On Public Site
- Click the external link icon to view the project on the live site
- Opens in a new tab

---

## Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String   // Hashed with bcrypt
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Project Model

```prisma
model Project {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String
  location         String
  year             String
  status           String   // 'completado' | 'en progreso' | 'concept'
  typology         String   // 'residencial' | 'comercial' | etc.
  description      String
  shortDescription String
  images           String   // JSON array
  featuredImage    String
  tags             String?  // JSON array (optional)
  area             String?  // Optional
  client           String?  // Optional
  team             String?  // JSON array (optional)
  featured         Boolean  @default(false)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

### Database Location
- Development: `prisma/dev.db` (SQLite)
- No external database service required
- Fully portable and version-controlled

---

## Architecture & Design Patterns

### Application Structure

```
app/
├── admin/
│   ├── login/page.tsx           # Login page
│   ├── register/page.tsx        # Registration page
│   └── dashboard/
│       ├── layout.tsx            # Dashboard layout with sidebar
│       ├── page.tsx              # Dashboard overview
│       ├── projects/
│       │   ├── page.tsx          # Projects list
│       │   ├── new/page.tsx      # Create project
│       │   └── [id]/edit/page.tsx # Edit project
│       └── settings/page.tsx     # Settings (future)
│
├── api/auth/[...nextauth]/route.ts  # NextAuth API routes
│
components/
├── admin/
│   ├── AdminSidebar.tsx         # Sidebar navigation
│   ├── AdminHeader.tsx          # Top header
│   ├── ProjectForm.tsx          # Project create/edit form
│   └── DeleteProjectButton.tsx  # Delete action
│
lib/
├── actions/
│   ├── auth.ts                  # Auth server actions
│   └── projects.ts              # Project CRUD actions
├── db.ts                        # Prisma client
└── types.ts                     # TypeScript types
│
prisma/
├── schema.prisma                # Database schema
├── seed.ts                      # Seed script
└── migrations/                  # Database migrations
```

### Design Patterns Used

#### 1. **Server Components** (Default)
- Most components are React Server Components
- Data fetching happens on the server
- Reduces client-side JavaScript

#### 2. **Server Actions**
- Form submissions use Server Actions
- Type-safe mutations with Zod validation
- Automatic revalidation with `revalidatePath()`

#### 3. **Middleware Protection**
- `middleware.ts` protects all `/admin/*` routes
- Redirects unauthenticated users
- Runs before page renders

#### 4. **Component Composition**
- Small, focused components
- Reusable UI elements
- Props-based customization

#### 5. **Progressive Enhancement**
- Forms work without JavaScript
- Client-side enhancements (animations, real-time validation)
- Graceful degradation

---

## Security Features

### Authentication Security

1. **Password Hashing**
   - bcrypt with 10 salt rounds
   - Never stores plain text passwords
   - One-way encryption

2. **Session Management**
   - JWT-based sessions
   - HTTP-only cookies
   - Automatic session expiration

3. **Input Validation**
   - Zod schema validation
   - Server-side and client-side
   - Prevents injection attacks

4. **Protected Routes**
   - Middleware checks authentication
   - Role-based access control
   - Automatic redirects

### Best Practices Implemented

- ✅ HTTPS in production (configure in deployment)
- ✅ Environment variables for secrets
- ✅ No sensitive data in client bundle
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS prevention (React escaping)
- ✅ CSRF protection (NextAuth built-in)

### Production Checklist

Before deploying to production:

- [ ] Change `AUTH_SECRET` to a strong random value
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable HTTPS
- [ ] Remove or secure the register endpoint (if single admin)
- [ ] Set up proper backup strategy
- [ ] Configure rate limiting
- [ ] Monitor authentication logs

---

## API Reference

### Server Actions

#### Authentication Actions

**`authenticate(prevState, formData)`**
- Authenticates user with credentials
- **Parameters**: FormData with email and password
- **Returns**: Error message or redirects to dashboard

**`register(prevState, formData)`**
- Creates a new admin user
- **Parameters**: FormData with name, email, password
- **Returns**: Success/error message

**`logout()`**
- Signs out the current user
- **Returns**: Redirects to login

#### Project Actions

**`createProject(prevState, formData)`**
- Creates a new project
- **Authorization**: Admin only
- **Validation**: Zod schema
- **Returns**: Success/error with validation errors

**`updateProject(id, prevState, formData)`**
- Updates an existing project
- **Parameters**: Project ID, FormData
- **Authorization**: Admin only
- **Returns**: Success/error with validation errors

**`deleteProject(id)`**
- Deletes a project
- **Parameters**: Project ID
- **Authorization**: Admin only
- **Returns**: Redirects to projects list

**`getProject(id)`**
- Fetches a single project
- **Parameters**: Project ID
- **Returns**: Project object or null

**`getAllProjects()`**
- Fetches all projects
- **Returns**: Array of projects ordered by updatedAt

---

## Troubleshooting

### Common Issues

#### Issue: "Database does not exist"

**Solution:**
```bash
npx prisma migrate dev
```

#### Issue: "AUTH_SECRET is not set"

**Solution:**
1. Create `.env` file in root
2. Add: `AUTH_SECRET="your-secret-here"`
3. Generate with: `openssl rand -base64 32`

#### Issue: "Cannot find module '@prisma/client'"

**Solution:**
```bash
npx prisma generate
```

#### Issue: Login redirects back to login page

**Possible causes:**
1. Incorrect credentials
2. Database not seeded
3. AUTH_SECRET mismatch

**Solution:**
```bash
# Reset database and reseed
npx prisma migrate reset
pnpm db:seed
```

#### Issue: "Error: ENOENT: no such file or directory"

**Solution:**
Ensure you're running commands from the project root directory.

#### Issue: Images not displaying

**Possible causes:**
1. Image paths incorrect
2. Images not in public folder

**Solution:**
- Ensure images are in `/public` directory
- Use paths like `/image.png` (not `public/image.png`)

### Database Tools

**View Database in Browser:**
```bash
pnpm db:studio
```
Opens Prisma Studio at `http://localhost:5555`

**Reset Database:**
```bash
npx prisma migrate reset
```
Warning: This deletes all data!

**Create New Migration:**
```bash
npx prisma migrate dev --name your_migration_name
```

---

## Future Enhancements

### Planned Features
- [ ] File upload for images (instead of URLs)
- [ ] Image optimization and CDN integration
- [ ] Bulk project operations
- [ ] Project categories/filters
- [ ] Activity logs and audit trail
- [ ] Team member management
- [ ] Advanced search and filtering
- [ ] Export projects to PDF
- [ ] Multi-language support
- [ ] Dark mode toggle

### Scalability Considerations

**When to migrate from SQLite:**
- More than 5 concurrent admin users
- Large number of projects (1000+)
- Need for advanced querying
- Production deployment

**Recommended production database:**
- PostgreSQL (via Neon, Supabase, or Vercel Postgres)
- Simple migration: Update `DATABASE_URL` in `.env`
- Run migrations: `npx prisma migrate deploy`

---

## Support & Maintenance

### Updating Dependencies

```bash
# Check for updates
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm update next-auth@latest
```

### Backup Strategy

**Database Backup:**
```bash
# SQLite - simple file copy
cp prisma/dev.db prisma/backup-$(date +%Y%m%d).db
```

**Full Backup:**
- Back up entire project directory
- Ensure `.env` is backed up securely (separate from code)
- Regular automated backups recommended

---

## Tech Stack Summary

This admin dashboard was built following modern web development best practices observed in leading tech companies:

### What Tech Companies Do
- **Vercel**: Next.js App Router, Server Actions
- **GitHub**: Prisma ORM, TypeScript
- **Stripe**: NextAuth.js, Zod validation
- **Linear**: Modern UI with Framer Motion
- **Notion**: Real-time updates, optimistic UI

### Why This Stack
- **No external services needed** - SQLite runs locally
- **Zero configuration** - Works out of the box
- **Type-safe** - TypeScript throughout
- **Modern patterns** - React Server Components, Server Actions
- **Great DX** - Hot reload, type checking, auto-completion
- **Production ready** - Easy migration path to PostgreSQL

---

## License & Credits

Built with:
- Next.js by Vercel
- Prisma ORM
- NextAuth.js / Auth.js
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Lucide Icons

---

**Last Updated:** January 2025
**Version:** 1.0.0
