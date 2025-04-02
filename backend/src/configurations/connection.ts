import mongoose from "mongoose";
import config from "./config";

const mongo_uri: string = String(config.MONGO_URI);

const connectDb = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(mongo_uri, { dbName: "paytm-backend" });
    console.log(`DB connected at host: ${connection.connection.host}`);
  } catch (error) {
    // Log error and propagate it
    console.error("DB connection error:", error);
    throw new Error("Database connection failed"); // Throw to be caught in the main function
  }
};

export default connectDb;
