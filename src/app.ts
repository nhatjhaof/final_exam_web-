// src/app.ts
import express from "express";
import { convertImages } from "../prisma/scripts/convertBase64ToImage";
import { mapRelations } from "../prisma/scripts/mapping";
import webRoutes from "../src/routes/web";
import path from "path";

const app = express();
const port = 8081;

(async () => {
  //Convert ảnh + map biển số 1 lần duy nhất khi khởi động
  await convertImages();
  await mapRelations();

  //Thiết lập cấu hình Express
  app.use(express.static("public"));
  app.use(express.json());

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  //Khai báo router
  webRoutes(app);

  //Khởi động server
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  //Auto-convert ảnh mới mỗi 10 giây
  setInterval(async () => {
    console.log("Auto converting new images...");
    try {
      await convertImages();
    } catch (err) {
      console.error("Auto convert error:", err);
    }
  },10000);
  setInterval(async () => {
  console.log("Auto mapping license plates...");
  try {
    await mapRelations();
  } catch (err) {
    console.error("Auto mapping error:", err);
  }
},10000);
})();
