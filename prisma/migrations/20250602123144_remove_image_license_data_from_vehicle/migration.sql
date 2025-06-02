/*
  Warnings:

  - You are about to alter the column `capture_time` on the `vehicle_images` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- DropIndex
DROP INDEX `image_license_data` ON `license_plates`;

-- AlterTable
ALTER TABLE `vehicle_images` ADD COLUMN `image_data` LONGTEXT NULL,
    MODIFY `capture_time` DATETIME(0) NULL,
    MODIFY `speed` FLOAT NULL;

-- CreateIndex
CREATE INDEX `image_license_data` ON `license_plates`(`image_license_data`(3072));
