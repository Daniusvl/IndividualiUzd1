import { Router } from "express";

import OrderController from "../Controllers/OrderController.js"

const router = Router();

router.get("/order/:user_id/", OrderController.get_all);
router.get("/order/:user_id/:order_id", OrderController.get);
router.post("/order", OrderController.create);
router.delete("/order/:user_id/:order_id", OrderController.delete);

export default router;