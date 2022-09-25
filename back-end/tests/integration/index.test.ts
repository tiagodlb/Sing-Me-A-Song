import { prisma } from "../../src/database";
import { recommendationTest } from "./recomendations";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE recommendations`,
  ]);
});

recommendationTest();
 
afterAll(async () => { 
  prisma.$disconnect();
});
