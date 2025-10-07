import { Router } from "express";
import { getBalance } from "../controllers/okx.controller";

const router = Router();

router.get("/balance", getBalance);          // GET account balance
//router.post("/order", placeOrder);           // POST place new order
//router.get("/ticker/:instId", getTicker);    // GET ticker by instrument

export default router;
