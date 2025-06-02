import { prisma } from "../config/client"


const getAllCar = async () => {
    const cars = await prisma.vehicle_images.findMany({
        include:{
            license_plate: true,
        },
    });
    return cars;
};
const getDetailCar = async() =>{
    const owners = await prisma.license_plates.findMany({
        include: {
            owner: true
        }
    });
    return owners;
}
const carsWithOwnerInfo = async () => {
  const cars = await getAllCar();
  const owners = await getDetailCar();

  const carsWithOwnerInfo = cars.map((car) => {
    const licensePlateNumber = car.license_plate?.license_plate;
    const matched = owners.find((lp) => lp.license_plate === licensePlateNumber);
    const owner = matched?.owner;

    const ownerInfo = owner
      ? `SĐT: ${owner.phone_number || "N/A"}, CCCD: ${owner.citizen_id || "N/A"}, Địa chỉ: ${owner.address || "N/A"}`
      : "Không có thông tin";

    return {
      ...car, // giữ nguyên thông tin xe
      owner_info: ownerInfo,
    };
  });

  return carsWithOwnerInfo;
};

export { getAllCar, getDetailCar, carsWithOwnerInfo}