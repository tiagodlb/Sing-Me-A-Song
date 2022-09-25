import { faker } from "@faker-js/faker";

export async function recommendationFactory() {
  return {
    name: faker.music.songName(),
    youtubeLink: faker.internet.url(),
  };
}
