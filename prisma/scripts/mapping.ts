import { prisma } from "../../src/config/client";

export const mapRelations = async () => {
  const vehicles = await prisma.vehicle_images.findMany({
    orderBy: { id: "asc" }
  });

  const plates = await prisma.license_plates.findMany({
    orderBy: { id: "asc" }
  });

  const length = Math.min(vehicles.length, plates.length);
  console.log(`Đang gán lại license_plate_id cho ${length} xe...`);

  for (let i = 0; i < length; i++) {
    const vehicle = vehicles[i];
    const plate = plates[i];

    await prisma.vehicle_images.update({
      where: { id: vehicle.id },
      data: { license_plate_id: plate.id },
    });

    console.log(`Gán lại biển số ${plate.license_plate} cho xe ID ${vehicle.id}`);
  }

  console.log("Mapping hoàn tất (gán lại toàn bộ).");
};
