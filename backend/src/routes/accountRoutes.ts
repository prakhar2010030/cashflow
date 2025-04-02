import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getBalanceController,
  transferController,
} from "../controllers/AccountController";

const router = express.Router();

router.get("/balance", authMiddleware, getBalanceController);
router.post("/transfer", authMiddleware, transferController);

export default router;
