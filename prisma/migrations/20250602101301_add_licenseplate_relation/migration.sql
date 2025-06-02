/*
  Warnings:

  - You are about to alter the column `image_license_data` on the `license_plates` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.
  - You are about to alter the column `personal_image_data` on the `vehicle_details` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.
  - You are about to alter the column `image_license_data` on the `vehicle_images` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.

*/
-- DropIndex
DROP INDEX `image_license_data` ON `license_plates`;

-- DropIndex
DROP INDEX `image_license_data` ON `vehicle_images`;

-- AlterTable
ALTER TABLE `license_plates` MODIFY `image_license_data` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `vehicle_details` MODIFY `personal_image_data` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `vehicle_images` ADD COLUMN `license_plate_id` INTEGER NULL,
    MODIFY `image_license_data` LONGTEXT NULL;

-- AddForeignKey
ALTER TABLE `vehicle_images` ADD CONSTRAINT `vehicle_images_license_plate_id_fkey` FOREIGN KEY (`license_plate_id`) REFERENCES `license_plates`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
