import { prisma } from "../../src/database";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE recommendations`,
  ]);
});



afterAll(async () => {
  prisma.$disconnect();
});
