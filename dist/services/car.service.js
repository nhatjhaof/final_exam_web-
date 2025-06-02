"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailCar = exports.getAllCar = void 0;
const client_1 = require("config/client");
const getAllCar = () => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield client_1.prisma.vehicle_images.findMany({
        include: {
            license_plate: true,
        },
    });
    return cars;
});
exports.getAllCar = getAllCar;
const getDetailCar = () => __awaiter(void 0, void 0, void 0, function* () {
    const owners = yield client_1.prisma.license_plates.findMany({
        include: {
            owner: true
        }
    });
    return owners;
});
exports.getDetailCar = getDetailCar;
//# sourceMappingURL=car.service.js.map