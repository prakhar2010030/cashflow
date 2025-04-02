import express from "express";
import cors from "cors";
import morgan from "morgan"
import rootRouter from "./routes/index";
export const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1", rootRouter);
