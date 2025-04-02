import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../configurations/config";
import { catchAsyncError } from "../utils/catchAsyncError";

export const authMiddleware = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    //getting header
    const authHeader = req.headers.authorization;

    //if header doesnot exist
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(403).json({message:"user not logged in"});
      return;
    }
    //getting jwt_token
    const jwt_token = authHeader?.split(" ")[1];

    // Decoding and verifying the token
    const decoded = jwt.verify(jwt_token, config.JWT_SECRET);

    if (typeof decoded !== "string" && "userId" in decoded) {
      // Now TypeScript knows decoded is a JwtPayload with userId
      req.userId = decoded.userId;

      next();
    } else {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
  }
);
