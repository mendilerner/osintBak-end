import express from "express";
import { handleLogin, handleSendEmailToJoin, handleUserRegistration } from "./users.controller";
import auth from "../middleWare/authMiddleWare/authService";

const router = express.Router();

router.post("/register", auth, handleUserRegistration);
router.post("/auth/login", handleLogin);
router.post("/sendEmailToJoin", handleSendEmailToJoin)

export default router;
