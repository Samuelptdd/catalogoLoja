-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('ROUPA', 'RELOGIO');

-- CreateTable
CREATE TABLE "roupas" (
    "id" SERIAL NOT NULL,
    "mark" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "style" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roupas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relogios" (
    "id" SERIAL NOT NULL,
    "mark" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "relogios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fornecedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedor_produto" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "productType" "ProductType" NOT NULL,
    "clotheId" INTEGER,
    "clockId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fornecedor_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fornecedores_name_key" ON "fornecedores"("name");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "fornecedor_produto" ADD CONSTRAINT "fornecedor_produto_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "fornecedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fornecedor_produto" ADD CONSTRAINT "fornecedor_produto_clotheId_fkey" FOREIGN KEY ("clotheId") REFERENCES "roupas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fornecedor_produto" ADD CONSTRAINT "fornecedor_produto_clockId_fkey" FOREIGN KEY ("clockId") REFERENCES "relogios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
