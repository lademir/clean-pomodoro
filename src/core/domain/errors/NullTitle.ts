export class NullTitleError extends Error {
    constructor() {
        super('Title is required')
        this.name = 'NullTitleError'
    }
}