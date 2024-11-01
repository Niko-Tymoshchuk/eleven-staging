/*
  Warnings:

  - You are about to drop the column `myShopifyDomain` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `contactEmail` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `myshopifyDomain` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "myshopifyDomain" TEXT NOT NULL,
    "shopifyShopId" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL
);
INSERT INTO "new_Shop" ("id", "name", "shopifyShopId") SELECT "id", "name", "shopifyShopId" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
CREATE UNIQUE INDEX "Shop_myshopifyDomain_key" ON "Shop"("myshopifyDomain");
CREATE UNIQUE INDEX "Shop_shopifyShopId_key" ON "Shop"("shopifyShopId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
