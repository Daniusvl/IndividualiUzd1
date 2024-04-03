import { Router } from "express";

import MenuController from "../Controllers/MenuController.js";

const router = Router();

router.get("/menu", MenuController.get_all);
router.get("/menu/:id", MenuController.get);
router.post("/menu", MenuController.create);
router.put("/menu", MenuController.update);
router.delete("/menu/:id", MenuController.delete);

export default router;