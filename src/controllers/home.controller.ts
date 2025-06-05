import { Request, Response } from "express";
import { getAllCar, getOwnerInfoByLp, handleUpdateLicensePlate } from "../services/car.service";

const getHomePage = async (req: Request, res: Response) => {
    const cars = await getAllCar();
    console.log(cars);
    return res.render("homepage.ejs", {
        cars
    });
}
const getOwnerInfo = async (req: Request, res: Response) => {
    const {lp} = req.params;
    const owner = await getOwnerInfoByLp(lp);
    return res.render("owner-info.ejs",{
        owner
    })
}

const postUpdateLicensePlate = async (req: Request, res: Response) => {
    const {vehicleId, license_plate} = req.body;
    await handleUpdateLicensePlate(Number(vehicleId), license_plate);
    return res.redirect("/home");
}
export { getHomePage, getOwnerInfo, postUpdateLicensePlate }