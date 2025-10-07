import { Router } from "express";
import { getSafeheronBalance ,accountCoinList} from "../controllers/safeheron.controller";

const router = Router();

router.get("/balance", getSafeheronBalance);
router.get("/coinlist", accountCoinList);
export default router;
