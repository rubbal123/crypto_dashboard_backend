import { Router } from "express";
import { getBalanceHistory } from "../controllers/balanceHistory.controller";

const router = Router();

// ✅ GET /api/balance/history
router.post("/history", getBalanceHistory);

export default router;
