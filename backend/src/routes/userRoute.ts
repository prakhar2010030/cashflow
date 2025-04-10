import express from "express";
import {
  getProfileController,
  getUserController,
  getUserNameController,
  LoginController,
  signUpController,
  updateController,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signUpController);

router.post("/login", LoginController);

router.get("/getUserName", authMiddleware, getUserNameController);

router.get("/me", authMiddleware, getProfileController);

router.put("/update", authMiddleware, updateController);

router.get("/bulk", authMiddleware, getUserController);

export default router;
