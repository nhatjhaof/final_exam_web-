/*
  Warnings:

  - A unique constraint covering the columns `[license_plate]` on the table `license_plates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[license_plate]` on the table `vehicle_details` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `image_license_data` ON `license_plates`;

-- CreateIndex
CREATE UNIQUE INDEX `license_plates_license_plate_key` ON `license_plates`(`license_plate`);

-- CreateIndex
CREATE INDEX `image_license_data` ON `license_plates`(`image_license_data`(3072));

-- CreateIndex
CREATE UNIQUE INDEX `vehicle_details_license_plate_key` ON `vehicle_details`(`license_plate`);

-- AddForeignKey
ALTER TABLE `vehicle_details` ADD CONSTRAINT `vehicle_details_license_plate_fkey` FOREIGN KEY (`license_plate`) REFERENCES `license_plates`(`license_plate`) ON DELETE SET NULL ON UPDATE CASCADE;
