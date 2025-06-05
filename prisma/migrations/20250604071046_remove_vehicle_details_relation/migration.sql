-- DropForeignKey
ALTER TABLE `vehicle_details` DROP FOREIGN KEY `vehicle_details_license_plate_fkey`;

-- DropIndex
DROP INDEX `image_license_data` ON `license_plates`;

-- DropIndex
DROP INDEX `fk_license_plate` ON `vehicle_details`;

-- DropIndex
DROP INDEX `vehicle_details_license_plate_key` ON `vehicle_details`;

-- CreateIndex
CREATE INDEX `image_license_data` ON `license_plates`(`image_license_data`(3072));
