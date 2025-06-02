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
const client_1 = require("../config/client");
function mapLicensePlatesToVehicleImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const vehicles = yield client_1.prisma.vehicle_images.findMany();
        const plates = yield client_1.prisma.license_plates.findMany();
        if (vehicles.length !== plates.length) {
            console.error("❌ Số lượng ảnh xe và biển số không khớp.");
            return;
        }
        for (let i = 0; i < vehicles.length; i++) {
            const vehicle = vehicles[i];
            const plate = plates[i];
            yield client_1.prisma.vehicle_images.update({
                where: { id: vehicle.id },
                data: { license_plate_id: plate.id },
            });
            console.log(`✅ Gán biển số ${plate.license_plate} cho xe ID ${vehicle.id}`);
        }
        console.log("🎉 Mapping hoàn tất!");
    });
}
mapLicensePlatesToVehicleImages().catch(console.error);
//# sourceMappingURL=mapping.js.map