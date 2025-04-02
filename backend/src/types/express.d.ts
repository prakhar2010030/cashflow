import * as express from "express";

// Augment the Express module to include custom properties on the Request object
declare global {
  namespace Express {
    interface Request {
      userId?: string; // userId property added to the Request type
    }
  }
}
