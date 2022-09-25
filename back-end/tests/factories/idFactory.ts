import { faker } from "@faker-js/faker";

export async function idFactory() {
  return parseInt(faker.random.numeric(3));
}
