import { Router, Request, Response, NextFunction } from "express";
import { login, signup } from "../controllers/auth.controller";
import { validateUser } from "../validators/user.validator";

const router = Router();

router.post("/login", login);
router.post("/signup", validateUser, signup);

export default router;
