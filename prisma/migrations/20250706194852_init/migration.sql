-- CreateTable
CREATE TABLE "Veiculo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_placa_key" ON "Veiculo"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
