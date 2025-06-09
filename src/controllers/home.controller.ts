import { Request, RequestHandler, Response } from "express";
import { getAllCar, getOwnerInfoByLp, handleUpdateLicensePlate, handleUpdateOwnerInfo, handleUpdatePaid } from "../services/car.service";

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
    const {id, phone_number, citizen_id, address, license_plate, email} = req.body;
    const file = req.file;
    const personal_image = file?.filename ?? "";
    await handleUpdateOwnerInfo(id, phone_number, citizen_id, address, license_plate, email, personal_image);
    return res.redirect("/home");
}
const postUpdatePaid = async (req: Request, res: Response) => {
    const { id, paid } = req.body;
    try {
        await handleUpdatePaid(Number(id), paid);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Update paid failed", err);
        res.status(500).json({ success: false });
    }
}
export { getHomePage, getOwnerInfo, postUpdateLicensePlate, postUpdateOwnerInfo, postUpdatePaid }