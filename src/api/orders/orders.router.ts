import express from "express";
import { handleGetOrders } from "./orders.controller";
import { GetOrdersById } from "./orders.controller";
import { postOrder } from "./orders.controller";
import { putOrder } from "./orders.controller";
const router = express.Router();

router.get("/", handleGetOrders);
router.get("/:id",GetOrdersById);
router.post("/",postOrder);
router.put("/:id",putOrder);
export default router;