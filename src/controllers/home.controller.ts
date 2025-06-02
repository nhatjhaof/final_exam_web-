import { Request, Response } from "express";
import { carsWithOwnerInfo, getAllCar, getDetailCar } from "../services/car.service";

const getHomePage = async (req: Request, res: Response) => {
    const cars = await carsWithOwnerInfo();
    console.log(cars);
    return res.render("homepage.ejs", {
        cars
    });
}
export { getHomePage }