/*
  Warnings:

  - You are about to drop the `execution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `execution_validation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `policy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `validation` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "shoppingEventStatusEnum" AS ENUM ('ONGOING', 'CANCELED', 'FINISHED');

-- DropForeignKey
ALTER TABLE "execution" DROP CONSTRAINT "execution_policyId_policy_id_fk";

-- DropForeignKey
ALTER TABLE "execution" DROP CONSTRAINT "execution_tenantId_tenant_id_fk";

-- DropForeignKey
ALTER TABLE "execution_validation" DROP CONSTRAINT "execution_validation_executionId_execution_id_fk";

-- DropForeignKey
ALTER TABLE "execution_validation" DROP CONSTRAINT "validation_validationId_execution_id_fk";

-- DropTable
DROP TABLE "execution";

-- DropTable
DROP TABLE "execution_validation";

-- DropTable
DROP TABLE "policy";

-- DropTable
DROP TABLE "tenant";

-- DropTable
DROP TABLE "validation";

-- DropEnum
DROP TYPE "recommendedDecisionEnum";

-- DropEnum
DROP TYPE "statusEnum";

-- CreateTable
CREATE TABLE "market" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(60) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(320) NOT NULL,

    CONSTRAINT "market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "marketId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "totalPaid" MONEY NOT NULL,
    "wholesaleTotal" MONEY NOT NULL,
    "retailTotal" MONEY NOT NULL,
    "status" "shoppingEventStatusEnum" NOT NULL DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(6),
    "createdBy" VARCHAR(320) NOT NULL,

    CONSTRAINT "shopping_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "shoppingEventId" UUID NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "amount" INTEGER NOT NULL,
    "wholesaleAmount" INTEGER,
    "price" MONEY NOT NULL,
    "wholesalePrice" MONEY,
    "addedAt" TIMESTAMP(6),
    "addedBy" VARCHAR(320) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "market_code_key" ON "market"("code");

-- CreateIndex
CREATE UNIQUE INDEX "market_name_key" ON "market"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

-- AddForeignKey
ALTER TABLE "shopping_event" ADD CONSTRAINT "shopping_event_marketId_market_id_fk" FOREIGN KEY ("marketId") REFERENCES "market"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shoppingEventId_shopping_event_id_fk" FOREIGN KEY ("shoppingEventId") REFERENCES "shopping_event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
