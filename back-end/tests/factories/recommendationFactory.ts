import { faker } from "@faker-js/faker";

export function recommendationFactory() {
  return {
    name: faker.music.songName(),
    youtubeLink: "https://www.youtube.com/watch?v="+faker.random.word(),
  };
}
