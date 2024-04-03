import { Router } from "express";

import UserController from "../Controllers/UserController.js"

const router = Router();

router.get("/user", UserController.get_all);
router.get("/user/:id", UserController.get);
router.post("/user", UserController.create);
router.put("/user", UserController.update);
router.delete("/user/:id", UserController.delete);

export default router;