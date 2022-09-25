import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import { idFactory } from "../factories/idFactory";
import { recommendationFactory } from "../factories/recommendationFactory";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Recommendations Service unit test", () => {
  it("Should create a recommendation", async () => {
    const recommendation = recommendationFactory();
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
    const recommendation = recommendationFactory();
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

  it("Should add one upvote", async () => {
    const id = idFactory();
    const recommendation = recommendationFactory();

    jest
    .spyOn(recommendationRepository, "findByName")
    .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return id
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
            id,
            name: recommendation.name,
            youtubeLink: recommendation.youtubeLink
        }
      });

      jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce((): any => {
        return id
      });

      await recommendationService.insert(recommendation);
      await recommendationService.upvote(id);

      expect(recommendationRepository.create).toBeCalled();
      expect(recommendationRepository.findByName).toBeCalled();
      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("Should not add one upvote", async () => {
    const id = idFactory();
    const recommendation = recommendationFactory();

    jest
    .spyOn(recommendationRepository, "findByName")
    .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return id
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
            id,
            name: recommendation.name,
            youtubeLink: recommendation.youtubeLink
        }
      });

      jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce((): any => {
        return id
      });

      await recommendationService.insert(recommendation);
      const promise = recommendationService.upvote(id);

      expect(recommendationRepository.create).toBeCalled();
      expect(recommendationRepository.findByName).toBeCalled();
      expect(recommendationRepository.find).toBeCalled();
      expect(promise).toBeInstanceOf(Object)
      expect(recommendationRepository.updateScore).not.toBeCalled();
  });
  it("Should add one downvote", async ()=>{
    const id = idFactory();
    const recommendation = recommendationFactory();

    jest
    .spyOn(recommendationRepository, "findByName")
    .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return id
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
            id,
            name: recommendation.name,
            youtubeLink: recommendation.youtubeLink
        }
      });

      jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce((): any => {
        return id
      });

      await recommendationService.insert(recommendation);
      await recommendationService.downvote(id);

      expect(recommendationRepository.create).toBeCalled();
      expect(recommendationRepository.findByName).toBeCalled();
      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Should not add one downvote", async () => {
    const id = idFactory();
    const recommendation = recommendationFactory();

    jest
    .spyOn(recommendationRepository, "findByName")
    .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return id
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
            id,
            name: recommendation.name,
            youtubeLink: recommendation.youtubeLink
        }
      });

      jest.spyOn(recommendationRepository,'updateScore').mockImplementationOnce((): any => {
        return id
      });

      await recommendationService.insert(recommendation);
      const promise = recommendationService.upvote(id);

      expect(recommendationRepository.create).toBeCalled();
      expect(recommendationRepository.findByName).toBeCalled();
      expect(recommendationRepository.find).toBeCalled();
      expect(promise).toBeInstanceOf(Object)
      expect(recommendationRepository.updateScore).not.toBeCalled();
  });
  it("Should get the last 10 recommendations", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {})

    await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalled()
  });
  it("Should get one recommendation by ID", async () => {
    
  });
  it.todo("Should not get one recommendation by ID");

});
