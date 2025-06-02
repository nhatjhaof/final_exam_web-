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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../config/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const vehicles = yield client_1.prisma.vehicle_images.findMany();
        for (const vehicle of vehicles) {
            if (!vehicle.image_data)
                continue;
            const buffer = Buffer.from(vehicle.image_data, 'base64');
            const filename = `vehicle_${vehicle.id}.jpg`;
            const outputPath = path_1.default.join(__dirname, '../../public/images/vehicle', filename);
            fs_1.default.writeFileSync(outputPath, buffer);
            yield client_1.prisma.vehicle_images.update({
                where: { id: vehicle.id },
                data: { image_path: filename },
            });
        }
        const plates = yield client_1.prisma.license_plates.findMany();
        for (const plate of plates) {
            if (!plate.image_license_data)
                continue;
            const buffer = Buffer.from(plate.image_license_data, 'base64');
            const filename = `plate_${plate.id}.jpg`;
            const outputPath = path_1.default.join(__dirname, '../../public/images/license_plates', filename);
            fs_1.default.writeFileSync(outputPath, buffer);
            // Nếu bạn cần lưu đường dẫn vào DB, thêm ở đây
            yield client_1.prisma.license_plates.update({
                where: { id: plate.id },
                data: { image_path: filename },
            });
        }
        console.log('🎉 Convert hoàn tất!');
    });
}
main().catch(console.error);
//# sourceMappingURL=convertBase64ToImage.js.map