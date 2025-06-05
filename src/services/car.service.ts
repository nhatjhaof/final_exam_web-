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
const handleUpdateOwnerInfo = async (
    id: string, 
    phone_number: string, 
    citizen_id: string, 
    address: string, 
    license_plate:string,
    personal_image: string
) => {
    const oldData = await prisma.vehicle_details.findUnique({
        where: {
            id: +id
        }
    });
    if(!oldData){
        throw new Error("No found info")
    }
    const oldPlate = (await oldData).license_plate
    await prisma.vehicle_details.update({
        where:{
            id: +id
        },
        data: {
            phone_number: phone_number,
            citizen_id: citizen_id,
            address: address,
            license_plate: license_plate,
            ...(personal_image !== undefined && { personal_image_data: personal_image })
        }
    });
    if(oldPlate != license_plate){
        await prisma.license_plates.updateMany({
            where:{
                license_plate: oldPlate
            },
            data:{
                license_plate
            }
        });
    }
}

export { getAllCar, getOwnerInfoByLp, handleUpdateLicensePlate, handleUpdateOwnerInfo}