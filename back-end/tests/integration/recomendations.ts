import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { idFactory } from "../factories/idFactory";
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
    it("Should give an upvote", async () => {
      const recommendation = recommendationFactory();

      await server.post("/recommendations").send(recommendation);
      const { id } = await recommendationRepository.findByName(
        recommendation.name
      );

      const result = await server.post(`/recommendations/${id}/upvote`);
      expect(result.status).toBe(200);
    });
    it("Should not give an upvote and it should return 404", async () => {
      const id = idFactory(3);
      const result = await server.post(`/recommendations/${id}/upvote`);
      expect(result.status).toBe(404);
    });
    it("Should give a downvote", async () => {
      const recommendation = recommendationFactory();

      await server.post("/recommendations").send(recommendation);

      const { id } = await recommendationRepository.findByName(
        recommendation.name
      );

      const result = await server.post(`/recommendations/${id}/downvote`);
      expect(result.status).toBe(200);
    });
    it("Should not give a downvote and it should return 404", async () => {
      const id = idFactory(3);

      const result = await server.post(`/recommendations/${id}/downvote`);
      expect(result.status).toBe(404);
    });
  });
}
