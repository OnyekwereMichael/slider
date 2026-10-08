import { PrismaClient } from "./lib/generated/prisma/client";

async function main() {
  const prisma = new PrismaClient({ log: ['error', 'warn'] } as any);
  await prisma.$connect();
  console.log("Connected successfully!");
  await prisma.$disconnect();
}

main().catch(console.error);
