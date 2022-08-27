import { Task } from "../../../core/domain/models";

export const mockTaskModel = (): Task => ({
    id: "any_id",
    userId: "any_user_id",
    title: "any_title",
    description: "any_description",
    status: "pending",
    finishedAt: null,
})