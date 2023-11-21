import express from "express";
import { handleGetOrders } from "./orders.controller";

const router = express.Router();

router.get("/", handleGetOrders);

export default router;