import dotenv from "dotenv";
// Load environment variables from the .env file first
dotenv.config();

import { app } from ".";
import connectDb from "./configurations/connection";
import config from "./configurations/config"; // Now it's safe to import config

async function main() {
  try {
    // Connect to the database
    const res = await connectDb();

    // Listen on the provided port
    app.listen(config.PORT, () => {
      console.log(`Server is listening at port: ${config.PORT}`);
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main();
