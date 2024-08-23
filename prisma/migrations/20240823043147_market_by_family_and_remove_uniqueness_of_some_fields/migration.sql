/*
  Warnings:

  - A unique constraint covering the columns `[familyId,code]` on the table `market` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `familyId` to the `market` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "family_name_key";

-- DropIndex
DROP INDEX "market_code_key";

-- DropIndex
DROP INDEX "market_name_key";

-- AlterTable
ALTER TABLE "market" ADD COLUMN     "familyId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "market_familyId_code_key" ON "market"("familyId", "code");

-- AddForeignKey
ALTER TABLE "market" ADD CONSTRAINT "market_familyId_family_id_fk" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
