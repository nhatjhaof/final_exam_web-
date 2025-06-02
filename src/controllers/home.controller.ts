import { Request, Response } from "express";
import { getAllCar } from "services/car.service";

const getHomePage = async (req: Request, res: Response) => {
    const cars = await getAllCar();
    return res.render("homepage.ejs", {
        cars
    });
}
export { getHomePage }