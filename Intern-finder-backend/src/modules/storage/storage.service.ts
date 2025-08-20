import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import r2 from "../../config/r2";

const BUCKET = process.env.R2_BUCKET_NAME!;

export const uploadFile = async (key: string, fileBuffer: Buffer, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2.send(command);
  return `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${BUCKET}/${key}`;
};

export const getFileUrl = (key: string) => {
  // Public URL (if bucket is public)
  return `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${BUCKET}/${key}`;
};
