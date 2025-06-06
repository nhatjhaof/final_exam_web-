import { Request, Response } from "express";
import { getAllCar, getOwnerInfoByLp, handleUpdateLicensePlate, handleUpdateOwnerInfo } from "../services/car.service";

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
    if (!owner) {
    return res.render("owner-info", {
      owner: null,
      notFoundMessage: "Không tìm thấy thông tin chủ xe",
    });
  }
    res.render("owner-info", {
        owner
    })
}

const postUpdateLicensePlate = async (req: Request, res: Response) => {
    const {vehicleId, license_plate} = req.body;
    await handleUpdateLicensePlate(Number(vehicleId), license_plate);
    return res.redirect("/home");
}

const postUpdateOwnerInfo = async (req: Request, res: Response) => {
    const {id, phone_number, citizen_id, address, license_plate} = req.body;
    const file = req.file;
    const personal_image = file?.filename ?? "";
    await handleUpdateOwnerInfo(id, phone_number, citizen_id, address, license_plate, personal_image);
    return res.redirect("/home");
}
export { getHomePage, getOwnerInfo, postUpdateLicensePlate, postUpdateOwnerInfo }