import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const config = {
  PORT: process.env.PORT || "4000",
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/intern_finder",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || "",
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID || "",
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY || "",
  R2_BUCKET: process.env.R2_BUCKET || "",
  R2_ENDPOINT: process.env.R2_ENDPOINT || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || "",
  FRONTEND_URL: process.env.FRONTEND_URL || "",
  PUBLIC_URL: process.env.PUBLIC_URL || "",
};


export default config;
