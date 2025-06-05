import { prisma } from "../../src/config/client";
import fs from 'fs';
import path from 'path';
export const convertImages = async() => {

  const vehicles = await prisma.vehicle_images.findMany();
  for (const vehicle of vehicles) {
    if (!vehicle.image_data) continue;
    const buffer = Buffer.from(vehicle.image_data, 'base64');
    const filename = `vehicle_${vehicle.id}.jpg`;
    const outputPath = path.join(__dirname, '../../public/images/vehicle', filename);
    fs.writeFileSync(outputPath, buffer);
    await prisma.vehicle_images.update({
      where: { id: vehicle.id },
      data: { image_path: filename },
    });
}


 const plates = await prisma.license_plates.findMany();
  for (const plate of plates) {
    if (!plate.image_license_data) continue;
    const buffer = Buffer.from(plate.image_license_data, 'base64');
    const filename = `plate_${plate.id}.jpg`;
    const outputPath = path.join(__dirname, '../../public/images/license_plates', filename);
    fs.writeFileSync(outputPath, buffer);
    // Nếu bạn cần lưu đường dẫn vào DB, thêm ở đây
    await prisma.license_plates.update({
      where: { id: plate.id },
      data: { image_path: filename },
    });
  }

console.log('Convert hoàn tất!');
}

