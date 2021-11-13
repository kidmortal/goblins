/*
  Warnings:

  - You are about to drop the column `amount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Product` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "amount",
DROP COLUMN "published";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "amount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserHasProduct" (
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "UserHasProduct_pkey" PRIMARY KEY ("userId","productId")
);

-- AddForeignKey
ALTER TABLE "UserHasProduct" ADD CONSTRAINT "UserHasProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasProduct" ADD CONSTRAINT "UserHasProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
