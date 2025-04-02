import { NextFunction, Request, Response } from "express";
type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

// Create the wrapper function
export const catchAsyncError = (asyncFn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Use Promise.resolve to handle both sync and async functions
    Promise.resolve(asyncFn(req, res, next)).catch(next);
  };
};
