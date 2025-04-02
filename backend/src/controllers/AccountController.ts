import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../utils/catchAsyncError";
import Account from "../models/AccountModel";
import { transferValidator } from "../zod";
import mongoose from "mongoose";

export const getBalanceController = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const account = await Account.findOne({ userId: req.userId });

    // console.log(account);

    res.status(200).json({
      success: true,
      balance: account?.balance,
    });
  }
);

export const transferController = catchAsyncError(
  //no guarantee for definite transaction (if sender account is debited and application crashes or something else while reciever won't be credited)
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const { success } = transferValidator.safeParse(req.body);

  //     if (!success) {
  //       res.status(411).json({ success: false, message: "invalid inputs" });
  //       return;
  //     }
  //     const { to, amount } = req.body;

  //     const account = await Account.findOne({ userId: req.userId });

  //     // Check if the account exists
  //     if (!account) {
  //       res.status(404).json({
  //         success: false,
  //         message: "Account not found",
  //       });
  //       return;
  //     }

  //     const balance = account?.balance;

  //     if (balance < amount) {
  //       res.status(400).json({
  //         success: false,
  //         message: "insufficient balance",
  //       });
  //       return;
  //     }

  //     const toAccount = await Account.findOne({ userId: to });

  //     if (!toAccount) {
  //       res.status(400).json({
  //         success: false,
  //         message: "invalid account",
  //       });
  //       return;
  //     }

  //     //sender
  //     await Account.updateOne(
  //       { userId: req.userId },
  //       { $inc: { balance: -amount } }
  //     );

  //  res.status(200).json({
  //     success:false,
  //     message:"partial transaction"
  //  })
  //     return;
  //     //reciever
  //     await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

  //     res.status(200).json({
  //       success: true,
  //       message: "tranfer successful",
  //     });
  //   }

  // to provide guaranteed transaction going to use transaction concept of Databases which ensures atomicity

  async (req: Request, res: Response, next: NextFunction) => {
    //creating session
    const session = await mongoose.startSession();

    const { success } = transferValidator.safeParse(req.body);

    if (!success) {
      res.status(411).json({ success: false, message: "invalid inputs" });
      return;
    }
    //starting transaction
    session.startTransaction();

    const { to, amount } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    // Check if the account exists
    if (!account) {
      await session.abortTransaction(); // if no account exist then have to abort transaction
      res.status(404).json({
        success: false,
        message: "Account not found",
      });
      return;
    }

    const balance = account?.balance;

    if (balance < amount) {
      await session.abortTransaction();
      res.status(400).json({
        success: false,
        message: "insufficient balance",
      });
      return;
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      res.status(400).json({
        success: false,
        message: "invalid account",
      });
      return;
    }

    //sender
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    //reciever
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "tranfer successful",
    });
  }
);
