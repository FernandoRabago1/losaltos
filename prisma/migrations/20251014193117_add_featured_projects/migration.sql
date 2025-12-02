-- CreateTable
CREATE TABLE "FeaturedProject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "FeaturedProject_order_idx" ON "FeaturedProject"("order");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedProject_projectId_key" ON "FeaturedProject"("projectId");
