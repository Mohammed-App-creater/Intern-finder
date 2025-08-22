import { S3Client } from "@aws-sdk/client-s3";
import env from "./env";

const r2 = new S3Client({
  region: "auto", // R2 doesn’t need AWS regions
  endpoint: env.R2_ENDPOINT, // R2 endpoint
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID!,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY!,
  },
});

export default r2;
