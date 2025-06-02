import { prisma } from "../config/client";
import fs from 'fs';
import path from 'path';
async function main() {

  const vehicles = await prisma.vehicle_images.findMany();
  for (const vehicle of vehicles) {
    if (!vehicle.image_data) continue;
    const buffer = Buffer.from(vehicle.image_data, 'base64');
    const filename = `vehicle_${vehicle.id}.jpg`;
    const outputPath = path.join(__dirname, '../../public/images', filename);
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
    const outputPath = path.join(__dirname, '../../public/license_plates', filename);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, buffer);
    // Nếu bạn cần lưu đường dẫn vào DB, thêm ở đây
  }

console.log('🎉 Convert hoàn tất!');
}
main().catch(console.error);
