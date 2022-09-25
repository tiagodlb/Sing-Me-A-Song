import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Recommendations Service unit test", () => {
  it("Should create a recommendation", async () => {
    const recommendation = await recommendationFactory();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(recommendation);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("Should not create a second recommendation", async () => {
    const recommendation = await recommendationFactory();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return recommendation;
      });
    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    const promise = recommendationService.insert(recommendation);
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "Recommendations names must be unique",
    });
    expect(recommendationRepository.create).not.toBeCalled();
  });

  it.todo("Should add one upvote");
});
