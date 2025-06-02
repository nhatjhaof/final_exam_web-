import { getHomePage } from "../controllers/home.controller";
import express, { Express } from "express";

const router = express.Router();
const webRoutes = (app: Express) => {
    router.get("/", getHomePage)
    app.use("/", router)
}
export default webRoutes;