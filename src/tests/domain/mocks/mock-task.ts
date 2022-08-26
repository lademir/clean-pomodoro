import { faker } from "@faker-js/faker";
import { Task } from "../../../core/domain/models";

export const mockTaskModel = (): Task => ({
    id: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    status: "pending",
    finishedAt: null,
})