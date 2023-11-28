import express from "express";
import { handleGetOrders } from "./orders.controller";
import { GetOrdersById } from "./orders.controller";
import { postOrder } from "./orders.controller";
import { putOrder } from "./orders.controller";
import { validateOrder } from "../middleWare/orderValidate/orderValidateor";
import auth from "../middleWare/authMiddleWare/authService";
const router = express.Router();

router.get("/", auth, handleGetOrders);
router.get("/:id", GetOrdersById);
router.post("/", validateOrder, postOrder);
router.put("/:id", auth, validateOrder, putOrder);

export default router;
