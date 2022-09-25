import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
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

  describe("/GET Recomendation Test suit", () => {
    it("Should get all recommendations", async () => {
      const result = await server.get("/recommendations");
      const findResults = await recommendationRepository.findAll();
      expect(result.status).toBe(200);
      expect(result.body).toEqual(findResults);
    });
    it("Should return one recommendation via id", async () => {
      const recommendation = recommendationFactory();
      for (let i = 0; i < 10; i++) {
        await server.post("/recommendations").send(recommendation);
      }

      const expectedResult = await recommendationRepository.findByName(
        recommendation.name
      );
      const result = await server.get(`/recommendations/${expectedResult.id}`);

      expect(result.body).toEqual(expectedResult);
      expect(result.body).not.toBeNull();
      expect(result.body).toBeInstanceOf(Object);
      expect(result.status).toBe(200);
    });
    it("Should return status 404 when trying to find recommendation via id", async () => {
      const id = idFactory(3);

      const result = await server.get(`/recommendations/${id}`);
      expect(result.status).toBe(404);
    });
    it("Should return random recommendations", async () => {
      const recommendation = recommendationFactory();
      for (let i = 0; i < 10; i++) {
        await server.post("/recommendations").send(recommendation);
      }
      const result = await server.get("/recommendations/random");
      const expectedResult = await recommendationService.getRandom();

      expect(result.body).toEqual(expectedResult);
      expect(result.body).not.toBeNull();
      expect(result.body).toBeInstanceOf(Object);
      expect(result.status).toBe(200);
    });
    it("Should return status 404 when trying to get random recommendations", async () => {
      const result = await server.get("/recommendations/random");

      const expectedResult = recommendationService.getRandom();

      expect(expectedResult).rejects.toBe({
        message: "",
        type: "not_found",
      });
      expect(result.status).toBe(404);
    });
    it("Should give the top recommendations", async () => {
      const number = idFactory(2);
      const result = await server.get(`/recommendations/top/${number}`);
      const expectedResult = await recommendationRepository.getAmountByScore(
        number
      );

      expect(result.status).toBe(200);
      expect(result.body).not.toBeNull();
      expect(result.body).toEqual(expectedResult);
    });
  });
}
