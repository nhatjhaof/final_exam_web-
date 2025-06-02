-- CreateTable
CREATE TABLE `license_plates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `license_plate` VARCHAR(20) NOT NULL,
    `capture_time` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `image_license_data` LONGBLOB NULL,

    INDEX `image_license_data`(`image_license_data`(255)),
    INDEX `image_license_data_2`(`image_license_data`(3072)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone_number` VARCHAR(15) NULL,
    `citizen_id` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `license_plate` VARCHAR(20) NULL,
    `personal_image_data` LONGBLOB NULL,

    INDEX `fk_license_plate`(`license_plate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_data` LONGBLOB NULL,
    `capture_time` DATETIME(0) NULL,
    `speed` FLOAT NULL,
    `image_license_data` LONGBLOB NULL,
    `image_path` VARCHAR(191) NULL,

    UNIQUE INDEX `image_license_data`(`image_license_data`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
