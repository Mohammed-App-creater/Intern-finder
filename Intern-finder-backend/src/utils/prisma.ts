import { PrismaClient } from "@/generated/prisma";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient();
}

prisma = globalThis.prisma;

export default prisma;
