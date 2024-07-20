/*
  Warnings:

  - You are about to drop the `p2pTransfer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OnRampStatus" AS ENUM ('Success', 'Failure', 'Processing');

-- DropForeignKey
ALTER TABLE "p2pTransfer" DROP CONSTRAINT "p2pTransfer_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "p2pTransfer" DROP CONSTRAINT "p2pTransfer_toUserId_fkey";

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "status" "OnRampStatus" NOT NULL;

-- DropTable
DROP TABLE "p2pTransfer";
