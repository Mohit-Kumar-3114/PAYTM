/*
  Warnings:

  - You are about to drop the column `status` on the `OnRampTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "status";

-- DropEnum
DROP TYPE "OnRampStatus";
