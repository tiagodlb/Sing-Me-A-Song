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
    const id = idFactory(1);
    const recommendation = recommendationFactory();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return id;
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
          id,
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return id;
      });

    await recommendationService.insert(recommendation);
    await recommendationService.upvote(id);

    expect(recommendationRepository.create).toBeCalled();
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("Should not add one upvote", async () => {
    const id = idFactory(3);
    const recommendation = recommendationFactory();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return id;
      });

    await recommendationService.insert(recommendation);
    const promise = recommendationService.upvote(id);

    expect(recommendationRepository.create).toBeCalled();
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.find).toBeCalled();
    expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    expect(recommendationRepository.updateScore).not.toBeCalled();
  });
  it("Should add one downvote", async () => {
    const id = idFactory(1);
    const recommendation = recommendationFactory();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return id;
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
          id,
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return id;
      });

    await recommendationService.insert(recommendation);
    await recommendationService.downvote(id);

    expect(recommendationRepository.create).toBeCalled();
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Should remove one recommendation", async () => {
    const id = idFactory(1);
    const recommendation = recommendationFactory();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return id;
      });

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
          id,
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return { score: -6 };
      });

    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {
        return id;
      });

    await recommendationService.insert(recommendation);
    await recommendationService.downvote(id);

    expect(recommendationRepository.create).toBeCalled();
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Should not add one downvote", async () => {
    const id = idFactory(3);
    const recommendation = recommendationFactory();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
          id: 1,
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return id;
      });

    await recommendationService.insert(recommendation);
    const promise = recommendationService.upvote(id);

    expect(recommendationRepository.create).toBeCalled();
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.find).toBeCalled();
    expect(promise).rejects.toEqual({ type: "not_found", message: "" });
    expect(recommendationRepository.updateScore).not.toBeCalled();
  });
  it("Should get all the recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {});

    await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalled();
  });
  it("Should not get all the recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return "something";
      });

    const result = await recommendationService.get();
    expect(result).not.toBeInstanceOf(Object);
  });
  it("Should get one recommendation by ID", async () => {
    const id = idFactory(1);
    const recommendation = recommendationFactory();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
          id,
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink,
        };
      });
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return id;
      });
    await recommendationRepository.create(recommendation);
    const result = await recommendationService.getById(id);

    expect(recommendationRepository.create).toBeCalled();
    expect(result).toEqual(id);
    expect(recommendationRepository.find).toBeCalled();
  });
  it("Should not get one recommendation by ID", async () => {
    const id = idFactory(3);
    const recommendation = recommendationFactory();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
          id,
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink,
        };
      });
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});
    await recommendationRepository.create(recommendation);
    const result = recommendationService.getById(id);

    expect(recommendationRepository.create).toBeCalled();
    expect(recommendationRepository.find).toBeCalled();
    expect(result).rejects.toEqual({ type: "not_found", message: "" });
  });

  it("Should get a random recomendation", async () => {
    const recommendation = recommendationFactory();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {
        return {
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink,
        };
      });
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [recommendation];
      });

    await recommendationRepository.create(recommendation);
    const result = await recommendationService.getRandom();
    expect(recommendationRepository.findAll).toBeCalled();
    expect(result).toBeInstanceOf(Object);
  });
  it("Should get a random recomendation", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [];
      });
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [];
      });
    jest.spyOn(Math, "random").mockImplementationOnce(() => 0.5);
    jest.spyOn(Math, "floor").mockImplementationOnce(() => 0);

    const result = recommendationService.getRandom();

    expect(recommendationRepository.findAll).toBeCalled();
    expect(result).rejects.toEqual({ type: "not_found", message: "" });
  });
  it("Should get the top recommendations", async () => {
    const amount = idFactory(1);
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {
        return amount;
      });

    const result = await recommendationService.getTop(amount);

    expect(result).toEqual(amount);
  });
  it("Should not get the top recommendations", async () => {
    const amount = idFactory(1);
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {});

    const result = await recommendationService.getTop(amount);

    expect(result).not.toEqual(amount);
  });
});
