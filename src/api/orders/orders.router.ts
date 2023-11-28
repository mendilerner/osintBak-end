import express from "express";
import ordersController from "./orders.controller";
import { validateOrder } from "../middleWare/orderValidate/orderValidateor";
import auth from "../middleWare/authMiddleWare/authService";
const router = express.Router();

router.get("/", auth, ordersController.getOrders);
router.get("/:id", ordersController.getOrdersById);
router.post("/", validateOrder, ordersController.postOrder);
router.put("/:id", auth, validateOrder, ordersController.putOrder);

export default router;
