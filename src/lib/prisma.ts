import { PrismaClient } from "@prisma/client";

const prisma = (global as any).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (global as any).prisma = prisma;
}

prisma.$connect().catch((err: unknown) => {
  console.error("Prisma connection error:", err);
});

export default prisma;
