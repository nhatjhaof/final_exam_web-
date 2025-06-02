"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_controller_1 = require("controllers/home.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const webRoutes = (app) => {
    router.get("/", home_controller_1.getHomePage);
    app.use("/", router);
};
exports.default = webRoutes;
//# sourceMappingURL=web.js.map