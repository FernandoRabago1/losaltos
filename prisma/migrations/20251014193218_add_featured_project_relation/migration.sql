-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FeaturedProject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FeaturedProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FeaturedProject" ("createdAt", "enabled", "id", "order", "projectId", "updatedAt") SELECT "createdAt", "enabled", "id", "order", "projectId", "updatedAt" FROM "FeaturedProject";
DROP TABLE "FeaturedProject";
ALTER TABLE "new_FeaturedProject" RENAME TO "FeaturedProject";
CREATE INDEX "FeaturedProject_order_idx" ON "FeaturedProject"("order");
CREATE UNIQUE INDEX "FeaturedProject_projectId_key" ON "FeaturedProject"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
