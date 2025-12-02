# Quick Start Guide - Admin Dashboard

## Get Started in 3 Minutes

### 1. Setup (1 minute)

```bash
# Install dependencies
pnpm install

# Create .env file
echo 'DATABASE_URL="file:./dev.db"' > .env
echo 'AUTH_SECRET="'$(openssl rand -base64 32)'"' >> .env
echo 'AUTH_URL="http://localhost:3000"' >> .env

# Run migrations
npx prisma migrate dev

# Seed database
pnpm db:seed
```

### 2. Start Server (30 seconds)

```bash
pnpm dev
```

### 3. Login (30 seconds)

Open: `http://localhost:3000/admin/login`

**Default Credentials:**
```
Email: admin@architecture.com
Password: admin123
```

---

## What You Get

- Modern admin dashboard
- Full CRUD for projects
- Secure authentication
- 12 projects pre-loaded
- Beautiful UI with animations
- Mobile responsive

---

## Quick Commands

```bash
# Development
pnpm dev              # Start dev server

# Database
pnpm db:seed          # Seed database
pnpm db:studio        # Open database viewer
npx prisma migrate dev # Run migrations

# Production
pnpm build            # Build for production
pnpm start            # Start production server
```

---

## Routes

### Public
- `/` - Homepage
- `/projects` - Projects gallery
- `/projects/[slug]` - Project detail

### Admin (Protected)
- `/admin/login` - Login page
- `/admin/register` - Register new admin
- `/admin/dashboard` - Dashboard overview
- `/admin/dashboard/projects` - Manage projects
- `/admin/dashboard/projects/new` - Create project
- `/admin/dashboard/projects/[id]/edit` - Edit project

---

## Happy Paths

### Register & Login
1. Go to `/admin/register`
2. Create account
3. Auto-redirect to `/admin/login`
4. Enter credentials
5. Access dashboard

### Create Project
1. Click "Projects" in sidebar
2. Click "New Project" button
3. Fill form (all fields with asterisk required)
4. Add images (URLs from /public)
5. Click "Create Project"
6. Success! Redirected to projects list

### Edit Project
1. Find project in list
2. Click pencil icon
3. Modify fields
4. Click "Update Project"
5. Changes saved!

### Delete Project
1. Find project in list
2. Click trash icon
3. Confirm deletion
4. Project removed!

---

## Troubleshooting

**"Can't find database"**
```bash
npx prisma migrate dev
```

**"Auth error"**
Check `.env` has `AUTH_SECRET` and `DATABASE_URL`

**"No projects showing"**
```bash
pnpm db:seed
```

---

## Next Steps

1. Change default password
2. Add your own projects
3. Upload your images to `/public`
4. Customize the UI
5. Deploy to production

---

**Need Help?** See `ADMIN_DASHBOARD.md` for full documentation.
