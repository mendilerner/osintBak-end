import express from "express";
import { handleGetOrders } from "./orders.controller";
import { GetOrdersById } from "./orders.controller";
import { postOrder } from "./orders.controller";
import { putOrder } from "./orders.controller";
import { validateOrder } from "../middleWare/orderValidate/orderValidateor";
const router = express.Router();

router.get("/", handleGetOrders);
router.get("/:id",GetOrdersById);
router.post("/",validateOrder,postOrder);
router.put("/:id",validateOrder,putOrder);
export default router;