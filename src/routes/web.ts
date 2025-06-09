import fileUploadMiddleware from "../middleware/multer";
import { getHomePage, getOwnerInfo, postUpdateLicensePlate, postUpdateOwnerInfo, postUpdatePaid } from "../controllers/home.controller";
import express, { Express } from "express";

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage);
    router.get("/home", getHomePage);
    router.get("/owner-info/:lp",getOwnerInfo);
    router.post("/update-license-plate", postUpdateLicensePlate);

    router.post("/update-owner", fileUploadMiddleware("personal-image"), postUpdateOwnerInfo);
    router.post("/update-paid-status", postUpdatePaid)
    app.use("/", router)
}
export default webRoutes;