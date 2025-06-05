import { prisma } from "../config/client"


const getAllCar = async () => {
    const cars = await prisma.vehicle_images.findMany({
        include:{
            license_plate: true,
        },
    });
    return cars;
};
const getOwnerInfoByLp = async (lp: string) =>{
    const owner = await prisma.vehicle_details.findFirst({
        where:{
            license_plate: lp
        }
    });
    return owner;
}
const handleUpdateLicensePlate = async (
    vehicleId: number
    ,license_plate: string ) =>{
    try {
        const vehicle = await prisma.vehicle_images.findUnique({
            where:{
                id: vehicleId
            }
        });
        if(!vehicle || !(await vehicle).license_plate_id){
            console.log("no found vehicle or license_plate_id");
        }
        await prisma.license_plates.update({
            where:{
                id: vehicle.license_plate_id
            },
            data:{
                license_plate: license_plate
            }
        })
    } catch (err) {
        console.error(err);
    }
}

export { getAllCar, getOwnerInfoByLp, handleUpdateLicensePlate}