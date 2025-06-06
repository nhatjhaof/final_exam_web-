import { Router } from "express";
import { waitForNewData, notifyNewData } from "../controllers/polling.controller";

const router = Router();
router.get("/api/poll", waitForNewData);

// Mô phỏng thêm dữ liệu mới để test client nhận real-time
router.post("/api/simulate-new-data", (req, res) => {
  const mock = { message: "Dữ liệu mới được thêm" };
  notifyNewData(mock);
  res.json({ success: true });
});

export default router;