/*
  Warnings:

  - You are about to alter the column `image_data` on the `vehicle_images` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.

*/
-- AlterTable
ALTER TABLE `vehicle_images` MODIFY `image_data` LONGTEXT NULL;
