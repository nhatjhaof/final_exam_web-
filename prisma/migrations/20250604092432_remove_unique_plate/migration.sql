-- DropIndex
DROP INDEX `image_license_data` ON `license_plates`;

-- DropIndex
DROP INDEX `license_plates_license_plate_key` ON `license_plates`;

-- CreateIndex
CREATE INDEX `image_license_data` ON `license_plates`(`image_license_data`(3072));
