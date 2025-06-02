import { prisma } from "config/client"


const getAllCar = async () => {
    const cars = await prisma.vehicle_images.findMany();
    return cars;
}

export { getAllCar }