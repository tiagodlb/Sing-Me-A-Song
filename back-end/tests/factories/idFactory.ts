import { faker } from "@faker-js/faker";

export function idFactory(quantity: number) {
  return parseInt(faker.random.numeric(quantity));
}
