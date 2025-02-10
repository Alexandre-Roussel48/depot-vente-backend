-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GESTION');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('STOCK', 'SOLD', 'TOWITHDRAW', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DEPOSIT', 'COMMISSION', 'SALE', 'PAY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pwd_hash" TEXT NOT NULL,
    "pwd_salt" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "begin_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "commission" DECIMAL(65,30) NOT NULL,
    "fees" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "editor" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "type" "Type" NOT NULL,
    "session_id" INTEGER NOT NULL,
    "seller_id" TEXT NOT NULL,
    "realgame_id" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Realgame" (
    "id" TEXT NOT NULL,
    "unit_price" DECIMAL(65,30) NOT NULL,
    "status" "Status" NOT NULL,
    "session_id" INTEGER NOT NULL,
    "seller_id" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "Realgame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_number_key" ON "Client"("phone_number");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_realgame_id_fkey" FOREIGN KEY ("realgame_id") REFERENCES "Realgame"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realgame" ADD CONSTRAINT "Realgame_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realgame" ADD CONSTRAINT "Realgame_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realgame" ADD CONSTRAINT "Realgame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
