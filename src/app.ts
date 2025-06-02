// src/app.ts
import express from "express";
import { convertImages } from "../prisma/scripts/convertBase64ToImage";
import { mapRelations } from "../prisma/scripts/mapping";
import webRoutes from "../src/routes/web";
import path from "path";

const app = express();
const port = 8081;

(async () => {
  await convertImages();
  await mapRelations();

  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  webRoutes(app);

  app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
  });
})();
