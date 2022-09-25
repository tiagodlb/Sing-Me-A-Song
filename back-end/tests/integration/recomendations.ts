import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationFactory } from "../factories/recommendationFactory";

export async function recommendationTest() {
  const server = supertest(app);

  describe("/POST Recomendation Test suit", () => {
    it("Should create a recommendation", async () => {
      const recommendation = recommendationFactory();

      const result = await server.post("/recommendations").send(recommendation);
      const createdRecommendation = await prisma.recommendation.findFirst({
        where: { name: recommendation.name },
      });
      expect(result.status).toBe(201);
      expect(createdRecommendation).not.toBeNull();
    });
    it("Should try to create a recommendation that already exist", async () => {
        const recommendation = recommendationFactory();

        await server.post("/recommendations").send(recommendation);
        const result = await server.post("/recommendations").send(recommendation);

        expect(result.status).toBe(409);
      });
  });
}
