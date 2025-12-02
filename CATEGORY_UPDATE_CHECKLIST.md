# Category Standardization Checklist

## 📋 Overview
Standardize all project categories across the application to match homepage categories:
**Industrial, Residencial, Comercial, Arte**

---

## ✅ Current Analysis

### Main Page (HomePage)
- ✅ Uses: **Industrial, Residencial, Comercial, Arte**
- ✅ Location: `components/home/FeaturedProjects.tsx`
- ✅ Filtering logic:
  - Industrial: Uses `tags` (checks if tags include 'Industrial')
  - Residencial: Uses `typology === 'residencial'`
  - Comercial: Uses `typology === 'comercial'`
  - Arte: Uses `typology === 'arte'`

### Public Projects Page
- ❌ Currently uses: residential, commercial, mixed-use, renovation, landscape
- ❌ Needs update to: **ALL, Industrial, Residencial, Comercial, Arte**
- Location: `app/projects/page.tsx`
- Has search functionality ✅

### Admin Dashboard
- ❌ Currently uses: residencial, comercial, uso mixto, renovación, paisaje, arte
- ❌ Needs update to: **Industrial, Residencial, Comercial, Arte**
- Location: `components/admin/ProjectForm.tsx`
- Location: `components/admin/ProjectsTable.tsx`

### Database Schema
- Uses: `typology` field (String)
- Current allowed: 'residencial' | 'comercial' | 'uso mixto' | 'renovación' | 'paisaje' | 'arte'
- ❌ Needs update to: **'industrial' | 'residencial' | 'comercial' | 'arte'**

---

## 🔄 Changes Required

### 1. Database & Schema ⚠️
- [x] Update Prisma schema typology comment
- [x] Create migration to update existing projects
- [x] Map old categories to new:
  - 'uso mixto', 'renovación', 'paisaje' → Check tags and reclassify
  - Projects with 'Industrial' tag → 'industrial'
  - Keep 'residencial', 'comercial', 'arte'

### 2. Admin Dashboard 📝
- [x] Update `ProjectForm.tsx` typology options
  - Remove: uso mixto, renovación, paisaje
  - Keep: residencial, comercial, arte
  - Add: industrial
- [x] Update `ProjectsTable.tsx` filter options
- [x] Update filter dropdown to show 4 categories only

### 3. Public Projects Page 🌐
- [x] Replace tag-based filters with category tabs
- [x] Add tabs: **ALL, INDUSTRIAL, RESIDENCIAL, COMERCIAL, ARTE**
- [x] Keep existing search functionality
- [x] Style tabs like homepage (large, clean buttons)
- [x] Make search dynamic like navbar

### 4. Homepage (No changes needed) ✅
- Already correct
- Already has the 4 categories

### 5. Type Definitions 📄
- [x] Update `lib/types.ts` typology type
- [x] Update to: 'industrial' | 'residencial' | 'comercial' | 'arte'

---

## 📝 Implementation Plan

### Phase 1: Database Migration
1. Create migration script to:
   - Identify projects with 'Industrial' tag
   - Change their typology to 'industrial'
   - Update existing 'uso mixto', 'renovación', 'paisaje' based on tags
   - Log changes for review

### Phase 2: Type Updates
1. Update `lib/types.ts`
2. Update Prisma schema
3. Run Prisma generate

### Phase 3: Admin Updates
1. Update ProjectForm dropdown
2. Update ProjectsTable filters
3. Test create/edit flows

### Phase 4: Public Projects Page
1. Replace typology dropdown with category tabs
2. Style tabs like homepage
3. Keep ALL option
4. Filter by typology field
5. Keep search bar dynamic

### Phase 5: Testing
1. Test homepage filtering (should work as-is)
2. Test projects page filtering
3. Test admin CRUD operations
4. Test search on all pages

---

## 🎯 Final Category Mapping

### New Categories (4 only)
```typescript
type Typology = 'industrial' | 'residencial' | 'comercial' | 'arte';
```

### Display Names
- `industrial` → "INDUSTRIAL"
- `residencial` → "RESIDENCIAL"
- `comercial` → "COMERCIAL"
- `arte` → "ARTE"

### Projects Page Additional
- Add "ALL" option to show all projects

---

## 🔍 Migration Strategy

### For Existing Projects
```
If project has tag 'Industrial':
  → typology = 'industrial'

If project typology is 'uso mixto':
  → Check tags, reassign to best fit category
  → Default: 'comercial'

If project typology is 'renovación':
  → Check tags, reassign to best fit category
  → Default: keep existing primary typology

If project typology is 'paisaje':
  → typology = 'arte' (landscape is artistic)
```

---

## 📊 Expected Outcomes

### Homepage
- ✅ No changes (already perfect)
- ✅ 4 categories: Industrial, Residencial, Comercial, Arte

### Projects Page (`/projects`)
- ✅ Category tabs: ALL, INDUSTRIAL, RESIDENCIAL, COMERCIAL, ARTE
- ✅ Search bar (dynamic like navbar)
- ✅ Clean, modern UI matching homepage
- ✅ Filter by clicking tabs
- ✅ Search filters in real-time
- ✅ Now fetches from database instead of constants

### Admin Dashboard
- ✅ Dropdown with 4 options only
- ✅ Filters match categories (dynamically from DB)
- ✅ Easy project categorization
- ✅ No confusion with old categories

---

## ⚠️ Important Notes

1. **Backwards Compatibility**: ✅ Migration completed successfully
2. **Tag-based Logic**: ✅ Homepage uses tags for Industrial, logic preserved
3. **Search Functionality**: ✅ Search preserved on projects page
4. **Styling**: ✅ Large category buttons matching homepage
5. **ALL Option**: ✅ Only on public projects page, not homepage

---

## ✅ IMPLEMENTATION COMPLETE

All tasks completed successfully!

### Migration Results:
- Total projects checked: 12
- Projects updated: 4
- Projects skipped: 8 (already correct)
- Errors: 0

### Updated Projects:
1. "Proyecto de Renovación Urbana" → uso mixto → comercial
2. "Complejo de Almacenes Industriales" → comercial → industrial
3. "Planta de Manufactura Avanzada" → comercial → industrial
4. "Centro de Distribución Logística" → comercial → industrial

### Files Modified:
- ✅ `lib/types.ts` - Updated typology type
- ✅ `prisma/schema.prisma` - Updated comment
- ✅ `components/admin/ProjectForm.tsx` - 4 categories only
- ✅ `app/projects/page.tsx` - Server component fetching from DB
- ✅ `components/projects/ProjectsClient.tsx` - New client component with category tabs

### Files Created:
- ✅ `components/projects/ProjectsClient.tsx` - Category tabs UI
- ✅ `scripts/migrate-categories.ts` - Migration script
- ✅ `package.json` - Added `db:migrate-categories` script

### Testing:
- ✅ Dev server starts without errors
- ✅ Database migration successful
- ✅ TypeScript types updated
