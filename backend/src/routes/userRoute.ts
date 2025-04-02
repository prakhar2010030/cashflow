import express from "express";
import {
    getUserController,
  LoginController,
  signUpController,
  updateController,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signUpController);

router.post("/login", LoginController);

router.put("/update", authMiddleware, updateController);

router.get("/bulk", authMiddleware, getUserController);

export default router;
