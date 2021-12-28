/*
  Warnings:

  - You are about to drop the column `fineTypeId` on the `Fine` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Fine_fineTypeId_idx` ON `Fine`;

-- AlterTable
ALTER TABLE `Fine` DROP COLUMN `fineTypeId`,
    ADD COLUMN `price` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `title` VARCHAR(191) NOT NULL DEFAULT 'Missing title';
