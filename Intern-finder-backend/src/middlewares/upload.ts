import multer from "multer";

const storage = multer.memoryStorage(); // keep file in memory (not saved to disk)
export const upload = multer({ storage });
