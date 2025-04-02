import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../utils/catchAsyncError";
import { loginValidator, signupValidator, updateValidator } from "../zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import config from "../configurations/config";
import Account from "../models/AccountModel";

export const signUpController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //input validation
    const { success } = signupValidator.safeParse(req.body);

    // console.log("response:", response.success);

    if (!success) {
      res.status(411).json({
        message: "Incorrect inputs",
      });
      return;
    }

    const { email, password, firstname, lastname } = req.body;

    //if user with provided email already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(411).json({
        success: false,
        message: "user already exists with this email!!!",
      });
      return;
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 8);

    //storing user in db
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName: firstname,
      lastName: lastname,
    });
    
    //giving user ranodm amount of money between 1 and 10000
    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000,
    });

    // generating token
    const token = await jwt.sign(
      { userId: user._id.toString() },
      config.JWT_SECRET
    );

    res
      .status(200)
      .json({ success: true, token, message: "user registered successfully" });
  }
);

export const LoginController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //input validation
    const { success } = loginValidator.safeParse(req.body);

    // console.log("response:", response.success);

    if (!success) {
      res.status(411).json({
        message: "Incorrect inputs",
      });
      return;
    }

    const { email, password } = req.body;

    //user with provided email
    const user = await User.findOne({ email });

    // if user doesn't exist
    if (!user) {
      res.status(411).json({ success: false, message: "invalid email!!" });
      return;
    }

    const userPassword = String(user?.password);

    //comparing  passwords
    const hashedPassword = await bcrypt.compare(password, userPassword);

    if (!hashedPassword) {
      res
        .status(411)
        .json({ success: false, message: "incorrect credentials" });
      return;
    }

    // generating token
    const token = await jwt.sign(
      { userId: user?._id.toString() },
      config.JWT_SECRET
    );

    res
      .status(200)
      .json({ success: true, token, message: "user logged in successfully" });
  }
);

export const updateController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success } = updateValidator.safeParse(req.body);

    if (!success) {
      res.status(411).json({
        success: false,
        message: "incorrect inputs",
      });
      return;
    }

    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 8);
    }

    const response = await User.updateOne(
      { _id: req.userId },
      {
        password: req.body.password && hashedPassword,
        firstName: req.body?.firstname,
        lastName: req.body?.lastname,
      }
    );

    // console.log(response)

    res
      .status(200)
      .json({ success: true, message: "user updated successfully" });
  }
);

export const getUserController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { filter } = req.query;

    const user = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    })
      .select("-password")
      .select("-__v");

    console.log(user);
    res.status(200).json({ success: true, message: user });
  }
);
