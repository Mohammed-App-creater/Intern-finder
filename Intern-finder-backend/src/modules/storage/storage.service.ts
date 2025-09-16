import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import r2 from "../../config/r2";
import env from "../../config/env";

const BUCKET = env.R2_BUCKET;
const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
const PUBLIC_URL = env.PUBLIC_URL;

export const uploadFile = async (key: string, fileBuffer: Buffer, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });
  await r2.send(command);
  return `${PUBLIC_URL}/${key}`;
};

export const profilePicture = async (key: string, fileBuffer: Buffer, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });
  await r2.send(command);
  return `${PUBLIC_URL}/${key}`;
};
