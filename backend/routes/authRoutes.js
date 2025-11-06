import express from "express";
import { registerCompany, login } from "../controllers/authController.js";

const router = express.Router();
router.post("/register-company", registerCompany);
router.post("/login", login);

export default router;
