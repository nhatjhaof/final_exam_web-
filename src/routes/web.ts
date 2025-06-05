import { getHomePage, getOwnerInfo, postUpdateLicensePlate } from "../controllers/home.controller";
import express, { Express } from "express";

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage);
    router.get("/home", getHomePage);
    router.get("/owner-info/:lp",getOwnerInfo);
    router.post("/update-license-plate", postUpdateLicensePlate);
    
    app.use("/", router)
}
export default webRoutes;