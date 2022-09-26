import { prisma } from "../src/database";
import { recommendationFactory } from "../tests/factories/recommendationFactory";

async function main() {
  for (let i = 0; i < 20; i++) {
    await prisma.recommendation.createMany({ data: recommendationFactory(), skipDuplicates: true });
  }
}

main()
  .catch((e) => {
    console.log(e), process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
