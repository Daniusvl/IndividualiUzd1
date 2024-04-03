import { Router } from "express";

import AuthController from "../Controllers/AuthController.js"

const router = Router();

router.get("/auth/login", AuthController.login);
router.delete("/auth/logout", AuthController.logout);

export default router;