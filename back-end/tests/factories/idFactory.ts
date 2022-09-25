import { faker } from "@faker-js/faker";

export function idFactory() {
  return parseInt(faker.random.numeric(3));
}
