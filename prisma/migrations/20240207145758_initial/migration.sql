-- CreateEnum
CREATE TYPE "statusEnum" AS ENUM ('PROCESSING', 'FINISHED', 'ERROR');

-- CreateEnum
CREATE TYPE "recommendedDecisionEnum" AS ENUM ('APPROVE', 'REJECT', 'ANALYZE');

-- CreateTable
CREATE TABLE "tenant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(60) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policy" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(60) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "execution" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenantId" UUID NOT NULL,
    "policyId" UUID NOT NULL,
    "input" JSON NOT NULL,
    "cpf" BIGINT,
    "cnpj" BIGINT,
    "status" "statusEnum" NOT NULL DEFAULT 'PROCESSING',
    "recommendedDecision" "recommendedDecisionEnum",
    "extras" JSON,
    "response" JSON,
    "elapsedTime" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(320) NOT NULL,

    CONSTRAINT "execution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(60) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "recommendedDecision" "recommendedDecisionEnum" NOT NULL DEFAULT 'ANALYZE',
    "description" TEXT,

    CONSTRAINT "validation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "execution_validation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "executionId" UUID NOT NULL,
    "validationCode" VARCHAR(60) NOT NULL,
    "satisfied" BOOLEAN NOT NULL,
    "executed" BOOLEAN NOT NULL,
    "notes" TEXT,

    CONSTRAINT "execution_validation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_code_key" ON "tenant"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_name_key" ON "tenant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "policy_code_key" ON "policy"("code");

-- CreateIndex
CREATE UNIQUE INDEX "policy_name_key" ON "policy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "validation_code_key" ON "validation"("code");

-- AddForeignKey
ALTER TABLE "execution" ADD CONSTRAINT "execution_tenantId_tenant_id_fk" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "execution" ADD CONSTRAINT "execution_policyId_policy_id_fk" FOREIGN KEY ("policyId") REFERENCES "policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "execution_validation" ADD CONSTRAINT "execution_validation_executionId_execution_id_fk" FOREIGN KEY ("executionId") REFERENCES "execution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "execution_validation" ADD CONSTRAINT "validation_validationId_execution_id_fk" FOREIGN KEY ("validationCode") REFERENCES "validation"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;
