export class TaskIdInvalidError extends Error {
    constructor() {
        super('Task id is invalid')
        this.name = 'TaskIdInvalidError'
    }
}