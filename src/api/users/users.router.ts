import express from "express";
import { handleLogin, handleUserRegistration } from "./users.controller";
import auth from "../middleWare/authService";

const router = express.Router();


router.post("/register", auth, handleUserRegistration);
router.post("/auth/login", handleLogin);

export default router;