// console.log('process.env.PORT:', process.env.PORT);

const config = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  JWT_SECRET: process.env.JWT_SECRET || "default-jwt-secret",
  MONGO_URI: process.env.MONGO_URI || "",
};

// console.log('config.PORT:', config.PORT);

export default config;
