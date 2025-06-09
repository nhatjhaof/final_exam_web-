import { convertImages } from "./convertBase64ToImage";
import { mapRelations } from "./mapping";

(async () => {
  console.log("⚙️ Đang chạy các tác vụ chuẩn bị dữ liệu...");
  await convertImages();
  await mapRelations();
  console.log("✅ Mapping và chuyển đổi ảnh hoàn tất.");
  await import("../../src/app");
})();
