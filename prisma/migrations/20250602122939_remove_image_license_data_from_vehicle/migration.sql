/*
  Warnings:

  - You are about to drop the column `image_data` on the `vehicle_images` table. All the data in the column will be lost.
  - You are about to drop the column `image_license_data` on the `vehicle_images` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `image_license_data_2` ON `license_plates`;

-- AlterTable
ALTER TABLE `license_plates` ADD COLUMN `image_path` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vehicle_images` DROP COLUMN `image_data`,
    DROP COLUMN `image_license_data`,
    MODIFY `capture_time` DATETIME(3) NULL,
    MODIFY `speed` DOUBLE NULL;

-- CreateIndex
CREATE INDEX `image_license_data` ON `license_plates`(`image_license_data`(3072));
