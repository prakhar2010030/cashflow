import express from "express";
import userRouter from "./userRoute";
import accountRouter from "./accountRoutes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
