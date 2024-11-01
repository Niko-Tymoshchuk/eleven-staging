/*
  Warnings:

  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `myshopifyDomain` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `shopifyShopId` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `myShopifyDomain` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "myShopifyDomain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL
);
INSERT INTO "new_Shop" ("contactEmail", "id", "name") SELECT "contactEmail", "id", "name" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
CREATE UNIQUE INDEX "Shop_myShopifyDomain_key" ON "Shop"("myShopifyDomain");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
