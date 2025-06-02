import { prisma } from "../../src/config/client";

export const mapRelations = async() => {
  const vehicles = await prisma.vehicle_images.findMany();
  const plates = await prisma.license_plates.findMany();

  if (vehicles.length !== plates.length) {
    console.error("❌ Số lượng ảnh xe và biển số không khớp.");
    return;
  }

  for (let i = 0; i < vehicles.length; i++) {
    const vehicle = vehicles[i];
    const plate = plates[i];

    await prisma.vehicle_images.update({
      where: { id: vehicle.id },
      data: { license_plate_id: plate.id },
    });

    console.log(`✅ Gán biển số ${plate.license_plate} cho xe ID ${vehicle.id}`);
  }

  console.log("🎉 Mapping hoàn tất!");
}

