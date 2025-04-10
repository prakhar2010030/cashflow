import express from "express";
import cors from "cors";
import morgan from "morgan";
import rootRouter from "./routes/index";
export const app = express();

app.use(express.json());

const allowedOrigins = ['https://cashflow-shunnya.netlify.app',"http://localhost:5173"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if you're using cookies/auth headers
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));



app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/v1", rootRouter);
