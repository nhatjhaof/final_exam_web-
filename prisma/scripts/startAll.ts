import { convertImages } from "./convertBase64ToImage";
import { mapRelations } from "./mapping";

(async () => {
  console.log("⚙️ Running pre-server tasks...");
  await convertImages();
  await mapRelations();

  console.log("Starting server...");
  await import("../../src/app");
})();
