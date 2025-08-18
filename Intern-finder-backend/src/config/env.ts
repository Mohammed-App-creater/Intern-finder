const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const config = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  NODE_ENV: process.env.NODE_ENV || "development",
};

module.exports = config;
