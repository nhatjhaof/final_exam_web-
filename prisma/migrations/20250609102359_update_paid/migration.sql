/*
  Warnings:

  - You are about to alter the column `paid` on the `vehicle_images` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `vehicle_images` MODIFY `paid` BOOLEAN NULL DEFAULT false;
