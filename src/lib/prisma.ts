import { PrismaClient } from "@prisma/client";

// In some environments, Next.js doesn't load .env into process.env before Prisma initializes
if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not found in process.env. Prisma may fail to connect.");
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
